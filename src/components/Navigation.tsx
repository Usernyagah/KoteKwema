import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu as MenuIcon, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import SearchOverlay from "./SearchOverlay";
import Menu from "./Menu";
// Import logo with transparent background
import logo from "@/assets/logo-removebg-preview.png";

interface NavigationProps {
  variant?: "dark" | "white";
}

const Navigation = ({ variant = "dark" }: NavigationProps = {}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Only hide navbar on homepage (dark variant) when scrolled past studio section
      if (variant === "dark") {
        const studioSection = document.getElementById("studio");
        if (studioSection) {
          const studioSectionTop = studioSection.offsetTop;
          // Hide navbar when scrolled past studio section
          setIsNavbarVisible(window.scrollY < studioSectionTop);
        }
      } else {
        // White variant always visible
        setIsNavbarVisible(true);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [variant]);

  useEffect(() => {
    // Prevent scrolling when overlays are open
    if (isSearchOpen || isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isSearchOpen, isMenuOpen]);

  const isWhite = variant === "white";
  const bgColor = isWhite ? "bg-white/95" : "bg-[#1A1A1A]/80";
  const textColor = isWhite ? "text-black" : "text-white";
  const iconColor = isWhite ? "text-black" : "text-white";
  const hoverBg = isWhite ? "hover:bg-[#F5F5F5]" : "hover:bg-transparent";

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-40 ${bgColor} backdrop-blur-sm transition-transform duration-300 border-b ${isWhite ? "border-[#E5E5E5]" : "border-transparent"} ${
          isNavbarVisible ? "translate-y-0" : "-translate-y-full"
        }`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="flex items-center h-20">
          {/* Logo - Far Left with Fixed Padding */}
          <Link to="/" className="flex items-center gap-3 pl-6 lg:pl-12">
            <img 
              src={logo} 
              alt="Kote Kwema" 
              className="h-16 md:h-20 w-auto"
              style={{
                backgroundColor: 'transparent',
                filter: isWhite 
                  ? 'brightness(1.2) contrast(1.1)' 
                  : 'brightness(0) invert(1) brightness(1.2)',
                opacity: 1,
                display: 'block',
              }}
            />
            <div className="flex flex-col">
              <span className={`text-xl logo-font ${textColor}`}>KOTE KWEMA</span>
              <span className={`text-xs ${textColor} slogan-font`}>With Love for Nature</span>
              <span className={`text-[10px] ${textColor} font-medium mt-0.5`}>Architecture, Engineering & Construction</span>
            </div>
          </Link>

          {/* Empty Flexible Space */}
          <div className="flex-grow"></div>

          {/* Icons - Far Right with Fixed Padding */}
          <div className="flex items-center pr-6 lg:pr-12">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSearchOpen(true)}
              className={`${hoverBg} ${iconColor}`}
              aria-label="Open search"
              aria-expanded={isSearchOpen}
            >
              <Search className="h-5 w-5" aria-hidden="true" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(true)}
              className={`${hoverBg} ${iconColor}`}
              aria-label="Open menu"
              aria-expanded={isMenuOpen}
            >
              <MenuIcon className="h-5 w-5" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </nav>

      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <Menu 
        isOpen={isMenuOpen} 
        onClose={() => setIsMenuOpen(false)}
      />
    </>
  );
};

export default Navigation;
