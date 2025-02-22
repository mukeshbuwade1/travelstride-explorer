
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { SponsoredSection } from "@/components/SponsoredSection";
import { FeaturedDestinations } from "@/components/FeaturedDestinations";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <SponsoredSection />
      <FeaturedDestinations />
      <Footer />
    </div>
  );
};

export default Index;
