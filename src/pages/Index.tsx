
import { Hero } from "@/components/Hero";
import { SponsoredSection } from "@/components/SponsoredSection";
import { FeaturedDestinations } from "@/components/FeaturedDestinations";
import { ExclusiveOffers } from "@/components/ExclusiveOffers";
import { CustomerTestimonials } from "@/components/CustomerTestimonials";
import { BlogSection } from "@/components/BlogSection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <SponsoredSection />
      <FeaturedDestinations />
      <ExclusiveOffers />
      <CustomerTestimonials />
      <BlogSection />
    </div>
  );
};

export default Index;
