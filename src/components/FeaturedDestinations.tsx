
import { ChevronRight } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "./ui/skeleton";

interface Destination {
  id: number;
  title: string;
  image: string;
  price: number;
  rating: number;
  category: string;
}

const DestinationSection = ({ 
  title, 
  destinations,
  viewAllLink,
  tag,
  isLoading
}: { 
  title: string;
  destinations?: Destination[];
  viewAllLink: string;
  tag?: string;
  isLoading: boolean;
}) => {
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-10 w-24" />
        </div>
        <div className="relative">
          <div className="flex overflow-x-auto gap-6 pb-4 -mx-4 px-4 scrollbar-hide">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="flex-shrink-0 w-[300px] overflow-hidden">
                <Skeleton className="h-48 w-full" />
                <div className="p-6">
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <div className="flex justify-between items-center">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-12">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold text-gray-900">{title}</h3>
        <Button 
          variant="ghost" 
          className="text-primary" 
          onClick={() => navigate(`/packages${tag ? `?tag=${tag}` : ''}`)}
        >
          View All <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </div>
      <div className="relative">
        <div className="flex overflow-x-auto gap-6 pb-4 -mx-4 px-4 scrollbar-hide">
          {destinations?.map((destination) => (
            <Card
              key={destination.id}
              className="group flex-shrink-0 w-[300px] overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
              onClick={() => navigate(`/destination/${destination.id}`)}
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
                  <span className="text-primary text-lg font-bold">${destination.price}</span>
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
  const { data: destinations, isLoading } = useQuery({
    queryKey: ['destinations'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('destinations')
        .select('*');
      
      if (error) throw error;
      return data as Destination[];
    }
  });

  const getDestinationsByCategory = (category: string) => {
    return destinations?.filter(d => d.category === category) ?? [];
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Destinations</h2>
          <p className="text-lg text-gray-600">Explore our handpicked destinations</p>
        </div>

        <DestinationSection
          title="Best Sellers"
          destinations={getDestinationsByCategory('best-seller')}
          viewAllLink="/packages"
          tag="best-seller"
          isLoading={isLoading}
        />
        <DestinationSection
          title="Recommended For You"
          destinations={getDestinationsByCategory('recommended')}
          viewAllLink="/packages"
          isLoading={isLoading}
        />
        <DestinationSection
          title="Visa-Free Destinations"
          destinations={getDestinationsByCategory('visa-free')}
          viewAllLink="/packages"
          tag="visa-free"
          isLoading={isLoading}
        />
      </div>
    </section>
  );
};
