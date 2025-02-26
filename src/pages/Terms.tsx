
const Terms = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold mb-8">Terms & Conditions</h1>
        
        <div className="prose prose-gray max-w-none">
          <p className="text-gray-600 mb-6">Last updated: {new Date().toLocaleDateString()}</p>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Booking and Payments</h2>
            <ul className="list-disc pl-6 text-gray-600 mb-4">
              <li>All bookings are subject to availability and confirmation.</li>
              <li>Payments are processed securely through our payment gateway.</li>
              <li>Full payment is required to confirm your booking.</li>
              <li>Prices are subject to change without prior notice.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Cancellation Policy</h2>
            <ul className="list-disc pl-6 text-gray-600 mb-4">
              <li>Cancellations made 30 days before departure receive a full refund.</li>
              <li>Cancellations made 15-29 days before departure receive a 50% refund.</li>
              <li>Cancellations made less than 15 days before departure are non-refundable.</li>
              <li>All cancellations must be made in writing.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Travel Insurance</h2>
            <p className="text-gray-600 mb-4">We strongly recommend that all travelers obtain comprehensive travel insurance. This should cover:</p>
            <ul className="list-disc pl-6 text-gray-600 mb-4">
              <li>Trip cancellation and interruption</li>
              <li>Medical expenses and evacuation</li>
              <li>Lost or delayed baggage</li>
              <li>Personal liability</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Terms;
