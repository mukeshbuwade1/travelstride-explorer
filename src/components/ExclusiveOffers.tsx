
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Timer, Tag } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "./ui/skeleton";

interface ExclusiveOffer {
  id: number;
  title: string;
  description: string;
  discount: string;
  valid_until: string;
  image: string;
  code: string;
}

export const ExclusiveOffers = () => {
  const { data: offers, isLoading } = useQuery({
    queryKey: ['exclusive-offers'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('exclusive_offers')
        .select('*');
      
      if (error) throw error;
      return data as ExclusiveOffer[];
    }
  });

  if (isLoading) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Skeleton className="h-8 w-64 mx-auto mb-4" />
            <Skeleton className="h-6 w-96 mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="overflow-hidden">
                <Skeleton className="h-48 w-full" />
                <div className="p-6">
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-full mb-4" />
                  <div className="flex justify-between">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Exclusive Offers</h2>
          <p className="text-lg text-gray-600">Limited-time deals you won't want to miss</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {offers?.map((offer) => (
            <Card key={offer.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="relative">
                <img
                  src={offer.image}
                  alt={offer.title}
                  className="w-full h-48 object-cover"
                />
                <Badge className="absolute top-4 right-4 bg-accent text-white">
                  {offer.discount}
                </Badge>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{offer.title}</h3>
                <p className="text-gray-600 mb-4">{offer.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-500">
                    <Timer className="w-4 h-4 mr-1" />
                    Valid until {new Date(offer.valid_until).toLocaleDateString()}
                  </div>
                  <div className="flex items-center text-sm font-medium text-primary">
                    <Tag className="w-4 h-4 mr-1" />
                    {offer.code}
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
