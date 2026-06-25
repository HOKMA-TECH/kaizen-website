import Hero from "@/components/sections/Hero";
import Marquee from "@/components/Marquee";
import ChapterDream from "@/components/sections/ChapterDream";
import ChapterStory from "@/components/sections/ChapterStory";
import ChapterValues from "@/components/sections/ChapterValues";
import FeaturedProperties from "@/components/sections/FeaturedProperties";
import Journey from "@/components/sections/Journey";
import Testimonials from "@/components/sections/Testimonials";
import FinalCTA from "@/components/sections/FinalCTA";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative">
      <Hero />
      <Marquee />
      <ChapterDream />
      <ChapterStory />
      <ChapterValues />
      <FeaturedProperties />
      <Journey />
      <Testimonials />
      <FinalCTA />
      <Contact />
      <Footer />
    </main>
  );
}
