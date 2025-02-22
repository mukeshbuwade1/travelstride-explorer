
import { Card } from "./ui/card";

const destinations = [
  {
    id: 1,
    title: "Bali, Indonesia",
    image: "https://images.unsplash.com/photo-1501854140801-50d01698950b",
    price: "$899",
    rating: 4.8,
  },
  {
    id: 2,
    title: "Swiss Alps",
    image: "https://images.unsplash.com/photo-1472396961693-142e6e269027",
    price: "$1299",
    rating: 4.9,
  },
  {
    id: 3,
    title: "Santorini, Greece",
    image: "https://images.unsplash.com/photo-1433086966358-54859d0ed716",
    price: "$999",
    rating: 4.7,
  },
];

export const FeaturedDestinations = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Destinations</h2>
          <p className="text-lg text-gray-600">Explore our handpicked destinations</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((destination) => (
            <Card
              key={destination.id}
              className="group overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={destination.image}
                  alt={destination.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{destination.title}</h3>
                <div className="flex justify-between items-center">
                  <span className="text-primary text-lg font-bold">{destination.price}</span>
                  <div className="flex items-center">
                    <span className="text-yellow-400">★</span>
                    <span className="ml-1 text-gray-600">{destination.rating}</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
