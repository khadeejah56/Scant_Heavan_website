import Hero from "@/components/home/Hero";
import FeaturedCollections from "@/components/home/FeaturedCollections";
import BrandStory from "@/components/home/BrandStory";
import BestSellers from "@/components/home/BestSellers";
import Testimonials from "@/components/home/Testimonials";
import Newsletter from "@/components/home/Newsletter";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedCollections />
      <BestSellers />
      <BrandStory />
      <Testimonials />
      <Newsletter />
    </>
  );
}
