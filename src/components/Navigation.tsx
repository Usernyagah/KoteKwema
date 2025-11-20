import { useState, useEffect } from "react";
import { Menu, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import SearchOverlay from "./SearchOverlay";
import MenuOverlay from "./MenuOverlay";
import logo from "@/assets/logo.jpg";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-40 bg-black">
        <div className="flex items-center h-20">
          {/* Logo - Far Left with Fixed Padding */}
          <a href="#" className="flex items-center gap-3 pl-6 lg:pl-12">
            <img src={logo} alt="Kote Kwema" className="h-12 w-auto" />
            <div className="flex flex-col">
              <span className="text-xl font-light tracking-wider text-white">KOTE KWEMA</span>
              <span className="text-xs text-white/70">With Love for Nature</span>
            </div>
          </a>

          {/* Empty Flexible Space */}
          <div className="flex-grow"></div>

          {/* Icons - Far Right with Fixed Padding */}
          <div className="flex items-center pr-6 lg:pr-12">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSearchOpen(true)}
              className="hover:bg-transparent text-white"
            >
              <Search className="h-5 w-5" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(true)}
              className="hover:bg-transparent text-white"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </nav>

      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <MenuOverlay 
        isOpen={isMenuOpen} 
        onClose={() => setIsMenuOpen(false)}
        onSearchClick={() => {
          setIsMenuOpen(false);
          setIsSearchOpen(true);
        }}
      />
    </>
  );
};

export default Navigation;
