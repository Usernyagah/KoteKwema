import { useState, useMemo } from "react";
import { X, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SearchResult {
  title: string;
  href: string;
  category: string;
  description?: string;
}

// Search index with all subtopics
const searchIndex: SearchResult[] = [
  // Expertise subtopics
  { title: "Architecture", href: "/expertise/architecture", category: "Expertise", description: "Core discipline combining innovative design with sustainable practices" },
  { title: "Climate and Sustainable Design", href: "/expertise/climate", category: "Expertise", description: "Environmental responsibility with innovative solutions" },
  { title: "Engineering", href: "/expertise/engineering", category: "Expertise", description: "Structural integrity, building performance, and technical excellence" },
  { title: "Interiors", href: "/expertise/interiors", category: "Expertise", description: "Spaces that enhance human experience" },
  { title: "Technology and Research", href: "/expertise/technology", category: "Expertise", description: "Advanced technologies and research in architecture" },
  { title: "Urban and Landscape Design", href: "/expertise/urban", category: "Expertise", description: "Urban planning and landscape architecture" },
  
  // Projects subtopics
  { title: "All Projects", href: "/projects/all", category: "Projects", description: "View all architecture projects" },
  { title: "Residential", href: "/projects/residential", category: "Projects", description: "Residential architecture projects" },
  { title: "Commercial", href: "/projects/commercial", category: "Projects", description: "Commercial and office buildings" },
  { title: "Cultural", href: "/projects/cultural", category: "Projects", description: "Cultural and institutional projects" },
  { title: "Mixed-Use", href: "/projects/mixed-use", category: "Projects", description: "Mixed-use developments" },
  
  // Studio subtopics
  { title: "About", href: "/studio/about", category: "Studio", description: "Learn about Kote Kwema's history, mission, and vision" },
  { title: "History & Philosophy", href: "/studio/history", category: "Studio", description: "Our journey and core principles" },
  { title: "Work Process", href: "/studio/process", category: "Studio", description: "Our collaborative design process" },
  { title: "Awards & Recognition", href: "/studio/awards", category: "Studio", description: "Recognition for our work" },
  
  // People subtopics
  { title: "Leadership", href: "/people/leadership", category: "People", description: "Our leadership team" },
  { title: "Architects", href: "/people/architects", category: "People", description: "Our architects and designers" },
  
  // News subtopics
  { title: "Firm Announcements", href: "/news/announcements", category: "News", description: "Latest firm announcements" },
  { title: "Awards & Recognition", href: "/news/news-awards", category: "News", description: "Awards and recognition news" },
  
  // Careers subtopics
  { title: "Open Positions", href: "/careers/positions", category: "Careers", description: "Current job openings" },
  { title: "Life at Kote Kwema", href: "/careers/life", category: "Careers", description: "What it's like to work here" },
  { title: "Application Process", href: "/careers/application", category: "Careers", description: "How to apply" },
  { title: "Benefits", href: "/careers/benefits", category: "Careers", description: "Employee benefits" },
  
  // Contact subtopics
  { title: "Nairobi Office", href: "/contact/nairobi", category: "Contact", description: "Visit our Nairobi office" },
  { title: "Request Consultation", href: "/contact/consultation", category: "Contact", description: "Request a consultation" },
  { title: "General Inquiry", href: "/contact/inquiry", category: "Contact", description: "General questions" },
  { title: "Project Inquiry", href: "/contact/project", category: "Contact", description: "Project inquiries" },
];

const SearchOverlay = ({ isOpen, onClose }: SearchOverlayProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  // Search function
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];

    const query = searchQuery.toLowerCase().trim();
    return searchIndex.filter((item) => {
      const titleMatch = item.title.toLowerCase().includes(query);
      const descriptionMatch = item.description?.toLowerCase().includes(query);
      const categoryMatch = item.category.toLowerCase().includes(query);
      
      return titleMatch || descriptionMatch || categoryMatch;
    });
  }, [searchQuery]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      onClose();
    }
  };

  const handleResultClick = () => {
    setSearchQuery("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-background/98 backdrop-blur-sm animate-fade-in">
      <div className="container mx-auto px-4 md:px-6 lg:px-12 h-full flex flex-col">
        <div className="flex items-center justify-between h-20">
          <span className="text-sm tracking-wide text-white font-bold">Search</span>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="hover:bg-transparent text-white"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="flex-1 flex flex-col pt-8 md:pt-12 lg:pt-20 overflow-hidden">
          <div className="w-full max-w-4xl mx-auto">
            <div className="relative">
              <Search className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-5 md:h-6 md:w-6 text-white" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search projects, expertise..."
                className="w-full bg-transparent border-b border-white pb-3 md:pb-4 pl-10 md:pl-12 text-2xl md:text-3xl lg:text-5xl font-bold text-white placeholder-white/50 focus:outline-none focus:border-white transition-colors duration-300"
                autoFocus
              />
            </div>

            {/* Search Results */}
            {searchQuery && (
              <div className="mt-8 md:mt-12 space-y-4 animate-fade-in max-h-[60vh] overflow-y-auto">
                {searchResults.length > 0 ? (
                  <>
                    <p className="text-xs md:text-sm text-white/70 tracking-wide font-medium mb-4">
                      {searchResults.length} result{searchResults.length !== 1 ? 's' : ''} found
                    </p>
                    <div className="space-y-2">
                      {searchResults.map((result, index) => (
                        <Link
                          key={index}
                          to={result.href}
                          onClick={handleResultClick}
                          className="block p-4 md:p-6 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-lg transition-all duration-200 group"
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-2">
                                <span className="text-xs text-white/60 font-medium uppercase tracking-wider">
                                  {result.category}
                                </span>
                                <span className="text-white/40">•</span>
                                <h3 className="text-base md:text-lg lg:text-xl font-semibold text-white group-hover:text-white/90 transition-colors">
                                  {result.title}
                                </h3>
                              </div>
                              {result.description && (
                                <p className="text-xs md:text-sm text-white/70 font-light leading-relaxed line-clamp-2">
                                  {result.description}
                                </p>
                              )}
                            </div>
                            <Search className="h-4 w-4 md:h-5 md:w-5 text-white/40 group-hover:text-white/60 transition-colors flex-shrink-0" />
                          </div>
                        </Link>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-sm md:text-base text-white/70 font-light">
                      No results found for "{searchQuery}"
                    </p>
                    <p className="text-xs md:text-sm text-white/50 font-light mt-2">
                      Try searching for expertise, projects, or studio
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Empty State */}
            {!searchQuery && (
              <div className="mt-12 text-center">
                <p className="text-sm md:text-base text-white/50 font-light">
                  Start typing to search...
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchOverlay;
