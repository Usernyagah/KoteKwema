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
      <nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled ? "bg-background/95 backdrop-blur-md border-b border-border" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-20">
            <a href="#" className="flex items-center gap-3">
              <img src={logo} alt="Kote Kwema" className="h-12 w-auto" />
              <div className="flex flex-col">
                <span className="text-xl font-light tracking-wider text-foreground">KOTE KWEMA</span>
                <span className="text-xs text-muted-foreground">With Love for Nature</span>
              </div>
            </a>

            {/* Desktop Icons */}
            <div className="flex items-center gap-6">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSearchOpen(true)}
                className="hover:bg-transparent"
              >
                <Search className="h-5 w-5" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMenuOpen(true)}
                className="hover:bg-transparent"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <MenuOverlay isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
};

export default Navigation;
