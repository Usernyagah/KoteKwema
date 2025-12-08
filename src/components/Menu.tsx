import { ArrowUpRight, X as XIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MenuLink } from "./MenuLink";
import { MenuSection } from "./MenuSection";
import { MenuSubLink } from "./MenuSubLink";
import { useState } from "react";
import heroImage from "@/assets/hero-architecture.jpg";
import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";
import project4 from "@/assets/project-4.jpg";

interface MenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuCategories = [
  { name: "Expertise", href: "/expertise/architecture", hasSubmenu: true },
  { name: "Projects", href: "/projects/residential", hasSubmenu: true },
  { name: "Studio", href: "/studio/about", hasSubmenu: true },
  { name: "People", href: "/people/leadership", hasSubmenu: true },
  { name: "News", href: "/news/announcements", hasSubmenu: true },
  { name: "Careers", href: "/careers/positions", hasSubmenu: true },
  { name: "Contact", href: "/contact/nairobi", hasSubmenu: true },
];

const expertiseSubcategories = [
  { name: "Architecture", href: "/expertise/architecture" },
  { name: "Climate and Sustainable Design", href: "/expertise/climate" },
  { name: "Engineering", href: "/expertise/engineering" },
  { name: "Interiors", href: "/expertise/interiors" },
  { name: "Technology and Research", href: "/expertise/technology" },
  { name: "Urban and Landscape Design", href: "/expertise/urban" },
];

const projectsSubcategories = [
  { name: "Residential", href: "/projects/residential" },
  { name: "Commercial", href: "/projects/commercial" },
  { name: "Cultural", href: "/projects/cultural" },
  { name: "Mixed-Use", href: "/projects/mixed-use" },
];

const studioSubcategories = [
  { name: "About", href: "/studio/about" },
  { name: "History & Philosophy", href: "/studio/history" },
  { name: "Work Process", href: "/studio/process" },
  { name: "Awards & Recognition", href: "/studio/awards" },
];

const peopleSubcategories = [
  { name: "Leadership", href: "/people/leadership" },
  { name: "Architects", href: "/people/architects" },
];

const newsSubcategories = [
  { name: "Firm Announcements", href: "/news/announcements" },
  { name: "Awards & Recognition", href: "/news/news-awards" },
];

const careersSubcategories = [
  { name: "Open Positions", href: "/careers/positions" },
  { name: "Life at Kote Kwema", href: "/careers/life" },
  { name: "Application Process", href: "/careers/application" },
  { name: "Benefits", href: "/careers/benefits" },
];

const contactSubcategories = [
  { name: "Nairobi Office", href: "/contact/nairobi" },
  { name: "Request Consultation", href: "/contact/consultation" },
  { name: "General Inquiry", href: "/contact/inquiry" },
  { name: "Project Inquiry", href: "/contact/project" },
];

const getSubcategories = (categoryName: string) => {
  switch (categoryName) {
    case "Expertise":
      return expertiseSubcategories;
    case "Projects":
      return projectsSubcategories;
    case "Studio":
      return studioSubcategories;
    case "People":
      return peopleSubcategories;
    case "News":
      return newsSubcategories;
    case "Careers":
      return careersSubcategories;
    case "Contact":
      return contactSubcategories;
    default:
      return [];
  }
};

// Official X logo SVG component
const XLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-label="X">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const socialIcons = [
  { name: "X", href: "https://x.com/KoteKwema", icon: XLogo },
];

const categoryImages: Record<string, string> = {
  "Expertise": heroImage,
  "Projects": project1,
  "Studio": project2,
  "People": project3,
  "News": project4,
  "Careers": "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=800&fit=crop&q=80",
  "Contact": "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1200&h=800&fit=crop&q=80",
};

