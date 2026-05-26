import Hero from "@/components/home/Hero";
import Stats from "@/components/home/Stats";
import WhyChooseMe from "@/components/home/WhyChooseMe";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import ServicesPreview from "@/components/home/ServicesPreview";
import CTABanner from "@/components/home/CTABanner";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Stats />
      <WhyChooseMe />
      <FeaturedProjects />
      <ServicesPreview />
      <CTABanner />
    </>
  );
}
