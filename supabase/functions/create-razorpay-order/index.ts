
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
    const { bookingId, amount } = await req.json()

    if (!bookingId || !amount) {
      return new Response(
        JSON.stringify({ error: 'Booking ID and amount are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const razorpayKeyId = Deno.env.get('RAZORPAY_KEY_ID')
    const razorpayKeySecret = Deno.env.get('RAZORPAY_KEY_SECRET')
    
    if (!razorpayKeyId || !razorpayKeySecret) {
      console.error('Razorpay credentials not found');
      throw new Error('Payment gateway not properly configured')
    }

    console.log('Creating Razorpay order for booking:', bookingId, 'amount:', amount);

    const response = await fetch('https://api.razorpay.com/v1/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(razorpayKeyId + ':' + razorpayKeySecret),
      },
      body: JSON.stringify({
        amount: amount * 100,
        currency: 'INR',
        receipt: `booking_${bookingId}`,
      }),
    })

    const order = await response.json()

    if (!response.ok) {
      console.error('Razorpay order creation failed:', order);
      throw new Error(order.error?.description || 'Failed to create Razorpay order')
    }

    console.log('Razorpay order created successfully:', order.id);

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const { error: updateError } = await supabaseClient
      .from('bookings')
      .update({ 
        razorpay_order_id: order.id,
        payment_status: 'awaiting_payment'
      })
      .eq('id', bookingId)

    if (updateError) {
      console.error('Failed to update booking:', updateError);
      throw updateError
    }

    return new Response(
      JSON.stringify(order),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error in create-razorpay-order:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
