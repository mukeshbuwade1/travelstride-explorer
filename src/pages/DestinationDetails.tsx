import { useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Filter, Search, MapPin, Users, Hotel, Utensils, Plane, Car, Activity } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

interface Package {
  id: number;
  name: string;
  image: string;
  duration: string;
  hotel_class: string;
  price: number;
  flight: boolean;
  transfer: boolean;
  meals: boolean;
  activities: boolean;
}

interface Destination {
  id: number;
  title: string;
  image: string;
}

const DestinationDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });

  const destinationId = id ? parseInt(id, 10) : 0;

  const { data: destination, isLoading: isLoadingDestination } = useQuery({
    queryKey: ['destination', destinationId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('destinations')
        .select('*')
        .eq('id', destinationId)
        .single();
      
      if (error) throw error;
      return data as Destination;
    },
    enabled: destinationId > 0
  });

  const { data: packages, isLoading: isLoadingPackages } = useQuery({
    queryKey: ['packages', destinationId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('packages')
        .select('*')
        .eq('destination_id', destinationId);
      
      if (error) throw error;
      return data as Package[];
    },
    enabled: destinationId > 0
  });

  const filteredPackages = packages?.filter(pkg => {
    const matchesSearch = pkg.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPriceRange = 
      (!priceRange.min || pkg.price >= Number(priceRange.min)) &&
      (!priceRange.max || pkg.price <= Number(priceRange.max));
    return matchesSearch && matchesPriceRange;
  });

  if (!destinationId) return <div>Invalid destination ID</div>;

  if (isLoadingDestination || isLoadingPackages) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <Skeleton className="h-[40vh] w-full" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-8 bg-white p-6 rounded-lg shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-12" />
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="overflow-hidden">
                <Skeleton className="aspect-video w-full" />
                <div className="p-6 space-y-4">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!destination) return <div>Destination not found</div>;

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div 
        className="relative h-[40vh] bg-cover bg-center"
        style={{ 
          backgroundImage: `url(${destination.image})`,
        }}
      >
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white text-center">
          <div>
            <h1 className="text-4xl font-bold mb-2">{destination.title}</h1>
            <p className="text-xl">Discover Amazing Packages</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPackages?.map((pkg) => (
            <Card 
              key={pkg.id} 
              className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300"
              onClick={() => navigate(`/package/${pkg.id}`)}
            >
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
                    {pkg.flight && (
                      <Badge variant="secondary">
                        <Plane className="h-3 w-3 mr-1" /> Flight
                      </Badge>
                    )}
                    {pkg.hotel_class && (
                      <Badge variant="secondary">
                        <Hotel className="h-3 w-3 mr-1" /> {pkg.hotel_class}
                      </Badge>
                    )}
                    {pkg.transfer && (
                      <Badge variant="secondary">
                        <Car className="h-3 w-3 mr-1" /> Transfers
                      </Badge>
                    )}
                    {pkg.meals && (
                      <Badge variant="secondary">
                        <Utensils className="h-3 w-3 mr-1" /> Meals
                      </Badge>
                    )}
                    {pkg.activities && (
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
