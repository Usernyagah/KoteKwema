import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bed, Bath, Ruler, MapPin } from "lucide-react";
import PropertyDetailsDialog from "./PropertyDetailsDialog";

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

interface PropertyCardProps {
  property: Property;
}

const PropertyCard = ({ property }: PropertyCardProps) => {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const mainImage = property.images && property.images.length > 0 ? property.images[0] : null;

  return (
    <>
      <Card className="group overflow-hidden border border-[#E5E5E5] bg-white hover:shadow-xl transition-all duration-300 flex flex-col h-full">
        {/* Image Section */}
        <div className="relative aspect-[16/9] overflow-hidden bg-gray-100">
          {mainImage ? (
            <img
              src={mainImage}
              alt={property.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "https://via.placeholder.com/800x450?text=No+Image";
              }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-200">
              <span className="text-gray-400 text-sm">No Image</span>
            </div>
          )}
          {/* Category Badge */}
          <div className="absolute top-3 left-3">
            <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-xs font-semibold text-[#1A1A1A] rounded-full capitalize">
              {property.category?.replace("-", " ") || "Property"}
            </span>
          </div>
        </div>

        {/* Content Section */}
        <CardContent className="p-5 md:p-6 flex flex-col flex-grow">
          {/* Title */}
          <h3 className="text-lg md:text-xl font-bold text-[#1A1A1A] mb-2 line-clamp-2 min-h-[3.5rem]">
            {property.title}
          </h3>

          {/* Location */}
          <div className="flex items-center gap-1.5 mb-3 text-[#666666]">
            <MapPin className="h-4 w-4 shrink-0" />
            <p className="text-sm font-medium line-clamp-1">{property.location}</p>
          </div>

          {/* Price */}
          {property.price && (
            <div className="flex items-center gap-1.5 mb-4">
              <p className="text-xl font-bold text-[#1A1A1A]">
                KSh {property.price.toLocaleString()}
              </p>
            </div>
          )}

          {/* Property Features */}
          {(property.bedrooms || property.bathrooms || property.area) && (
            <div className="flex flex-wrap gap-4 mb-4 text-sm text-[#666666]">
              {property.bedrooms && (
                <div className="flex items-center gap-1.5">
                  <Bed className="h-4 w-4" />
                  <span>{property.bedrooms} Bed{property.bedrooms > 1 ? "s" : ""}</span>
                </div>
              )}
              {property.bathrooms && (
                <div className="flex items-center gap-1.5">
                  <Bath className="h-4 w-4" />
                  <span>{property.bathrooms} Bath{property.bathrooms > 1 ? "s" : ""}</span>
                </div>
              )}
              {property.area && (
                <div className="flex items-center gap-1.5">
                  <Ruler className="h-4 w-4" />
                  <span>{property.area.toLocaleString()} m²</span>
                </div>
              )}
            </div>
          )}

          {/* Description Preview */}
          <p className="text-sm text-[#4A4A4A] font-light leading-relaxed line-clamp-3 mb-4 flex-grow">
            {property.description}
          </p>

          {/* View Details Button */}
          <Button
            onClick={() => setIsDetailsOpen(true)}
            className="w-full mt-auto bg-[#1A1A1A] hover:bg-[#333333] text-white font-medium"
            variant="default"
          >
            View Details
          </Button>
        </CardContent>
      </Card>

      {/* Details Dialog */}
      <PropertyDetailsDialog
        property={property}
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
      />
    </>
  );
};

export default PropertyCard;
