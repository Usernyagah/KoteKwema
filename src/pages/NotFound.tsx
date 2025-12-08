import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useSEO } from "@/hooks/useSEO";

const NotFound = () => {
  const location = useLocation();

  useSEO({
    title: "Page Not Found",
    description: "The page you're looking for doesn't exist. Return to Kote Kwema's homepage to explore our architecture projects and services.",
  });

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  const popularLinks = [
    { name: "Expertise", href: "/expertise/architecture" },
    { name: "Projects", href: "/projects/residential" },
    { name: "Studio", href: "/studio/about" },
    { name: "Contact", href: "/contact/nairobi" },
  ];

  return (
    <div className="min-h-screen bg-[#1A1A1A]">
      <Navigation />
      <div className="flex min-h-[calc(100vh-200px)] items-center justify-center px-4 py-16">
        <div className="max-w-2xl w-full text-center">
          <h1 className="text-8xl md:text-9xl font-bold text-white mb-4">404</h1>
          <h2 className="text-3xl md:text-4xl font-semibold text-white mb-6">
            Page Not Found
          </h2>
          <p className="text-white/70 text-lg mb-8 max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved. 
            Let's get you back on track.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              to="/"
              className="px-8 py-4 bg-white text-[#1A1A1A] font-bold rounded hover:bg-white/90 transition-colors"
            >
              Return to Home
            </Link>
            <button
              onClick={() => window.history.back()}
              className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded hover:bg-white/10 transition-colors"
            >
              Go Back
            </button>
          </div>

          <div className="border-t border-white/20 pt-8">
            <p className="text-white/60 mb-4">Popular Pages:</p>
            <div className="flex flex-wrap gap-4 justify-center">
              {popularLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="text-white/80 hover:text-white underline transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NotFound;
