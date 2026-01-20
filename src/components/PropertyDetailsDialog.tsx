import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Ruler, MapPin, ChevronLeft, ChevronRight } from "lucide-react";

interface Property {
  id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  price?: number;
  bedrooms?: number;
  bathrooms?: number;
  area?: number;
  images: string[];
  createdAt?: any;
}

interface PropertyDetailsDialogProps {
  property: Property;
  isOpen: boolean;
  onClose: () => void;
}

const PropertyDetailsDialog = ({ property, isOpen, onClose }: PropertyDetailsDialogProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = property.images && property.images.length > 0 ? property.images : [];

  // Reset to first image when dialog opens
  useEffect(() => {
    if (isOpen) {
      setCurrentImageIndex(0);
    }
  }, [isOpen]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen || images.length <= 1) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
      } else if (e.key === "ArrowRight") {
        setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, images.length]);

  const goToPrevious = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto p-0">
        <DialogHeader className="px-6 pt-6 pb-4">
          <DialogTitle className="text-2xl md:text-3xl font-bold text-[#1A1A1A]">
            {property.title}
          </DialogTitle>
          <DialogDescription className="text-base">
            <div className="flex items-center gap-2 text-[#666666] mt-2">
              <MapPin className="h-4 w-4" />
              <span>{property.location}</span>
              <span className="mx-2">•</span>
              <span className="capitalize">{property.category?.replace("-", " ")}</span>
            </div>
          </DialogDescription>
        </DialogHeader>

        <div className="px-6 pb-6 space-y-6">
          {/* Image Gallery */}
          {images.length > 0 ? (
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative aspect-video overflow-hidden rounded-lg bg-gray-100 group">
                <img
                  src={images[currentImageIndex]}
                  alt={`${property.title} - Image ${currentImageIndex + 1}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://via.placeholder.com/1200x675?text=No+Image";
                  }}
                />
                
                {/* Navigation Arrows */}
                {images.length > 1 && (
                  <>
                    <Button
                      variant="outline"
                      size="icon"
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={goToPrevious}
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={goToNext}
                    >
                      <ChevronRight className="h-5 w-5" />
                    </Button>
                  </>
                )}

                {/* Image Counter */}
                {images.length > 1 && (
                  <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                    {currentImageIndex + 1} / {images.length}
                  </div>
                )}
              </div>

              {/* Thumbnail Gallery */}
              {images.length > 1 && (
                <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
                  {images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => goToImage(index)}
                      className={`relative aspect-video overflow-hidden rounded-md border-2 transition-all ${
                        index === currentImageIndex
                          ? "border-[#1A1A1A] ring-2 ring-[#1A1A1A]"
                          : "border-transparent hover:border-gray-300"
                      }`}
                    >
                      <img
                        src={image}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "https://via.placeholder.com/200x112?text=No+Image";
                        }}
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
              <span className="text-gray-400">No images available</span>
            </div>
          )}

          {/* Project Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column - Facts & Figures */}
            <div className="space-y-6">
              {(property.price || property.bedrooms || property.bathrooms || property.area) && (
                <div className="space-y-3">
                  <h4 className="text-lg font-semibold text-[#1A1A1A]">Facts &amp; Figures</h4>
                  <div className="space-y-1 text-[#666666] text-sm">
                    {property.price && (
                      <p>
                        <span className="font-semibold text-[#1A1A1A]">Appointment year: </span>
                        {property.price}
                      </p>
                    )}
                    {property.bedrooms && (
                      <p>
                        <span className="font-semibold text-[#1A1A1A]">Completion year: </span>
                        {property.bedrooms}
                      </p>
                    )}
                    {property.area && (
                      <p>
                        <span className="font-semibold text-[#1A1A1A]">Area: </span>
                        {property.area.toLocaleString()} m²
                      </p>
                    )}
                    {property.bathrooms && (
                      <p>
                        <span className="font-semibold text-[#1A1A1A]">Capacity: </span>
                        {property.bathrooms.toLocaleString()}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Description */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-[#1A1A1A]">Description</h4>
              <p className="text-base text-[#4A4A4A] font-light leading-relaxed whitespace-pre-wrap">
                {property.description}
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PropertyDetailsDialog;
