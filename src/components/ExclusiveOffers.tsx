
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Timer, Tag } from "lucide-react";

const offers = [
  {
    id: 1,
    title: "Early Bird Summer Special",
    description: "Book your summer vacation now and save big with our early bird discounts",
    discount: "25% OFF",
    validUntil: "2024-05-30",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    code: "SUMMER25",
  },
  {
    id: 2,
    title: "Last Minute Deals",
    description: "Spontaneous traveler? Get amazing discounts on last-minute bookings",
    discount: "40% OFF",
    validUntil: "2024-04-15",
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e",
    code: "LASTCALL40",
  },
  {
    id: 3,
    title: "Family Package Special",
    description: "Special rates for family bookings with kids under 12 stay free",
    discount: "30% OFF",
    validUntil: "2024-06-30",
    image: "https://images.unsplash.com/photo-1545153996-9419dd2acf66",
    code: "FAMILY30",
  },
];

export const ExclusiveOffers = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Exclusive Offers</h2>
          <p className="text-lg text-gray-600">Limited-time deals you won't want to miss</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {offers.map((offer) => (
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
                    Valid until {new Date(offer.validUntil).toLocaleDateString()}
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
