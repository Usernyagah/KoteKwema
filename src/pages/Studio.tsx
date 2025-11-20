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
      <div className="pt-20">
        <div className="grid grid-cols-3 gap-4">
          {/* Top Left - Large Image with "About" overlay (spans 2 columns, 2 rows) */}
          <div className="col-span-2 row-span-2 relative h-[450px]">
            <img
              src={heroImage}
              alt="About"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 p-6">
              <span className="text-white text-2xl font-light">About</span>
            </div>
          </div>

          {/* Top Right - Dark Grey Text Box */}
          <div className="col-span-1 bg-[#333333] p-8 lg:p-12 flex flex-col justify-center">
            <p className="text-[#D0D0D0] text-lg font-light leading-relaxed mb-6">
              We are a global studio for sustainable architecture, urbanism, engineering and design, established in 1967.
            </p>
            <p className="text-[#D0D0D0] text-xl font-light">
              Kote Kwema
            </p>
          </div>

          {/* Middle Row - 3 images with text overlays */}
          <div className="col-span-1 relative h-[300px] group cursor-pointer">
            <img
              src={project1}
              alt="Life at Kote Kwema"
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute bottom-0 left-0 p-6">
              <span className="text-white text-xl font-light">Life at Kote Kwema</span>
            </div>
          </div>

          <div className="col-span-1 relative h-[300px] group cursor-pointer">
            <img
              src={project2}
              alt="Vacancies"
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute bottom-0 left-0 p-6">
              <span className="text-white text-xl font-light">Vacancies</span>
            </div>
          </div>

          <div className="col-span-1 relative h-[300px] group cursor-pointer">
            <img
              src={project3}
              alt="Equity, Diversity and Inclusion"
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute bottom-0 left-0 p-6">
              <span className="text-white text-xl font-light">Equity, Diversity and Inclusion</span>
            </div>
          </div>

          {/* Bottom Row - 3 images with text overlays */}
          <div className="col-span-1 relative h-[300px] group cursor-pointer">
            <img
              src={project4}
              alt="Corporate Social Responsibility"
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute bottom-0 left-0 p-6">
              <span className="text-white text-xl font-light">Corporate Social Responsibility</span>
            </div>
          </div>

          <div className="col-span-1 relative h-[300px] group cursor-pointer">
            <img
              src={heroImage}
              alt="Global studios"
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute bottom-0 left-0 p-6">
              <span className="text-white text-xl font-light">Global studios</span>
            </div>
          </div>

          <div className="col-span-1 relative h-[300px] group cursor-pointer">
            <img
              src={project1}
              alt="Studio"
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute bottom-0 left-0 p-6">
              <span className="text-white text-xl font-light">Studio</span>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default StudioPage;
