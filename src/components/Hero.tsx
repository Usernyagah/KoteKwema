import { ArrowDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import heroImage from "@/assets/hero-architecture.jpg";

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [videoErrors, setVideoErrors] = useState<boolean[]>([]);
  const [videoProgress, setVideoProgress] = useState<number[]>([0, 0, 0]);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const progressTimerRef = useRef<NodeJS.Timeout | null>(null);
  const VIDEO_DURATION = 10; // 10 seconds
  
  const slides = [
    {
      video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      category: "News",
      title: "New sustainable architecture project announced",
    },
    {
      video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      category: "News",
      title: "Award recognition for excellence in design",
    },
    {
      video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      category: "News",
      title: "Innovative design solutions for modern cities",
    },
  ];

  // Handle video progress and auto-advance for all videos
  useEffect(() => {
    const videoElements = videoRefs.current;
    const handlers: Array<{ video: HTMLVideoElement; timeupdate: () => void; ended: () => void }> = [];

    videoElements.forEach((video, index) => {
      if (!video) return;

      const updateProgress = () => {
        if (index === currentSlide) {
          // Calculate progress based on 30 second duration
          const progress = Math.min((video.currentTime / VIDEO_DURATION) * 100, 100);
          setVideoProgress((prev) => {
            const newProgress = [...prev];
            newProgress[index] = progress;
            return newProgress;
          });
          
          // Stop video and advance after 30 seconds
          if (video.currentTime >= VIDEO_DURATION) {
            video.pause();
            setTimeout(() => {
              const nextSlide = (index + 1) % slides.length;
              setCurrentSlide(nextSlide);
            }, 300);
          }
        }
      };

      const handleTimeUpdate = () => updateProgress();
      const handleEnded = () => {
        // Move to next video when this video ends (if it ends before 30 seconds)
        if (index === currentSlide) {
          setTimeout(() => {
            const nextSlide = (index + 1) % slides.length;
            setCurrentSlide(nextSlide);
          }, 300);
        }
      };

      video.addEventListener("timeupdate", handleTimeUpdate);
      video.addEventListener("ended", handleEnded);

      handlers.push({ video, timeupdate: handleTimeUpdate, ended: handleEnded });
    });

    return () => {
      handlers.forEach(({ video, timeupdate, ended }) => {
        video.removeEventListener("timeupdate", timeupdate);
        video.removeEventListener("ended", ended);
      });
    };
  }, [currentSlide, slides.length]);

  // Play the current video and pause others
  useEffect(() => {
    const playCurrentVideo = async () => {
      const currentVideo = videoRefs.current[currentSlide];
      if (!currentVideo) return;

      // Reset progress for new video
      setVideoProgress((prev) => {
        const newProgress = [...prev];
        newProgress[currentSlide] = 0;
        return newProgress;
      });

      // Pause all other videos
      videoRefs.current.forEach((video, index) => {
        if (video && index !== currentSlide) {
          video.pause();
          video.currentTime = 0;
        }
      });

      // Reset and play current video
      currentVideo.currentTime = 0;
      
      try {
        // Load the video if needed
        if (currentVideo.readyState < 2) {
          currentVideo.load();
        }
        
        // Wait for video to be ready
        if (currentVideo.readyState >= 2) {
          await currentVideo.play();
        } else {
          const playWhenReady = () => {
            currentVideo.play().catch((error) => {
              console.log("Video autoplay prevented:", error);
            });
          };
          currentVideo.addEventListener("canplay", playWhenReady, { once: true });
          currentVideo.addEventListener("loadeddata", playWhenReady, { once: true });
        }
      } catch (error) {
        console.log("Video autoplay prevented:", error);
      }
    };

    const timer = setTimeout(playCurrentVideo, 100);
    return () => clearTimeout(timer);
  }, [currentSlide]);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      {/* Hero Videos */}
      <div className="absolute inset-0 bg-black">
        {slides.map((slide, index) => (
          videoErrors[index] ? (
            <img
              key={`img-${index}`}
              src={heroImage}
              alt="Architecture"
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
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
                index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
              muted
              playsInline
              preload="auto"
              onError={(e) => {
                console.error(`Video ${index} error:`, e);
                // Mark this video as having an error
                setVideoErrors((prev) => {
                  const newErrors = [...prev];
                  newErrors[index] = true;
                  return newErrors;
                });
                // If current video fails, try to advance to next
                if (index === currentSlide) {
                  setTimeout(() => {
                    const nextSlide = (index + 1) % slides.length;
                    // Only advance if next video hasn't errored
                    if (!videoErrors[nextSlide]) {
                      setCurrentSlide(nextSlide);
                    }
                  }, 500);
                }
              }}
              onLoadedData={() => {
                if (index === currentSlide && videoRefs.current[index]) {
                  videoRefs.current[index]?.play().catch((error) => {
                    console.log("Video autoplay prevented:", error);
                  });
                }
              }}
              onCanPlay={() => {
                if (index === currentSlide && videoRefs.current[index]) {
                  videoRefs.current[index]?.play().catch((error) => {
                    console.log("Video autoplay prevented:", error);
                  });
                }
              }}
              onEnded={() => {
                // Auto-advance to next video when current video ends (if it ends before 30 seconds)
                if (index === currentSlide) {
                  setTimeout(() => {
                    const nextSlide = (index + 1) % slides.length;
                    setCurrentSlide(nextSlide);
                  }, 300);
                }
              }}
              onTimeUpdate={() => {
                // Stop video after 30 seconds
                if (index === currentSlide && videoRefs.current[index]) {
                  const video = videoRefs.current[index];
                  if (video.currentTime >= VIDEO_DURATION) {
                    video.pause();
                    video.currentTime = VIDEO_DURATION;
                    setTimeout(() => {
                      const nextSlide = (index + 1) % slides.length;
                      setCurrentSlide(nextSlide);
                    }, 300);
                  }
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

      {/* Navigation Dots with Circular Progress - Bottom Center */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-10">
        {slides.map((_, index) => {
          const isActive = currentSlide === index;
          const progress = videoProgress[index];
          
          return (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className="relative w-3 h-3 flex items-center justify-center group"
              aria-label={`Go to slide ${index + 1}`}
            >
              {/* Background circle */}
              <div className={`absolute inset-0 rounded-full transition-all duration-300 ${
                isActive ? "bg-white/30" : "bg-white/20"
              }`} />
              
              {/* Progress circle - animates outward */}
              {isActive && (
                <svg
                  className="absolute inset-0 w-3 h-3 transform -rotate-90"
                  viewBox="0 0 12 12"
                >
                  <circle
                    cx="6"
                    cy="6"
                    r="5"
                    fill="none"
                    stroke="white"
                    strokeWidth="1"
                    strokeDasharray={`${2 * Math.PI * 5}`}
                    strokeDashoffset={`${2 * Math.PI * 5 * (1 - progress / 100)}`}
                    className="transition-all duration-100 ease-linear"
                    style={{
                      strokeLinecap: "round",
                    }}
                  />
                </svg>
              )}
              
              {/* Center dot */}
              <div className={`relative w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                isActive ? "bg-white" : "bg-white/50 group-hover:bg-white/75"
              }`} />
            </button>
          );
        })}
      </div>

      {/* Scroll Indicator - Right Side */}
      <a
        href="#studio"
        className="absolute right-8 top-1/2 -translate-y-1/2 z-10 group"
      >
        <div className="w-12 h-28 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20 hover:bg-white/20 transition-colors">
          <svg 
            className="h-16 w-6 text-white" 
            viewBox="0 0 24 64" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              d="M12 0L12 52M12 52L4 44M12 52L20 44" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </a>
    </section>
  );
};

export default Hero;
