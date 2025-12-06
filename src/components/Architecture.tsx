import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-architecture.jpg";

const Architecture = () => {
  return (
    <section id="architecture" className="bg-[#1A1A1A]">
      <div className="pt-20 pb-8">
        <div className="pl-6 lg:pl-12 pr-6 lg:pr-12">
          <div className="mb-8">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
              Architecture
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Left - Large Image with "Architecture" overlay (3/4 width) */}
        <Link to="/expertise/architecture" className="md:col-span-3 relative h-[250px] sm:h-[300px] md:h-[500px] block group cursor-pointer">
          <img
            src="https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1200&h=800&fit=crop&q=80"
            alt="Architecture"
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute bottom-0 left-0 p-4 sm:p-6">
            <span className="text-white text-xl sm:text-2xl font-bold">Architecture</span>
          </div>
        </Link>

        {/* Right - Dark Grey Text Box (1/4 width) */}
        <div className="md:col-span-1 bg-[#333333] p-6 sm:p-8 lg:p-12 flex flex-col justify-center h-auto md:h-[500px] min-h-[200px] sm:min-h-[250px]">
          <p className="text-[#D0D0D0] text-xs sm:text-sm md:text-base font-bold leading-relaxed mb-4 sm:mb-6 break-words">
            From the very beginning our practice was founded on a philosophy of innovation, sustainability and design. We continue to learn from the past and creatively embrace the challenges of the future, with a firm belief that good design makes a difference.
          </p>
          <p className="text-[#D0D0D0] text-sm sm:text-base md:text-lg logo-font mb-4 sm:mb-6">
            KOTE KWEMA
          </p>
          <Link to="/projects" className="inline-block px-4 py-2 sm:px-5 sm:py-2.5 bg-[#D0D0D0] text-[#1A1A1A] hover:bg-white transition-colors duration-200 font-bold tracking-wide text-center text-xs sm:text-sm rounded-full">
            View Our Portfolio
          </Link>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
};

export default Architecture;


