
import { Card } from "./ui/card";
import { Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    location: "New York, USA",
    comment: "The trip to Bali was absolutely magical! Every detail was perfectly planned, and the local experiences were unforgettable.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
    rating: 5,
    destination: "Bali, Indonesia",
  },
  {
    id: 2,
    name: "Mark Wilson",
    location: "London, UK",
    comment: "Our honeymoon in Maldives exceeded all expectations. The resort recommendations were spot on, and the service was impeccable.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
    rating: 5,
    destination: "Maldives",
  },
  {
    id: 3,
    name: "Emma Thompson",
    location: "Sydney, Australia",
    comment: "The Swiss Alps tour was breathtaking! From the hotels to the activities, everything was top-notch. Will definitely book again!",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    rating: 5,
    destination: "Swiss Alps",
  },
];

export const CustomerTestimonials = () => {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Travelers Say</h2>
          <p className="text-lg text-gray-600">Real experiences from real travelers</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="relative">
              <div className="p-6">
                <Quote className="w-10 h-10 text-primary/20 absolute top-6 right-6" />
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.location}</p>
                  </div>
                </div>
                <div className="mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400">★</span>
                  ))}
                </div>
                <p className="text-gray-600 mb-2">{testimonial.comment}</p>
                <p className="text-sm text-primary font-medium">
                  Traveled to {testimonial.destination}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
