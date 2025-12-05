import { X as XIcon, ArrowUpRight, Instagram, Linkedin } from "lucide-react";
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
  { name: "Expertise", href: "/expertise", hasSubmenu: true },
  { name: "Projects", href: "/projects", hasSubmenu: true },
  { name: "Studio", href: "/studio", hasSubmenu: true },
  { name: "People", href: "/people", hasSubmenu: true },
  { name: "News", href: "/news", hasSubmenu: true },
  { name: "Insights", href: "/insights", hasSubmenu: true },
  { name: "Careers", href: "/careers", hasSubmenu: true },
  { name: "Contact", href: "/contact", hasSubmenu: true },
];

const expertiseSubcategories = [
  { name: "Architecture", href: "/expertise/architecture" },
  { name: "Climate and Sustainable Design", href: "/expertise/climate" },
  { name: "Engineering", href: "/expertise/engineering" },
  { name: "Industrial Design", href: "/expertise/industrial" },
  { name: "Interiors", href: "/expertise/interiors" },
  { name: "Technology and Research", href: "/expertise/technology" },
  { name: "Urban and Landscape Design", href: "/expertise/urban" },
  { name: "Workplace Consultancy", href: "/expertise/workplace" },
];

const projectsSubcategories = [
  { name: "Residential", href: "/projects/residential" },
  { name: "Commercial", href: "/projects/commercial" },
  { name: "Cultural", href: "/projects/cultural" },
  { name: "Mixed-Use", href: "/projects/mixed-use" },
  { name: "Urban Planning", href: "/projects/urban-planning" },
];

const studioSubcategories = [
  { name: "About", href: "/studio/about" },
  { name: "History & Philosophy", href: "/studio/history" },
  { name: "Work Process", href: "/studio/process" },
  { name: "Global Studios", href: "/studio/studios" },
  { name: "Awards & Recognition", href: "/studio/awards" },
];

const peopleSubcategories = [
  { name: "Leadership", href: "/people/leadership" },
  { name: "Architects", href: "/people/architects" },
  { name: "Designers", href: "/people/designers" },
  { name: "Engineers", href: "/people/engineers" },
  { name: "Support Team", href: "/people/support" },
];

const newsSubcategories = [
  { name: "Firm Announcements", href: "/news/announcements" },
  { name: "Awards & Recognition", href: "/news/news-awards" },
  { name: "Industry Insights", href: "/news/news-insights" },
  { name: "Press Coverage", href: "/news/press" },
  { name: "Events & Speaking", href: "/news/events" },
];

const insightsSubcategories = [
  { name: "Design Trends", href: "/insights/trends" },
  { name: "Sustainability", href: "/insights/sustainability" },
  { name: "Urban Development", href: "/insights/insights-urban" },
  { name: "Technology", href: "/insights/insights-technology" },
  { name: "Case Studies", href: "/insights/case-studies" },
];

const careersSubcategories = [
  { name: "Open Positions", href: "/careers/positions" },
  { name: "Life at Kote Kwema", href: "/careers/life" },
  { name: "Application Process", href: "/careers/application" },
  { name: "Benefits", href: "/careers/benefits" },
  { name: "Employee Testimonials", href: "/careers/testimonials" },
];

const contactSubcategories = [
  { name: "Nairobi Office", href: "/contact/nairobi" },
  { name: "Request Consultation", href: "/contact/consultation" },
  { name: "General Inquiry", href: "/contact/inquiry" },
  { name: "Project Inquiry", href: "/contact/project" },
  { name: "Media Contact", href: "/contact/media" },
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
    case "Insights":
      return insightsSubcategories;
    case "Careers":
      return careersSubcategories;
    case "Contact":
      return contactSubcategories;
    default:
      return [];
  }
};

const socialIcons = [
  { name: "Pinterest", href: "#", icon: "P" },
  { name: "Instagram", href: "#", icon: Instagram },
  { name: "LinkedIn", href: "#", icon: Linkedin },
  { name: "X", href: "https://x.com/KoteKwema", icon: "X" },
];

const categoryImages: Record<string, string> = {
  "Expertise": heroImage,
  "Projects": project1,
  "Studio": project2,
  "People": project3,
  "News": project4,
  "Insights": heroImage,
  "Careers": project1,
  "Contact": project2,
};

const Menu = ({ isOpen, onClose }: MenuProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>("Expertise");
  
  if (!isOpen) return null;
  
  const currentSubcategories = selectedCategory ? getSubcategories(selectedCategory) : [];
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
          <div className="h-full flex flex-col px-6 md:px-12 lg:px-16 py-8 md:py-12 overflow-hidden">
            {/* Mobile Image (only on mobile) */}
            <div className="md:hidden w-full h-32 mb-6 relative overflow-hidden">
              <img
                src={backgroundImage}
                alt="Menu Background"
                className="w-full h-full object-cover transition-opacity duration-500"
              />
            </div>

            {/* Main Navigation - Left Column Categories */}
            <div className="flex-1 flex flex-col md:flex-row gap-8 md:gap-12 min-h-0">
              {/* Left Column - Main Categories */}
              <div className="flex-1 min-w-0">
                <nav className="space-y-0.5 md:space-y-1">
                  {menuCategories.map((category, index) => (
                    <MenuLink
                      key={category.name}
                      href={category.href}
                      onClick={(e) => {
                        // Allow navigation - don't prevent default
                        // Just close menu and let React Router handle navigation
                        onClose();
                      }}
                      onMouseEnter={() => {
                        if (category.hasSubmenu) {
                          setSelectedCategory(category.name);
                        }
                      }}
                      isActive={selectedCategory === category.name}
                      delay={index * 50}
                    >
                      {category.name}
                    </MenuLink>
                  ))}
                </nav>
              </div>

              {/* Right Column - Subcategories */}
              <div className="flex-1 border-l-0 md:border-l border-[#E5E5E5] pl-0 md:pl-12 min-w-0">
                {selectedCategory && (
                  <MenuSection title={selectedCategory}>
                    <div className="space-y-1 mt-4 md:mt-6">
                      {currentSubcategories.map((subcategory, index) => (
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
                )}
              </div>
            </div>

            {/* Social Icons Row - Bottom Right */}
            <div className="mt-6 md:mt-8 pt-4 md:pt-6 border-t border-[#E5E5E5] flex-shrink-0">
              <div className="flex items-center gap-6">
                {socialIcons.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    className="text-[#4A4A4A] hover:text-black transition-colors duration-200"
                    aria-label={social.name}
                  >
                    {typeof social.icon === "string" ? (
                      <span className="text-sm font-bold">{social.icon}</span>
                    ) : (
                      <social.icon className="h-5 w-5" />
                    )}
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

