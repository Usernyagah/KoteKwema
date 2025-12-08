import { ArrowDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import heroImage from "@/assets/hero-architecture.jpg";
import compressedVideo from "@/assets/compressed_VID-20251127-WA0001.mp4";
import adobeStockVideo1 from "@/assets/AdobeStock_226432701_Video_HD_Preview.mov";
import adobeStockVideo2 from "@/assets/AdobeStock_197756865_Video_HD_Preview.mov";

// High-quality architecture videos - using local Adobe Stock videos for first two, compressed local for third
const video1 = adobeStockVideo1;
const video2 = adobeStockVideo2;
const video3 = compressedVideo;

// Simplified video enhancement - just draw video to canvas with high quality settings
const enhanceVideoFrame = (
  video: HTMLVideoElement,
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D
) => {
  if (!video || video.readyState < 2 || !video.videoWidth || !video.videoHeight) return;

  const width = video.videoWidth;
  const height = video.videoHeight;

  // Set canvas size to match video
  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width;
    canvas.height = height;
  }

  // Draw video frame to canvas with maximum quality settings
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  
  // Additional quality settings for compressed video
  ctx.filter = 'none'; // Disable any default filtering that might degrade quality
  
  // Prevent excessive upscaling - limit to 120% of native resolution
  const maxUpscale = 1.2;
  const scaleX = Math.min(canvas.width / width, maxUpscale);
  const scaleY = Math.min(canvas.height / height, maxUpscale);
  const scale = Math.min(scaleX, scaleY);
  
  // Calculate final dimensions
  const finalWidth = width * scale;
  const finalHeight = height * scale;
  const offsetX = (canvas.width - finalWidth) / 2;
  const offsetY = (canvas.height - finalHeight) / 2;
  
  // Draw the video frame at optimal size to prevent quality loss
  // If upscaling is needed, limit it to preserve quality
  if (scale <= 1) {
    // Downscaling or native size - draw at full quality
    ctx.drawImage(video, 0, 0, width, height, offsetX, offsetY, finalWidth, finalHeight);
  } else {
    // Limited upscaling - draw with quality preservation
    ctx.drawImage(video, 0, 0, width, height, offsetX, offsetY, finalWidth, finalHeight);
  }
  
  // Ensure pixel-perfect rendering for compressed video
  // This maintains quality even with compressed source
};

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [videoErrors, setVideoErrors] = useState<boolean[]>([]);
  const [videoProgress, setVideoProgress] = useState<number[]>([0, 0, 0]);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const canvasRefs = useRef<(HTMLCanvasElement | null)[]>([]);
  const animationFrameRefs = useRef<(number | null)[]>([]);
  const progressTimerRef = useRef<NodeJS.Timeout | null>(null);
  const VIDEO_DURATION = 5; // 5 seconds
  
  const slides = [
    {
      video: video1,
      category: "News",
      title: "New sustainable architecture project announced",
    },
    {
      video: video2,
      category: "News",
      title: "Award recognition for excellence in design",
    },
    {
      video: video3,
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
          // Calculate progress based on 5 second duration
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
        // Move to next video when this video ends (if it ends before 5 seconds)
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

  // Real-time video enhancement using canvas
  useEffect(() => {
    const enhanceCurrentVideo = () => {
      const currentVideo = videoRefs.current[currentSlide];
      const currentCanvas = canvasRefs.current[currentSlide];
      
      if (!currentVideo || !currentCanvas || currentVideo.readyState < 2) {
        return;
      }

      const ctx = currentCanvas.getContext('2d', { 
        alpha: false,
        desynchronized: true,
        willReadFrequently: false 
      });
      
      if (!ctx) return;

      // Enhance and draw frame
      enhanceVideoFrame(currentVideo, currentCanvas, ctx);
    };

    // Start enhancement loop for current video
    const animate = () => {
      if (currentSlide >= 0 && videoRefs.current[currentSlide]) {
        enhanceCurrentVideo();
        animationFrameRefs.current[currentSlide] = requestAnimationFrame(animate);
      }
    };

    // Start animation if video is ready
    const currentVideo = videoRefs.current[currentSlide];
    if (currentVideo && currentVideo.readyState >= 2) {
      animationFrameRefs.current[currentSlide] = requestAnimationFrame(animate);
    } else if (currentVideo) {
      currentVideo.addEventListener('loadeddata', () => {
        animationFrameRefs.current[currentSlide] = requestAnimationFrame(animate);
      }, { once: true });
    }

    // Cleanup
    return () => {
      animationFrameRefs.current.forEach((frameId, index) => {
        if (frameId !== null) {
          cancelAnimationFrame(frameId);
          animationFrameRefs.current[index] = null;
        }
      });
    };
  }, [currentSlide]);

  // Handle window resize for responsive video sizing
  useEffect(() => {
    const handleResize = () => {
      videoRefs.current.forEach((video) => {
        if (video && video.videoWidth && video.videoHeight) {
          const container = video.parentElement;
          if (container) {
            const containerWidth = container.clientWidth;
            const containerHeight = container.clientHeight;
            const widthScale = containerWidth / video.videoWidth;
            const heightScale = containerHeight / video.videoHeight;
            const MAX_UPSCALE = 1.2;
            const isMobile = window.innerWidth < 768;

            if (isMobile) {
              if (widthScale > MAX_UPSCALE || heightScale > MAX_UPSCALE) {
                video.style.objectFit = 'contain';
                video.style.objectPosition = 'center center';
                video.style.backgroundColor = '#000000';
              } else {
                video.style.objectFit = 'cover';
                video.style.objectPosition = 'center center';
              }
            } else {
              if (widthScale <= 1 && heightScale <= 1) {
                video.style.objectFit = 'cover';
                video.style.objectPosition = 'center center';
              } else if (widthScale > MAX_UPSCALE || heightScale > MAX_UPSCALE) {
                video.style.objectFit = 'contain';
                video.style.objectPosition = 'center center';
                video.style.backgroundColor = '#000000';
              } else {
                video.style.objectFit = 'cover';
                video.style.objectPosition = 'center center';
              }
            }
          }
        }
      });
    };

    window.addEventListener('resize', handleResize);
    // Call once on mount to set initial sizing
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section className="relative w-full overflow-hidden bg-black min-h-[100dvh] h-screen">
      {/* Hero Videos */}
      <div className="absolute inset-0 bg-black w-full h-full overflow-hidden md:h-screen h-[100dvh]">
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
              className={`absolute inset-0 w-full h-full transition-opacity duration-500 ${
                index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
              style={{
                width: '100%',
                height: '100%',
                objectPosition: 'center',
                // Hardware acceleration for smooth playback
                WebkitTransform: 'translate3d(0, 0, 0)',
                transform: 'translate3d(0, 0, 0)',
                WebkitBackfaceVisibility: 'hidden',
                backfaceVisibility: 'hidden',
                // Quality preservation settings - prevent blurry upscaling
                // Use auto for browser's best scaling algorithm, or optimize-contrast for sharper edges
                imageRendering: 'auto', // Browser optimizes based on content
                WebkitImageRendering: '-webkit-optimize-contrast', // Better quality preservation for video
                willChange: 'transform',
                // Prevent quality degradation
                WebkitFontSmoothing: 'antialiased',
                MozOsxFontSmoothing: 'grayscale',
                // Force browser to use best scaling algorithm
                msInterpolationMode: 'bicubic',
              }}
              onLoadedMetadata={(e) => {
                const video = e.currentTarget;
                if ('webkitDecodedFrameCount' in video) {
                  video.setAttribute('playsinline', 'true');
                }
                
                // Mobile-responsive video sizing
                const isMobile = window.innerWidth < 768;
                
                if (video.videoWidth && video.videoHeight) {
                  const container = video.parentElement;
                  if (container) {
                    const containerWidth = container.clientWidth;
                    const containerHeight = container.clientHeight;
                    
                    // Calculate scale needed
                    const widthScale = containerWidth / video.videoWidth;
                    const heightScale = containerHeight / video.videoHeight;
                    
                    // Maximum upscale factor - prevent quality loss beyond 1.2x (20% upscale)
                    const MAX_UPSCALE = 1.2;
                    
                    // Mobile-specific handling
                    if (isMobile) {
                      // On mobile: prefer contain to show full video, avoid cropping
                      if (widthScale > MAX_UPSCALE || heightScale > MAX_UPSCALE) {
                        video.style.objectFit = 'contain';
                        video.style.objectPosition = 'center center';
                        video.style.backgroundColor = '#000000';
                      } else {
                        // Use cover on mobile if video is large enough
                        video.style.objectFit = 'cover';
                        video.style.objectPosition = 'center center';
                      }
                    } else {
                      // Desktop: Quality preservation strategy
                      if (widthScale <= 1 && heightScale <= 1) {
                        // Video is larger than container - use cover (downscaling, no quality loss)
                        video.style.objectFit = 'cover';
                        video.style.objectPosition = 'center center';
                      } else if (widthScale > MAX_UPSCALE || heightScale > MAX_UPSCALE) {
                        // Excessive upscaling detected - use contain to show full video without quality loss
                        video.style.objectFit = 'contain';
                        video.style.objectPosition = 'center center';
                        video.style.backgroundColor = '#000000';
                      } else if (widthScale > 1 || heightScale > 1) {
                        // Moderate upscaling - use cover but limit to native resolution
                        video.style.objectFit = 'cover';
                        video.style.objectPosition = 'center center';
                      } else {
                        // No upscaling needed
                        video.style.objectFit = 'cover';
                        video.style.objectPosition = 'center center';
                      }
                    }
                    
                    // Force high-quality rendering to prevent quality loss on upscale
                    video.style.imageRendering = 'auto';
                    video.style.WebkitImageRendering = '-webkit-optimize-contrast';
                  }
                }
              }}
              muted
              playsInline
              preload={index === currentSlide ? "auto" : "metadata"}
              autoPlay={index === currentSlide}
              disablePictureInPicture
              disableRemotePlayback
              controlsList="nodownload nofullscreen noremoteplayback"
              webkit-playsinline="true"
              x5-playsinline="true"
              x5-video-player-type="h5"
              x5-video-player-fullscreen="false"
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
                // Auto-advance to next video when current video ends (if it ends before 5 seconds)
                if (index === currentSlide) {
                  setTimeout(() => {
                    const nextSlide = (index + 1) % slides.length;
                    setCurrentSlide(nextSlide);
                  }, 300);
                }
              }}
              onTimeUpdate={() => {
                // Stop video after 5 seconds
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
            >
              <source src={slide.video} type="video/mp4" />
            </video>
          )
        ))}
      </div>

      {/* News Overlay - Bottom Left */}
      <div className="absolute bottom-0 left-0 p-6 lg:p-12 max-w-2xl z-10">
        <div className="space-y-2">
          <span className="text-xs text-white font-bold tracking-wide uppercase">
            {slides[currentSlide].category}
          </span>
          <h2 className="text-base md:text-lg lg:text-xl font-bold text-white leading-tight">
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
