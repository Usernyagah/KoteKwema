import { ArrowDown, PlayCircle } from "lucide-react";
import { useState } from "react";
import heroImage from "@/assets/hero-architecture.jpg";

const Hero = () => {
  const [activeVideo, setActiveVideo] = useState<number | null>(null);

  const architectureVideos = [
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
  ];

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

        {/* Scroll Indicator - Right Center */}
        <a
          href="#projects"
          className="absolute right-8 top-1/2 -translate-y-1/2 animate-bounce"
        >
          <ArrowDown className="h-6 w-6 text-white" />
        </a>

        {/* Video Circle Icons - Bottom Center */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-4">
          {[0, 1, 2].map((i) => (
            <button
              key={i}
              onClick={() => setActiveVideo(i)}
              className="group relative"
              aria-label={`Play video ${i + 1}`}
            >
              <PlayCircle className="h-8 w-8 text-white/70 hover:text-white transition-colors" />
            </button>
          ))}
        </div>
      </div>

      {/* Video Modal */}
      {activeVideo !== null && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setActiveVideo(null)}
        >
          <div className="relative w-full max-w-4xl aspect-video">
            <video
              src={architectureVideos[activeVideo]}
              controls
              autoPlay
              className="w-full h-full"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              onClick={() => setActiveVideo(null)}
              className="absolute -top-10 right-0 text-white hover:text-accent transition-colors"
              aria-label="Close video"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;
