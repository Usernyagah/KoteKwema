import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import FeaturedProject from "@/components/FeaturedProject";
import ProjectsGrid from "@/components/ProjectsGrid";
import Expertise from "@/components/Expertise";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <FeaturedProject />
      <ProjectsGrid />
      <Expertise />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
