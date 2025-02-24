
import { useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { MapPin, Users, Hotel, Utensils, Plane, Car, Activity, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { AuthModal } from "@/components/auth/AuthModal";
import { useAuth } from "@/hooks/useAuth";

const packageData = {
  "1": {
    title: "Bali Bliss Package",
    subtitle: "5 Days of Tropical Paradise",
    price: 45000,
    description: "Experience the magic of Bali with our carefully curated package that combines luxury, adventure, and relaxation. From pristine beaches to ancient temples, immerse yourself in the island's rich culture and natural beauty.",
    images: [
      "https://images.unsplash.com/photo-1501854140801-50d01698950b",
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4",
      "https://images.unsplash.com/photo-1542897644-e04428948020"
    ],
    duration: "5 Days 4 Nights",
    services: {
      flight: true,
      hotel: "4 Star",
      transfer: true,
      meals: true,
      activities: true
    },
    itinerary: [
      {
        day: 1,
        title: "Arrival & Welcome",
        activities: [
          "Airport pickup",
          "Check-in to 4-star resort",
          "Welcome dinner at beachfront restaurant",
          "Evening at leisure"
        ]
      },
      {
        day: 2,
        title: "Temple & Culture Tour",
        activities: [
          "Visit to Tanah Lot Temple",
          "Traditional dance performance",
          "Lunch at local restaurant",
          "Art market visit"
        ]
      },
      {
        day: 3,
        title: "Adventure Day",
        activities: [
          "White water rafting",
          "Rice terrace trek",
          "Spa treatment",
          "Dinner at resort"
        ]
      },
      {
        day: 4,
        title: "Beach & Water Activities",
        activities: [
          "Snorkeling trip",
          "Beach relaxation",
          "Sunset cruise",
          "Farewell dinner"
        ]
      },
      {
        day: 5,
        title: "Departure",
        activities: [
          "Breakfast at resort",
          "Last-minute shopping",
          "Airport transfer",
          "Departure"
        ]
      }
    ]
  }
  // Add more packages as needed
};

const PackageDetails = () => {
  const { id } = useParams();
  const packageInfo = packageData[id as keyof typeof packageData];
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { session } = useAuth();
  const { toast } = useToast();

  if (!packageInfo) return <div>Package not found</div>;

  const handleBookNow = () => {
    if (!session) {
      setShowAuthModal(true);
      return;
    }
    toast({
      title: "Booking Initiated",
      description: "Our team will contact you shortly to confirm your booking.",
    });
  };

  const handleGetBestDeal = () => {
    if (!session) {
      setShowAuthModal(true);
      return;
    }
    toast({
      title: "Request Received",
      description: "We'll send you our best offer for this package soon!",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{packageInfo.title}</h1>
            <p className="text-lg text-gray-600 mb-6">{packageInfo.subtitle}</p>

            {/* Image Carousel */}
            <Card className="mb-8">
              <Carousel className="w-full">
                <CarouselContent>
                  {packageInfo.images.map((image, index) => (
                    <CarouselItem key={index}>
                      <div className="aspect-video relative">
                        <img
                          src={image}
                          alt={`${packageInfo.title} - Image ${index + 1}`}
                          className="absolute inset-0 w-full h-full object-cover rounded-lg"
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-4" />
                <CarouselNext className="right-4" />
              </Carousel>
            </Card>

            {/* Description */}
            <Card className="p-6 mb-8">
              <h2 className="text-xl font-semibold mb-4">Overview</h2>
              <p className="text-gray-600">{packageInfo.description}</p>
            </Card>

            {/* Services */}
            <Card className="p-6 mb-8">
              <h2 className="text-xl font-semibold mb-4">Included Services</h2>
              <div className="flex flex-wrap gap-2">
                {packageInfo.services.flight && (
                  <Badge variant="secondary" className="text-base py-2">
                    <Plane className="h-4 w-4 mr-2" /> Flight
                  </Badge>
                )}
                {packageInfo.services.hotel && (
                  <Badge variant="secondary" className="text-base py-2">
                    <Hotel className="h-4 w-4 mr-2" /> {packageInfo.services.hotel}
                  </Badge>
                )}
                {packageInfo.services.transfer && (
                  <Badge variant="secondary" className="text-base py-2">
                    <Car className="h-4 w-4 mr-2" /> Transfers
                  </Badge>
                )}
                {packageInfo.services.meals && (
                  <Badge variant="secondary" className="text-base py-2">
                    <Utensils className="h-4 w-4 mr-2" /> Meals
                  </Badge>
                )}
                {packageInfo.services.activities && (
                  <Badge variant="secondary" className="text-base py-2">
                    <Activity className="h-4 w-4 mr-2" /> Activities
                  </Badge>
                )}
              </div>
            </Card>

            {/* Itinerary */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Day-wise Itinerary</h2>
              <Accordion type="single" collapsible className="w-full">
                {packageInfo.itinerary.map((day) => (
                  <AccordionItem key={day.day} value={`day-${day.day}`}>
                    <AccordionTrigger className="text-left">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-5 w-5" />
                        <span>Day {day.day}: {day.title}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="list-disc pl-6 space-y-2">
                        {day.activities.map((activity, index) => (
                          <li key={index} className="text-gray-600">{activity}</li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-24">
              <div className="space-y-6">
                <div>
                  <div className="flex items-center gap-2 text-gray-600 mb-2">
                    <Users className="h-5 w-5" />
                    <span>{packageInfo.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="h-5 w-5" />
                    <span>Bali, Indonesia</span>
                  </div>
                </div>
                
                <div className="border-t pt-4">
                  <div className="text-sm text-gray-600 mb-1">Starting from</div>
                  <div className="text-3xl font-bold text-primary mb-6">
                    ₹{packageInfo.price.toLocaleString('en-IN')}
                  </div>
                  <div className="space-y-3">
                    <Button className="w-full" size="lg" onClick={handleBookNow}>
                      Book Now
                    </Button>
                    <Button 
                      className="w-full" 
                      variant="outline" 
                      size="lg"
                      onClick={handleGetBestDeal}
                    >
                      Get Best Deal
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
      <AuthModal 
        isOpen={showAuthModal} 
        onOpenChange={setShowAuthModal}
      />
    </div>
  );
};

export default PackageDetails;
