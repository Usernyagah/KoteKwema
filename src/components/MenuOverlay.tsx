import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MenuOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuLinks = [
  { name: "Projects", href: "#projects" },
  { name: "Expertise", href: "#expertise" },
  { name: "About", href: "#about" },
  { name: "News", href: "#news" },
  { name: "Careers", href: "#careers" },
  { name: "Contact", href: "#contact" },
];

const MenuOverlay = ({ isOpen, onClose }: MenuOverlayProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-background animate-fade-in">
      <div className="container mx-auto px-6 lg:px-12 h-full flex flex-col">
        <div className="flex items-center justify-between h-20">
          <a href="#" className="text-2xl font-light tracking-wider text-foreground" onClick={onClose}>
            Architecture
          </a>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="hover:bg-transparent"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="flex-1 flex items-center">
          <nav className="w-full">
            <ul className="space-y-6">
              {menuLinks.map((link, index) => (
                <li
                  key={link.name}
                  className="animate-fade-up"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <a
                    href={link.href}
                    onClick={onClose}
                    className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tight hover:text-muted-foreground transition-colors duration-300 block"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="pb-12">
          <div className="flex flex-wrap gap-8 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors duration-200">
              Instagram
            </a>
            <a href="#" className="hover:text-foreground transition-colors duration-200">
              LinkedIn
            </a>
            <a href="#" className="hover:text-foreground transition-colors duration-200">
              Twitter
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuOverlay;
