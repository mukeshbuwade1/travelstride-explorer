
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";

// This would typically come from an API
const sponsoredContent = [
  {
    id: 1,
    title: "Dubai Summer Package",
    description: "5 nights, luxury hotel stay with desert safari",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c",
    partner: "Emirates Tours",
    price: "$999",
    discount: "20% OFF",
  },
  {
    id: 2,
    title: "Maldives Special",
    description: "7 days in paradise with water villa stay",
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8",
    partner: "Island Escapes",
    price: "$1,499",
    discount: "15% OFF",
  },
  {
    id: 3,
    title: "Thailand Adventure",
    description: "10 days exploring Bangkok & Phuket",
    image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a",
    partner: "Asian Ventures",
    price: "$899",
    discount: "25% OFF",
  },
];

export const SponsoredSection = () => {
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
          {sponsoredContent.map((item) => (
            <Card
              key={item.id}
              className="group overflow-hidden hover:shadow-lg transition-all duration-300 animate-fade-up"
              style={{ animationDelay: `${item.id * 0.1}s` }}
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
                  <span className="text-primary font-bold">{item.price}</span>
                  <span className="text-sm text-gray-500">by {item.partner}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
