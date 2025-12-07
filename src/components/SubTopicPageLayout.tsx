import { ReactNode } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import heroImage from "@/assets/hero-architecture.jpg";

interface SubTopicPageLayoutProps {
  children: ReactNode;
  title: string;
  breadcrumbs: string[];
  image?: string;
}

const SubTopicPageLayout = ({ 
  children, 
  title, 
  breadcrumbs, 
  image = heroImage 
}: SubTopicPageLayoutProps) => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation variant="white" />
      
      {/* Breadcrumbs */}
      <div className="pt-24 pl-6 lg:pl-12 pr-6 lg:pr-12 pb-6">
        <nav className="text-sm text-[#4A4A4A] font-light">
          {breadcrumbs.map((crumb, index) => (
            <span key={index}>
              {index > 0 && <span className="mx-2">/</span>}
              <span className={index === breadcrumbs.length - 1 ? "text-black font-normal" : ""}>
                {crumb}
              </span>
            </span>
          ))}
        </nav>
      </div>

      {/* Main Image with Title Overlay */}
      <div className="relative w-full h-[70vh] min-h-[500px] mb-0">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 p-6 lg:p-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-white tracking-tight">
            {title}
          </h1>
        </div>
      </div>

      {/* Content Section */}
      <div className="bg-white">
        {children}
      </div>

      <Footer />
    </div>
  );
};

export default SubTopicPageLayout;

