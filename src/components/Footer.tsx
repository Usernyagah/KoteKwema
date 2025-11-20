import { ArrowUp, Instagram, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-gray-800 py-12 pl-6 lg:pl-12 pr-6 lg:pr-12">
      <div className="border-t border-gray-700 pt-6">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-6">
          {/* Left Side - Company Name and Links */}
          <div className="flex flex-col gap-5">
            <h3 className="text-4xl md:text-5xl font-bold text-white">Kote Kwema</h3>
            <div className="flex flex-wrap gap-6">
              <Link to="/projects" className="text-sm text-gray-400 hover:text-white transition-colors duration-200">
                Projects
              </Link>
              <Link to="/expertise" className="text-sm text-gray-400 hover:text-white transition-colors duration-200">
                Expertise
              </Link>
              <Link to="/studio" className="text-sm text-gray-400 hover:text-white transition-colors duration-200">
                Studio
              </Link>
              <Link to="/news" className="text-sm text-gray-400 hover:text-white transition-colors duration-200">
                News
              </Link>
              <Link to="/careers" className="text-sm text-gray-400 hover:text-white transition-colors duration-200">
                Careers
              </Link>
              <Link to="/contact" className="text-sm text-gray-400 hover:text-white transition-colors duration-200">
                Contact
              </Link>
            </div>
          </div>

          {/* Right Side - Social Icons, Back To Top, and Copyright */}
          <div className="flex flex-col items-end gap-4">
            <div className="flex items-center gap-6">
              {/* Social Media Icons */}
              <div className="flex gap-2">
                <a href="#" className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center hover:bg-gray-600 transition-colors">
                  <Instagram className="h-5 w-5 text-white" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center hover:bg-gray-600 transition-colors">
                  <Linkedin className="h-5 w-5 text-white" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center hover:bg-gray-600 transition-colors">
                  <span className="text-white text-xs">小</span>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center hover:bg-gray-600 transition-colors">
                  <span className="text-white text-xs font-bold">P</span>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center hover:bg-gray-600 transition-colors">
                  <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center hover:bg-gray-600 transition-colors">
                  <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.597-6.348zM17.645 6.48c.1 0 .198.008.296.013.157.01.312.02.467.033 1.9.192 3.68 1.067 4.95 2.454 1.27 1.386 1.873 3.18 1.662 4.97-.402 3.45-3.115 6.018-6.082 6.018a6.832 6.832 0 0 1-1.137-.097c-.157-.026-.312-.06-.467-.098-1.9-.29-3.68-1.155-4.95-2.541-1.27-1.387-1.873-3.18-1.662-4.97.402-3.45 3.115-6.018 6.082-6.018zm.34 2.476a.372.372 0 0 0-.372.372v3.646h-3.646a.372.372 0 1 0 0 .744h3.646v3.646a.372.372 0 1 0 .744 0v-3.646h3.646a.372.372 0 1 0 0-.744h-3.646V9.328a.372.372 0 0 0-.372-.372z"/>
                  </svg>
                </a>
              </div>

              {/* Back To Top */}
              <button
                onClick={scrollToTop}
                className="flex items-center gap-2 text-white hover:text-gray-300 transition-colors duration-200"
              >
                <span className="text-sm">Back To Top</span>
                <ArrowUp className="h-4 w-4" />
              </button>
            </div>

            {/* Copyright - Close to icons */}
            <p className="text-sm text-gray-400">
              Legal and policies © {currentYear} Kote Kwema. All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
