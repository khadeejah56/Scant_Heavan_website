import Hero from "@/components/home/Hero";
import FeaturedCollections from "@/components/home/FeaturedCollections";
import BrandStory from "@/components/home/BrandStory";
import BestSellers from "@/components/home/BestSellers";
import Testimonials from "@/components/home/Testimonials";
import Newsletter from "@/components/home/Newsletter";

// BestSellers queries the admin-editable product catalog, so the homepage
// should always render fresh rather than caching a static build-time snapshot.
export const dynamic = "force-dynamic";

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
