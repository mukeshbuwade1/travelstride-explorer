
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { SponsoredSection } from "@/components/SponsoredSection";
import { FeaturedDestinations } from "@/components/FeaturedDestinations";
import { ExclusiveOffers } from "@/components/ExclusiveOffers";
import { CustomerTestimonials } from "@/components/CustomerTestimonials";
import { BlogSection } from "@/components/BlogSection";
import { Footer } from "@/components/Footer";
import { AuthModal } from "@/components/auth/AuthModal";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/hooks/useAuth";

const Index = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { session } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    // Show login modal when user first visits
    if (!session) {
      setShowAuthModal(true);
    }
  }, [session]);

  const handleGetCallback = () => {
    if (!session) {
      setShowAuthModal(true);
      return;
    }
    
    toast({
      title: "Request received",
      description: "We'll get back to you soon!",
    });
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <SponsoredSection />
      <FeaturedDestinations />
      <ExclusiveOffers />
      <CustomerTestimonials />
      <BlogSection />
      <div className="fixed bottom-8 right-8 z-50">
        <Button onClick={handleGetCallback} size="lg" className="shadow-lg">
          Get Call Back
        </Button>
      </div>
      <AuthModal 
        isOpen={showAuthModal} 
        onOpenChange={setShowAuthModal}
      />
      <Footer />
    </div>
  );
};

export default Index;
