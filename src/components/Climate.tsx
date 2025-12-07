import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-architecture.jpg";

const Climate = () => {
  return (
    <section id="climate" className="bg-[#1A1A1A]">
      <div className="pt-12 pb-4">
        <div className="pl-6 lg:pl-12 pr-6 lg:pr-12">
          <div className="mb-4">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white text-center">
              Climate and Sustainable Design
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Left - Large Panoramic Image with text overlay (3/4 width) */}
        <Link to="/expertise/climate" className="md:col-span-3 relative h-[300px] md:h-[500px] block group cursor-pointer">
          <img
            src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&h=800&fit=crop&q=80"
            alt="Climate and Sustainable Design"
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute bottom-0 left-0 p-6">
            <span className="text-white text-xl font-bold">Climate and Sustainable Design</span>
          </div>
        </Link>

        {/* Right - Dark Grey Text Box (1/4 width) */}
        <div className="md:col-span-1 bg-[#333333] p-6 lg:p-8 flex flex-col justify-center h-auto md:h-[400px] min-h-[200px]">
          <p className="text-[#D0D0D0] text-lg font-bold leading-relaxed mb-6">
            Sustainability has been a central theme of our work for more than five decades. We work closely with our clients to develop bespoke design solutions that are optimised for their operations and the planet.
          </p>
          <p className="text-[#D0D0D0] text-xl logo-font">
            KOTE KWEMA
          </p>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
};

export default Climate;

