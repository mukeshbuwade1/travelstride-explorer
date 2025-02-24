
import { useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Filter, Search, MapPin, Users, Hotel, Utensils, Plane, Car, Activity } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface Package {
  id: number;
  name: string;
  image: string;
  duration: string;
  hotel: string;
  price: number;
  services: {
    flight: boolean;
    hotel: string;
    transfer: boolean;
    meals: boolean;
    activities: boolean;
  };
}

const destinations = {
  "bali": {
    title: "Bali, Indonesia",
    subtitle: "Where Paradise Meets Adventure",
    packages: [
      {
        id: 1,
        name: "Bali Bliss Package",
        image: "https://images.unsplash.com/photo-1501854140801-50d01698950b",
        duration: "5 Days 4 Nights",
        hotel: "4 Star",
        price: 45000,
        services: {
          flight: true,
          hotel: "4 Star",
          transfer: true,
          meals: true,
          activities: true
        }
      },
      // ... Add more packages
    ]
  },
  "swiss-alps": {
    title: "Swiss Alps",
    subtitle: "Experience Winter Wonderland",
    packages: [
      {
        id: 2,
        name: "Alpine Adventure",
        image: "https://images.unsplash.com/photo-1472396961693-142e6e269027",
        duration: "6 Days 5 Nights",
        hotel: "5 Star",
        price: 120000,
        services: {
          flight: true,
          hotel: "5 Star",
          transfer: true,
          meals: true,
          activities: true
        }
      }
    ]
  }
};

const DestinationDetails = () => {
  const { id } = useParams();
  const destination = destinations[id as keyof typeof destinations];
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });

  const filteredPackages = destination?.packages.filter(pkg => {
    const matchesSearch = pkg.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPriceRange = 
      (!priceRange.min || pkg.price >= Number(priceRange.min)) &&
      (!priceRange.max || pkg.price <= Number(priceRange.max));
    return matchesSearch && matchesPriceRange;
  });

  if (!destination) return <div>Destination not found</div>;

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Hero Section */}
      <div 
        className="relative h-[40vh] bg-cover bg-center"
        style={{ 
          backgroundImage: `url(${destination.packages[0].image})`,
        }}
      >
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white text-center">
          <div>
            <h1 className="text-4xl font-bold mb-2">{destination.title}</h1>
            <p className="text-xl">{destination.subtitle}</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filters */}
        <div className="mb-8 bg-white p-6 rounded-lg shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Search Packages</label>
              <Input
                placeholder="Search packages..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Min Price (₹)</label>
              <Input
                type="number"
                placeholder="Min price"
                value={priceRange.min}
                onChange={(e) => setPriceRange(prev => ({ ...prev, min: e.target.value }))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Max Price (₹)</label>
              <Input
                type="number"
                placeholder="Max price"
                value={priceRange.max}
                onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
              />
            </div>
          </div>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPackages.map((pkg) => (
            <Card key={pkg.id} className="overflow-hidden">
              <div className="relative aspect-video">
                <img
                  src={pkg.image}
                  alt={pkg.name}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{pkg.name}</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="h-4 w-4" />
                    <span>{destination.title}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Users className="h-4 w-4" />
                    <span>{pkg.duration}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {pkg.services.flight && (
                      <Badge variant="secondary">
                        <Plane className="h-3 w-3 mr-1" /> Flight
                      </Badge>
                    )}
                    {pkg.services.hotel && (
                      <Badge variant="secondary">
                        <Hotel className="h-3 w-3 mr-1" /> {pkg.services.hotel}
                      </Badge>
                    )}
                    {pkg.services.transfer && (
                      <Badge variant="secondary">
                        <Car className="h-3 w-3 mr-1" /> Transfers
                      </Badge>
                    )}
                    {pkg.services.meals && (
                      <Badge variant="secondary">
                        <Utensils className="h-3 w-3 mr-1" /> Meals
                      </Badge>
                    )}
                    {pkg.services.activities && (
                      <Badge variant="secondary">
                        <Activity className="h-3 w-3 mr-1" /> Activities
                      </Badge>
                    )}
                  </div>
                  <div className="flex justify-between items-center pt-4 border-t">
                    <div className="text-sm text-gray-600">Per Person</div>
                    <div className="text-xl font-bold text-primary">₹{pkg.price.toLocaleString('en-IN')}</div>
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

export default DestinationDetails;
