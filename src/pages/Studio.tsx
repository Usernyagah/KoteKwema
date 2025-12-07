import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import heroImage from "@/assets/hero-architecture.jpg";
import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";
import project4 from "@/assets/project-4.jpg";

const StudioPage = () => {
  return (
    <div className="min-h-screen bg-[#1A1A1A]">
      <Navigation />
      <div className="pt-12">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {/* Top Left - Large Image with "About" overlay (spans 2 columns, 2 rows) */}
          <a href="#" className="col-span-2 row-span-2 relative h-[350px] block group cursor-pointer">
            <img
              src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1200&h=800&fit=crop&q=80"
              alt="About"
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute bottom-0 left-0 p-6">
              <span className="text-white text-2xl font-bold">About</span>
            </div>
          </a>

          {/* Top Right - Dark Grey Text Box */}
          <div className="col-span-2 md:col-span-1 bg-[#333333] p-6 lg:p-8 flex flex-col justify-center">
            <p className="text-[#D0D0D0] text-lg font-bold leading-relaxed mb-6">
              We craft sustainable architecture, urban landscapes, and engineering solutions where innovation meets environmental stewardship.
            </p>
            <p className="text-[#D0D0D0] text-xl logo-font">
              KOTE KWEMA
            </p>
          </div>

          {/* Middle Row - 3 images with text overlays */}
          <a href="#" className="col-span-1 relative h-[250px] block group cursor-pointer">
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop&q=80"
              alt="Vacancies"
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute bottom-0 left-0 p-6">
              <span className="text-white text-xl font-bold">Vacancies</span>
            </div>
          </a>

          <a href="#" className="col-span-1 relative h-[250px] block group cursor-pointer">
            <img
              src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&h=600&fit=crop&q=80"
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
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop&q=80"
              alt="Corporate Social Responsibility"
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute bottom-0 left-0 p-6">
              <span className="text-white text-xl font-bold">Corporate Social Responsibility</span>
            </div>
          </a>

          <a href="#" className="col-span-1 relative h-[250px] block group cursor-pointer">
            <img
              src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&h=600&fit=crop&q=80"
              alt="Global studios"
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute bottom-0 left-0 p-6">
              <span className="text-white text-xl font-bold">Global studios</span>
            </div>
          </a>

          <a href="#" className="col-span-1 relative h-[250px] block group cursor-pointer">
            <img
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop&q=80"
              alt="Studio"
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute bottom-0 left-0 p-6">
              <span className="text-white text-xl font-bold">Studio</span>
            </div>
          </a>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default StudioPage;