const Menu = ({ isOpen, onClose }: MenuProps) => {
  const [clickedCategory, setClickedCategory] = useState<string | null>(null);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  
  if (!isOpen) return null;
  
  // Show subtopics for clicked category or hovered category
  // Hover shows both background image and subtopics
  const selectedCategory = clickedCategory || hoveredCategory;
  const currentSubcategories = selectedCategory ? getSubcategories(selectedCategory) : []; // Show subtopics for clicked or hovered category
  const backgroundImage = selectedCategory ? categoryImages[selectedCategory] || heroImage : heroImage;

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
            src={backgroundImage}
            alt="Menu Background"
            className="w-full h-full object-cover transition-opacity duration-500"
          />
          <div className="absolute inset-0 bg-black/5" />
        </div>

        {/* Right Half - Menu Content - Foster + Partners Style */}
        <div className="w-full md:w-1/2 h-full bg-white overflow-hidden relative pointer-events-auto">
          {/* Close Button */}
          <div className="absolute top-6 right-6 z-10">
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-10 w-10 rounded-full hover:bg-[#E5E5E5] transition-colors"
            >
              <XIcon className="h-5 w-5 text-black" />
            </Button>
          </div>

          {/* Content Container */}
          <div className="h-full flex flex-col px-4 md:px-6 lg:px-12 xl:px-16 py-6 md:py-8 lg:py-12 overflow-hidden">
            {/* Main Navigation - Left Column Categories */}
            <div className="flex-1 flex flex-col md:flex-row gap-6 md:gap-8 lg:gap-12 min-h-0">
              {/* Left Column - Main Categories */}
              <div className="flex-1 min-w-0">
                <nav className="space-y-0.5 md:space-y-1">
                  {menuCategories.map((category, index) => {
                    const isSelected = selectedCategory === category.name;
                    const isClicked = clickedCategory === category.name;
                    
                    return (
                      <MenuLink
                        key={category.name}
                        href={category.hasSubmenu ? "#" : category.href}
                        onClick={(e) => {
                          if (category.hasSubmenu) {
                            e.preventDefault(); // Prevent navigation
                            // Toggle clicked category - if already clicked, deselect
                            if (clickedCategory === category.name) {
                              setClickedCategory(null);
                            } else {
                              setClickedCategory(category.name);
                            }
                          }
                          // If no submenu, allow navigation to proceed
                        }}
                        onMouseEnter={() => {
                          if (category.hasSubmenu) {
                            // Show hover preview with subtopics
                            setHoveredCategory(category.name);
                          }
                        }}
                        onMouseLeave={() => {
                          // Only clear hover if category is not clicked
                          if (clickedCategory !== category.name) {
                            setHoveredCategory(null);
                          }
                        }}
                        isActive={isSelected}
                        delay={index * 50}
                      >
                        {category.name}
                      </MenuLink>
                    );
                  })}
                </nav>
              </div>

              {/* Right Column - Subcategories - Show when category is clicked or hovered */}
              <div className="flex-1 border-l-0 md:border-l border-[#E5E5E5] pl-0 md:pl-8 lg:pl-12 min-w-0 mt-4 md:mt-0">
                {selectedCategory && (
                  <MenuSection title={selectedCategory}>
                    <div className="space-y-1 mt-4 md:mt-6">
                      {currentSubcategories.map((subcategory, index) => (
                        <MenuSubLink
                          key={subcategory.name}
                          href={subcategory.href}
                          onClick={onClose}
                          delay={index * 30}
                          disabled={!clickedCategory}
                        >
                          {subcategory.name}
                        </MenuSubLink>
                      ))}
                    </div>
                  </MenuSection>
                )}
              </div>
            </div>

            {/* Social Icons Row - Bottom Right */}
            <div className="mt-4 md:mt-6 lg:mt-8 pt-4 md:pt-6 border-t border-[#E5E5E5] flex-shrink-0">
              <div className="flex items-center gap-4 md:gap-6">
                {socialIcons.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    className="text-[#4A4A4A] hover:text-black transition-colors duration-200"
                    aria-label={social.name}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <social.icon className="h-5 w-5" />
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

