
const FAQ = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold mb-8">Frequently Asked Questions</h1>
        
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-2">How do I book a package?</h3>
            <p className="text-gray-600">You can book a package by browsing our destinations, selecting your preferred package, and clicking the "Book Now" button. Follow the booking process and make the payment to confirm your reservation.</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-2">What payment methods do you accept?</h3>
            <p className="text-gray-600">We accept various payment methods including credit/debit cards and online banking through our secure payment gateway, Razorpay.</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-2">Can I customize my travel package?</h3>
            <p className="text-gray-600">Yes, you can customize your travel package. During the booking process, check the "I want to customize this package" option, and our team will contact you to discuss your preferences.</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-2">What is your cancellation policy?</h3>
            <p className="text-gray-600">Our cancellation policy varies depending on the package and timing of cancellation. Generally, cancellations made 30 days before departure receive a full refund. Please refer to our Terms & Conditions for detailed information.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
