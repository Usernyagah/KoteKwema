import { ReactNode } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import heroImage from "@/assets/hero-architecture.jpg";

interface SubTopicPageLayoutProps {
  children: ReactNode;
  title: string;
  breadcrumbs: string[];
  image?: string;
  hideImage?: boolean;
}

const SubTopicPageLayout = ({ 
  children, 
  title, 
  breadcrumbs, 
  image = heroImage,
  hideImage = false
}: SubTopicPageLayoutProps) => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation variant="white" />
      
      {/* Breadcrumbs */}
      <div className="pt-20 md:pt-24 px-4 md:px-6 lg:px-12 pb-4 md:pb-6">
        <nav className="text-xs md:text-sm text-[#4A4A4A] font-light">
          {breadcrumbs.map((crumb, index) => (
            <span key={index}>
              {index > 0 && <span className="mx-1 md:mx-2">/</span>}
              <span className={index === breadcrumbs.length - 1 ? "text-black font-normal" : ""}>
                {crumb}
              </span>
            </span>
          ))}
        </nav>
      </div>

      {/* Main Image with Title Overlay - Only show if not hidden */}
      {!hideImage && (
        <div className="relative w-full h-[50vh] md:h-[70vh] min-h-[300px] md:min-h-[500px] mb-0">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 p-4 md:p-6 lg:p-12">
            <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light text-white tracking-tight">
              {title}
            </h1>
          </div>
        </div>
      )}

      {/* Title without image - Show if image is hidden */}
      {hideImage && (
        <div className="px-4 md:px-6 lg:px-12 py-8 md:py-12 border-b border-[#E5E5E5]">
          <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light text-black tracking-tight">
            {title}
          </h1>
        </div>
      )}

      {/* Content Section */}
      <main id="main-content" className="bg-white">
        {children}
      </main>

      <Footer />
    </div>
  );
};

export default SubTopicPageLayout;

