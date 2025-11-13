import { ArrowDown } from "lucide-react";
import heroImage from "@/assets/hero-architecture.jpg";

const Hero = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Hero Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Modern Architecture"
          className="w-full h-full object-cover animate-scale-in"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-light text-white mb-6 animate-fade-up tracking-tight">
          Designing Spaces
          <br />
          <span className="font-extralight">For Tomorrow</span>
        </h1>
        <p className="text-lg md:text-xl text-white/90 max-w-2xl mb-8 animate-fade-in font-light tracking-wide">
          Award-winning architecture firm creating innovative and sustainable designs
        </p>

        {/* Scroll Indicator */}
        <a
          href="#projects"
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce"
        >
          <ArrowDown className="h-6 w-6 text-white" />
        </a>
      </div>
    </section>
  );
};

export default Hero;
