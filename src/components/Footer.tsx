import { ArrowUp } from "lucide-react";
import { Link } from "react-router-dom";

// Official X logo SVG component
const XLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-label="X">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#1A1A1A] py-12 pl-6 lg:pl-12 pr-6 lg:pr-12">
      <div className="border-t border-[#404040] pt-6">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-6">
          {/* Left Side - Company Name and Links */}
          <div className="flex flex-col gap-5 w-full md:w-auto">
            <h3 className="text-4xl md:text-5xl logo-font text-white">KOTE KWEMA</h3>
            <div className="flex flex-wrap justify-between items-center gap-4 md:gap-6">
              <div className="flex flex-wrap gap-4 md:gap-6">
                <Link to="/projects/residential" className="text-sm text-white hover:text-white/80 transition-colors duration-200 font-bold">
                  Projects
                </Link>
                <Link to="/expertise/architecture" className="text-sm text-white hover:text-white/80 transition-colors duration-200 font-bold">
                  Expertise
                </Link>
                <Link to="/studio/about" className="text-sm text-white hover:text-white/80 transition-colors duration-200 font-bold">
                  Studio
                </Link>
                <Link to="/news/announcements" className="text-sm text-white hover:text-white/80 transition-colors duration-200 font-bold">
                  News
                </Link>
                <Link to="/careers/positions" className="text-sm text-white hover:text-white/80 transition-colors duration-200 font-bold">
                  Careers
                </Link>
                <Link to="/contact/nairobi" className="text-sm text-white hover:text-white/80 transition-colors duration-200 font-bold">
                  Contact
                </Link>
              </div>
              {/* Back To Top - Mobile only, far right */}
              <button
                onClick={scrollToTop}
                className="md:hidden flex items-center gap-2 text-sm text-white hover:text-white/80 transition-colors duration-200 font-bold ml-auto"
              >
                Back To Top
                <ArrowUp className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Right Side - Social Icons, Back To Top (Desktop), and Copyright */}
          <div className="flex flex-col md:items-end gap-4 w-full md:w-auto">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
              {/* Social Media Icons */}
              <div className="flex gap-2">
                <a 
                  href="https://x.com/KoteKwema" 
                  className="w-10 h-10 rounded-full bg-[#333333] flex items-center justify-center hover:bg-[#404040] transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="X"
                >
                  <XLogo className="h-5 w-5 text-white" />
                </a>
              </div>

              {/* Back To Top - Desktop only */}
              <button
                onClick={scrollToTop}
                className="hidden md:flex items-center gap-2 text-white hover:text-white/80 transition-colors duration-200 font-bold"
              >
                <span className="text-sm">Back To Top</span>
                <ArrowUp className="h-4 w-4" />
              </button>
            </div>

            {/* Copyright */}
            <p className="text-sm text-white font-bold text-left md:text-right">
              Legal and policies © {currentYear} <span className="logo-font">KOTE KWEMA</span>. All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
