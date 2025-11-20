import { X, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface MenuOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onSearchClick?: () => void;
}

const menuLinks = [
  { name: "Expertise", href: "/expertise" },
  { name: "Projects", href: "/projects" },
  { name: "Studio", href: "/studio" },
  { name: "People", href: "/people" },
  { name: "News", href: "/news" },
  { name: "Insights", href: "/insights" },
  { name: "Careers", href: "/careers" },
  { name: "Contact", href: "/contact" },
];

const MenuOverlay = ({ isOpen, onClose, onSearchClick }: MenuOverlayProps) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />
      
      {/* Right Side Menu Panel */}
      <div className="fixed right-0 top-0 h-full w-full md:w-[35%] lg:w-[30%] z-50 bg-card shadow-2xl transform transition-transform duration-300 ease-in-out">
        <div className="h-full flex flex-col p-6 lg:p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <span className="text-sm text-muted-foreground font-light">Menu</span>
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={onSearchClick}
                className="hover:bg-transparent text-foreground"
              >
                <Search className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="hover:bg-muted rounded-full bg-foreground text-background h-8 w-8"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1">
            <ul className="space-y-1">
              {menuLinks.map((link, index) => (
                <li
                  key={link.name}
                  className="animate-fade-up"
                  style={{ animationDelay: `${index * 30}ms` }}
                >
                  <Link
                    to={link.href}
                    onClick={onClose}
                    className="text-2xl md:text-3xl font-light text-foreground hover:text-muted-foreground transition-colors duration-200 block py-2"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default MenuOverlay;
