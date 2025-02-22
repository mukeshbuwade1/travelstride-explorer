
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { FeaturedDestinations } from "@/components/FeaturedDestinations";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <FeaturedDestinations />
      <Footer />
    </div>
  );
};

export default Index;
