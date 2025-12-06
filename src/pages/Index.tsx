import { Link } from "react-router-dom";
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
      <section id="studio" className="pt-20 bg-[#1A1A1A]">
        <div className="pl-6 lg:pl-12 pr-6 lg:pr-12">
          <div className="mb-8">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">Studio</h2>
          </div>
          
          {/* First Row - Image (3/4) and Text (1/4) */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            {/* Image - 3/4 width */}
            <Link to="/studio/about" className="md:col-span-3 relative h-[300px] md:h-[450px] block group cursor-pointer">
              <img
                src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1200&h=800&fit=crop&q=80"
                alt="About"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 p-6">
                <span className="text-white text-2xl font-bold">About</span>
              </div>
            </Link>

            {/* Text - 1/4 width */}
            <div className="md:col-span-1 bg-[#333333] p-8 lg:p-12 flex flex-col justify-center h-[300px] md:h-[450px]">
              <p className="text-[#D0D0D0] text-lg font-bold leading-relaxed mb-6">
                We craft sustainable architecture, urban landscapes, and engineering solutions where innovation meets environmental stewardship.
              </p>
              <p className="text-[#D0D0D0] text-xl logo-font">
                KOTE KWEMA
              </p>
            </div>
          </div>

          {/* Rest of the content - 3 column grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Middle Row - 3 images with text overlays */}
          <Link to="/careers/positions" className="col-span-1 relative h-[300px] block group cursor-pointer">
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop&q=80"
              alt="Vacancies"
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute bottom-0 left-0 p-6">
              <span className="text-white text-xl font-bold">Vacancies</span>
            </div>
          </Link>

          <Link to="/careers/benefits" className="col-span-1 relative h-[300px] block group cursor-pointer">
            <img
              src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&h=600&fit=crop&q=80"
              alt="Equity, Diversity and Inclusion"
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute bottom-0 left-0 p-6">
              <span className="text-white text-xl font-bold">Equity, Diversity and Inclusion</span>
            </div>
          </Link>

          {/* Bottom Row - 3 images with text overlays */}
          <Link to="/studio/about" className="col-span-1 relative h-[300px] block group cursor-pointer">
            <img
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop&q=80"
              alt="Corporate Social Responsibility"
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute bottom-0 left-0 p-6">
              <span className="text-white text-xl font-bold">Corporate Social Responsibility</span>
            </div>
          </Link>

          <Link to="/studio/studios" className="col-span-1 relative h-[300px] block group cursor-pointer">
            <img
              src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&h=600&fit=crop&q=80"
              alt="Global studios"
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute bottom-0 left-0 p-6">
              <span className="text-white text-xl font-bold">Global studios</span>
            </div>
          </Link>

          <Link to="/studio/about" className="col-span-1 relative h-[300px] block group cursor-pointer">
            <img
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop&q=80"
              alt="Studio"
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute bottom-0 left-0 p-6">
              <span className="text-white text-xl font-bold">Studio</span>
            </div>
          </Link>
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
