import { X, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MenuLink } from "./MenuLink";
import { MenuSection } from "./MenuSection";
import { MenuSubLink } from "./MenuSubLink";
import heroImage from "@/assets/hero-architecture.jpg";

interface MenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuCategories = [
  { name: "Expertise", href: "/expertise", hasSubmenu: true },
  { name: "Projects", href: "/projects" },
  { name: "Studio", href: "/studio" },
  { name: "People", href: "/people" },
  { name: "News", href: "/news" },
  { name: "Insights", href: "/insights" },
  { name: "Careers", href: "/careers" },
  { name: "Contact", href: "/contact" },
];

const expertiseSubcategories = [
  { name: "Architecture", href: "/expertise#architecture" },
  { name: "Climate and Sustainable Design", href: "/expertise#climate" },
  { name: "Engineering", href: "/expertise#engineering" },
  { name: "Industrial Design", href: "/expertise#industrial" },
  { name: "Interiors", href: "/expertise#interiors" },
  { name: "Technology and Research", href: "/expertise#technology" },
  { name: "Urban and Landscape Design", href: "/expertise#urban" },
  { name: "Workplace Consultancy", href: "/expertise#workplace" },
];

const socialIcons = [
  { name: "Pinterest", href: "#" },
  { name: "Instagram", href: "#" },
  { name: "LinkedIn", href: "#" },
  { name: "Twitter", href: "#" },
];

const Menu = ({ isOpen, onClose }: MenuProps) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop with blur */}
      <div
        className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-500"
        onClick={onClose}
      />

      {/* Menu Container - Slides in from right */}
      <div className="fixed inset-0 z-50 flex flex-col md:flex-row animate-slide-in-right pointer-events-none">
        {/* Left Half - Background Image (Desktop) / Hidden (Mobile) */}
        <div className="hidden md:block w-1/2 h-full relative overflow-hidden">
          <img
            src={heroImage}
            alt="Menu Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/5" />
        </div>

        {/* Right Half - Menu Content - Foster + Partners Style */}
        <div className="w-full md:w-1/2 h-full bg-white overflow-y-auto relative pointer-events-auto">
          {/* Close Button */}
          <div className="absolute top-6 right-6 z-10">
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-10 w-10 rounded-full hover:bg-[#E5E5E5] transition-colors"
            >
              <X className="h-5 w-5 text-black" />
            </Button>
          </div>

          {/* Content Container */}
          <div className="h-full flex flex-col px-6 md:px-12 lg:px-20 py-12 md:py-20">
            {/* Mobile Image (only on mobile) */}
            <div className="md:hidden w-full h-48 mb-12 relative overflow-hidden">
              <img
                src={heroImage}
                alt="Menu Background"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Main Navigation - Left Column Categories */}
            <div className="flex-1 flex flex-col md:flex-row gap-16 md:gap-20">
              {/* Left Column - Main Categories */}
              <div className="flex-1">
                <nav className="space-y-1 md:space-y-2">
                  {menuCategories.map((category, index) => (
                    <MenuLink
                      key={category.name}
                      href={category.href}
                      onClick={onClose}
                      delay={index * 50}
                    >
                      {category.name}
                    </MenuLink>
                  ))}
                </nav>
              </div>

              {/* Right Column - Expertise Subcategories */}
              <div className="flex-1 border-l-0 md:border-l border-[#E5E5E5] pl-0 md:pl-16">
                <MenuSection title="Expertise">
                  <div className="space-y-2 mt-8">
                    {expertiseSubcategories.map((subcategory, index) => (
                      <MenuSubLink
                        key={subcategory.name}
                        href={subcategory.href}
                        onClick={onClose}
                        delay={index * 30}
                      >
                        {subcategory.name}
                      </MenuSubLink>
                    ))}
                  </div>
                </MenuSection>
              </div>
            </div>

            {/* Social Icons Row - Bottom Right */}
            <div className="mt-16 md:mt-20 pt-8 border-t border-[#E5E5E5]">
              <div className="flex items-center gap-8">
                {socialIcons.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    className="text-xs text-[#4A4A4A] hover:text-black transition-colors duration-200 uppercase tracking-widest font-light"
                  >
                    {social.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Menu;

