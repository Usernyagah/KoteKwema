import { useState } from "react";
import { X, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchOverlay = ({ isOpen, onClose }: SearchOverlayProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-background/98 backdrop-blur-sm animate-fade-in">
      <div className="container mx-auto px-6 lg:px-12 h-full flex flex-col">
        <div className="flex items-center justify-between h-20">
          <span className="text-sm tracking-wide text-white font-bold">Search</span>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="hover:bg-transparent"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="flex-1 flex items-start pt-20">
          <div className="w-full max-w-4xl mx-auto">
            <div className="relative">
              <Search className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-6 text-white" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search projects, expertise..."
                className="w-full bg-transparent border-b border-white pb-4 pl-12 text-3xl md:text-5xl font-bold text-white placeholder-white/50 focus:outline-none focus:border-white transition-colors duration-300"
                autoFocus
              />
            </div>

            {searchQuery && (
              <div className="mt-12 space-y-6 animate-fade-in">
                <p className="text-sm text-white tracking-wide font-bold">
                  Press enter to search for "{searchQuery}"
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
