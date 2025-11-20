import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Architecture from "@/components/Architecture";
import Expertise from "@/components/Expertise";
import News from "@/components/News";
import Climate from "@/components/Climate";
import Footer from "@/components/Footer";
import heroImage from "@/assets/hero-architecture.jpg";
import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";
import project4 from "@/assets/project-4.jpg";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <section id="studio" className="pt-12 bg-[#1A1A1A]">
        <div className="pl-6 lg:pl-12 pr-6 lg:pr-12">
          <div className="mb-4">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">Studio</h2>
          </div>
          
          {/* First Row - Image (3/4) and Text (1/4) */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            {/* Image - 3/4 width */}
            <a href="#" className="md:col-span-3 relative h-[250px] md:h-[350px] block group cursor-pointer">
              <img
                src={heroImage}
                alt="About"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 p-6">
                <span className="text-white text-2xl font-bold">About</span>
              </div>
            </a>

            {/* Text - 1/4 width */}
            <div className="md:col-span-1 bg-[#333333] p-6 lg:p-8 flex flex-col justify-center h-[250px] md:h-[350px]">
              <p className="text-[#D0D0D0] text-lg font-bold leading-relaxed mb-6">
                We are a global studio for sustainable architecture, urbanism, engineering and design, established in 1967.
              </p>
              <p className="text-[#D0D0D0] text-xl font-bold">
                Kote Kwema
              </p>
            </div>
          </div>

          {/* Rest of the content - 3 column grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Middle Row - 3 images with text overlays */}
          <a href="#" className="col-span-1 relative h-[250px] block group cursor-pointer">
            <img
              src={project1}
              alt="Life at Kote Kwema"
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute bottom-0 left-0 p-6">
              <span className="text-white text-xl font-bold">Life at Kote Kwema</span>
            </div>
          </a>

          <a href="#" className="col-span-1 relative h-[250px] block group cursor-pointer">
            <img
              src={project2}
              alt="Vacancies"
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute bottom-0 left-0 p-6">
              <span className="text-white text-xl font-bold">Vacancies</span>
            </div>
          </a>

          <a href="#" className="col-span-1 relative h-[250px] block group cursor-pointer">
            <img
              src={project3}
              alt="Equity, Diversity and Inclusion"
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute bottom-0 left-0 p-6">
              <span className="text-white text-xl font-bold">Equity, Diversity and Inclusion</span>
            </div>
          </a>

          {/* Bottom Row - 3 images with text overlays */}
          <a href="#" className="col-span-1 relative h-[250px] block group cursor-pointer">
            <img
              src={project4}
              alt="Corporate Social Responsibility"
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute bottom-0 left-0 p-6">
              <span className="text-white text-xl font-bold">Corporate Social Responsibility</span>
            </div>
          </a>

          <a href="#" className="col-span-1 relative h-[250px] block group cursor-pointer">
            <img
              src={heroImage}
              alt="Global studios"
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute bottom-0 left-0 p-6">
              <span className="text-white text-xl font-bold">Global studios</span>
            </div>
          </a>

          <a href="#" className="col-span-1 relative h-[250px] block group cursor-pointer">
            <img
              src={project1}
              alt="Studio"
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute bottom-0 left-0 p-6">
              <span className="text-white text-xl font-bold">Studio</span>
            </div>
          </a>
        </div>
        </div>
      </section>
      <Architecture />
      <Expertise />
      <News />
      <Climate />
      <Footer />
    </div>
  );
};

export default Index;
