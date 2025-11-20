import { ArrowDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import heroImage from "@/assets/hero-architecture.jpg";

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [videoErrors, setVideoErrors] = useState<boolean[]>([]);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  
  const slides = [
    {
      video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      category: "News",
      title: "Ceremony marks opening of Techo International Airport in Cambodia",
    },
    {
      video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      category: "News",
      title: "New sustainable architecture project announced",
    },
    {
      video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      category: "News",
      title: "Award recognition for excellence in design",
    },
  ];

  useEffect(() => {
    // Play the current video and pause others
    const timer = setTimeout(() => {
      videoRefs.current.forEach((video, index) => {
        if (video) {
          if (index === currentSlide) {
            video.play().catch((error) => {
              console.log("Video autoplay prevented:", error);
            });
          } else {
            video.pause();
            video.currentTime = 0;
          }
        }
      });
    }, 100);

    return () => clearTimeout(timer);
  }, [currentSlide]);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Hero Videos */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          videoErrors[index] ? (
            <img
              key={`img-${index}`}
              src={heroImage}
              alt="Architecture"
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                index === currentSlide ? "opacity-100 z-0" : "opacity-0 z-[-1]"
              }`}
            />
          ) : (
            <video
              key={`video-${index}`}
              ref={(el) => {
                if (el) {
                  videoRefs.current[index] = el;
                }
              }}
              src={slide.video}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                index === currentSlide ? "opacity-100 z-0" : "opacity-0 z-[-1]"
              }`}
              loop
              muted
              playsInline
              preload="auto"
              onError={() => {
                setVideoErrors((prev) => {
                  const newErrors = [...prev];
                  newErrors[index] = true;
                  return newErrors;
                });
              }}
              onLoadedData={() => {
                if (index === currentSlide && videoRefs.current[index]) {
                  videoRefs.current[index]?.play().catch(() => {
                    // Autoplay prevented
                  });
                }
              }}
            />
          )
        ))}
      </div>

      {/* News Overlay - Bottom Left */}
      <div className="absolute bottom-0 left-0 p-6 lg:p-12 max-w-2xl z-10">
        <div className="space-y-2">
          <span className="text-xs text-white/80 font-light tracking-wide uppercase">
            {slides[currentSlide].category}
          </span>
          <h2 className="text-base md:text-lg lg:text-xl font-light text-white leading-tight">
            {slides[currentSlide].title}
          </h2>
        </div>
      </div>

      {/* Navigation Dots - Bottom Center */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`transition-all duration-300 ${
              currentSlide === index
                ? "w-2 h-2 bg-white rounded-full"
                : "w-2 h-2 bg-white/50 rounded-full hover:bg-white/75"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Scroll Indicator - Right Side */}
      <a
        href="#studio"
        className="absolute right-8 top-1/2 -translate-y-1/2 z-10 group"
      >
        <div className="w-12 h-20 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20 hover:bg-white/20 transition-colors">
          <ArrowDown className="h-5 w-5 text-white" />
        </div>
      </a>
    </section>
  );
};

export default Hero;
