import { ReactNode } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import heroImage from "@/assets/hero-architecture.jpg";

interface MenuPageLayoutProps {
  children: ReactNode;
  image?: string;
}

const menuLinks = [
  { name: "Expertise", href: "/expertise" },
  { name: "Projects", href: "/projects" },
  { name: "Studio", href: "/studio" },
  { name: "People", href: "/people" },
  { name: "News", href: "/news" },
  { name: "Careers", href: "/careers" },
  { name: "Contact", href: "/contact" },
];

const MenuPageLayout = ({ children, image = heroImage }: MenuPageLayoutProps) => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <div className="flex h-screen pt-20">
        {/* Left Half - Image */}
        <div className="w-1/2 h-full">
          <img
            src={image}
            alt="Menu"
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Right Half - Menu Items and Content */}
        <div className="w-1/2 h-full bg-card overflow-y-auto flex">
          {/* Menu Items List */}
          <div className="w-1/3 border-r border-border p-6 lg:p-8">
            <nav>
              <ul className="space-y-1">
                {menuLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-lg font-light text-foreground hover:text-muted-foreground transition-colors duration-200 block py-2"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          
          {/* Content Area */}
          <div className="flex-1 p-8 lg:p-12">
            {children}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MenuPageLayout;

