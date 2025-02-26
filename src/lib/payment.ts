
import { supabase } from "@/integrations/supabase/client";

export const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = resolve;
    document.body.appendChild(script);
  });
};

export const initializeRazorpayPayment = async (
  bookingId: number, 
  amount: number,
  packageName: string,
  contactDetails: {
    email: string;
    countryCode: string;
    phone: string;
  },
  callbacks: {
    onSuccess: () => void;
    onError: (error: Error) => void;
    onCancel: () => void;
  }
) => {
  try {
    const { data: order, error } = await supabase.functions.invoke('create-razorpay-order', {
      body: { bookingId, amount }
    });

    if (error) throw error;

    await loadRazorpayScript();

    const { data: configData, error: configError } = await supabase
      .from('razorpay_config')
      .select('key_id')
      .limit(1)
      .single();

    if (configError || !configData) {
      throw new Error('Failed to load payment configuration');
    }

    const options = {
      key: configData.key_id,
      amount: amount * 100,
      currency: 'INR',
      name: 'Your Travel Company',
      description: `Booking for ${packageName}`,
      order_id: order.id,
      handler: async function(response: any) {
        try {
          const { error: verificationError } = await supabase.functions.invoke('verify-payment', {
            body: {
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature
            }
          });

          if (verificationError) throw verificationError;
          callbacks.onSuccess();
        } catch (error) {
          callbacks.onError(error as Error);
        }
      },
      prefill: {
        email: contactDetails.email,
        contact: `${contactDetails.countryCode}${contactDetails.phone}`
      },
      modal: {
        ondismiss: callbacks.onCancel
      }
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  } catch (error) {
    callbacks.onError(error as Error);
  }
};
