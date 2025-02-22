
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { SponsoredSection } from "@/components/SponsoredSection";
import { FeaturedDestinations } from "@/components/FeaturedDestinations";
import { ExclusiveOffers } from "@/components/ExclusiveOffers";
import { CustomerTestimonials } from "@/components/CustomerTestimonials";
import { BlogSection } from "@/components/BlogSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <SponsoredSection />
      <FeaturedDestinations />
      <ExclusiveOffers />
      <CustomerTestimonials />
      <BlogSection />
      <Footer />
    </div>
  );
};

export default Index;
