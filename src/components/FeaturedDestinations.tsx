
import { ChevronRight } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";

const destinations = {
  bestSellers: [
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
    {
      id: 4,
      title: "Maldives",
      image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8",
      price: "$1499",
      rating: 4.9,
    },
  ],
  recommended: [
    {
      id: 5,
      title: "Tokyo, Japan",
      image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26",
      price: "$1199",
      rating: 4.8,
    },
    {
      id: 6,
      title: "Paris, France",
      image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34",
      price: "$999",
      rating: 4.7,
    },
    {
      id: 7,
      title: "Venice, Italy",
      image: "https://images.unsplash.com/photo-1514890547357-a9ee288728e0",
      price: "$899",
      rating: 4.6,
    },
  ],
  visaFree: [
    {
      id: 8,
      title: "Mauritius",
      image: "https://images.unsplash.com/photo-1516815231560-8f41ec531527",
      price: "$799",
      rating: 4.5,
    },
    {
      id: 9,
      title: "Thailand",
      image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a",
      price: "$699",
      rating: 4.6,
    },
    {
      id: 10,
      title: "Nepal",
      image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa",
      price: "$599",
      rating: 4.4,
    },
  ],
  honeymoon: [
    {
      id: 11,
      title: "Seychelles",
      image: "https://images.unsplash.com/photo-1511875762315-c773eb98eec0",
      price: "$1899",
      rating: 4.9,
    },
    {
      id: 12,
      title: "Amalfi Coast",
      image: "https://images.unsplash.com/photo-1455587734955-081b22074882",
      price: "$1599",
      rating: 4.8,
    },
    {
      id: 13,
      title: "Fiji Islands",
      image: "https://images.unsplash.com/photo-1578912996078-b79f0c41a083",
      price: "$1699",
      rating: 4.7,
    },
  ],
};

const DestinationSection = ({ 
  title, 
  destinations, 
  viewAllLink 
}: { 
  title: string;
  destinations: typeof destinations.bestSellers;
  viewAllLink: string;
}) => {
  return (
    <div className="mb-12">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold text-gray-900">{title}</h3>
        <Button variant="ghost" className="text-primary" onClick={() => window.location.href = viewAllLink}>
          View All <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </div>
      <div className="relative">
        <div className="flex overflow-x-auto gap-6 pb-4 -mx-4 px-4 scrollbar-hide">
          {destinations.map((destination) => (
            <Card
              key={destination.id}
              className="group flex-shrink-0 w-[300px] overflow-hidden hover:shadow-lg transition-shadow duration-300"
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
    </div>
  );
};

export const FeaturedDestinations = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Destinations</h2>
          <p className="text-lg text-gray-600">Explore our handpicked destinations</p>
        </div>

        <DestinationSection
          title="Best Sellers"
          destinations={destinations.bestSellers}
          viewAllLink="/best-sellers"
        />
        <DestinationSection
          title="Recommended For You"
          destinations={destinations.recommended}
          viewAllLink="/recommended"
        />
        <DestinationSection
          title="Visa-Free Destinations"
          destinations={destinations.visaFree}
          viewAllLink="/visa-free"
        />
        <DestinationSection
          title="Honeymoon Packages"
          destinations={destinations.honeymoon}
          viewAllLink="/honeymoon"
        />
      </div>
    </section>
  );
};
