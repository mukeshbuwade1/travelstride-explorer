
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = await req.json()

    const razorpayKeySecret = Deno.env.get('RAZORPAY_KEY_SECRET')
    if (!razorpayKeySecret) {
      throw new Error('Razorpay secret key not configured')
    }

    // Verify payment signature
    const text = razorpay_order_id + "|" + razorpay_payment_id
    const hmac = new TextEncoder().encode(razorpayKeySecret)
    const data = new TextEncoder().encode(text)
    const key = await crypto.subtle.importKey(
      "raw",
      hmac,
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"]
    )
    const signature = await crypto.subtle.sign("HMAC", key, data)
    const actualSignature = Array.from(new Uint8Array(signature))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('')

    if (actualSignature !== razorpay_signature) {
      throw new Error('Invalid payment signature')
    }

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Update booking status
    const { data: booking, error: fetchError } = await supabaseClient
      .from('bookings')
      .select('id, total_amount')
      .eq('razorpay_order_id', razorpay_order_id)
      .single()

    if (fetchError || !booking) {
      throw new Error('Booking not found')
    }

    // Update booking with payment details
    const { error: updateError } = await supabaseClient
      .from('bookings')
      .update({ 
        payment_status: 'completed',
        razorpay_payment_id,
        status: 'confirmed'
      })
      .eq('id', booking.id)

    if (updateError) {
      throw updateError
    }

    // Create payment transaction record
    const { error: transactionError } = await supabaseClient
      .from('payment_transactions')
      .insert({
        booking_id: booking.id,
        transaction_id: razorpay_payment_id,
        amount: booking.total_amount,
        status: 'completed',
        payment_method: 'razorpay',
        razorpay_order_id,
        razorpay_payment_id
      })

    if (transactionError) {
      throw transactionError
    }

    return new Response(
      JSON.stringify({ success: true }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
