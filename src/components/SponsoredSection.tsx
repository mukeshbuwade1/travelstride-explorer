import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "./ui/skeleton";
import { useNavigate } from "react-router-dom";

interface Promotion {
  id: number;
  title: string;
  description: string;
  image: string;
  partner: string;
  price: number;
  discount: string;
}

export const SponsoredSection = () => {
  const navigate = useNavigate();
  const { data: promotions, isLoading } = useQuery({
    queryKey: ['promotions'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('promotions')
        .select('*');
      
      if (error) throw error;
      return data as Promotion[];
    }
  });

  const handleCardClick = (packageId: number) => {
    navigate(`/package/${packageId}`);
  };

  if (isLoading) {
    return (
      <section className="py-12 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-6 w-24" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="overflow-hidden">
                <Skeleton className="h-48 w-full" />
                <div className="p-5">
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-full mb-4" />
                  <div className="flex justify-between">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-32" />
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
    <section className="py-12 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Special Promotions</h2>
          <Badge variant="secondary" className="bg-primary/10 text-primary">
            Sponsored
          </Badge>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            <div className="flex items-center justify-center h-48">
              <Skeleton className="h-8 w-48" />
            </div>
          ) : (
            promotions?.map((item) => (
              <Card
                key={item.id}
                className="group overflow-hidden hover:shadow-lg transition-all duration-300 animate-fade-up cursor-pointer"
                style={{ animationDelay: `${item.id * 0.1}s` }}
                onClick={() => handleCardClick(item.id)}
              >
                <div className="relative">
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <Badge className="absolute top-4 right-4 bg-accent text-white">
                    {item.discount}
                  </Badge>
                </div>
                <div className="p-5">
                  <div className="mb-3">
                    <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-primary font-bold">${item.price}</span>
                    <span className="text-sm text-gray-500">by {item.partner}</span>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
    </section>
  );
};
