import { useState } from "react";
import { Card } from "@/components/ui/card";
import { ArrowUpRight } from "lucide-react";
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

  // Extract year from createdAt if available, or use current year as fallback
  const getYear = () => {
    if (property.createdAt?.toDate) {
      return new Date(property.createdAt.toDate()).getFullYear();
    }
    if (property.createdAt?.toMillis) {
      return new Date(property.createdAt.toMillis()).getFullYear();
    }
    return new Date().getFullYear();
  };

  const year = getYear();

  return (
    <>
      <Card 
        className="group overflow-hidden border-0 bg-transparent hover:cursor-pointer transition-all duration-300"
        onClick={() => setIsDetailsOpen(true)}
      >
        {/* Image Section */}
        <div className="relative aspect-[4/3] overflow-hidden bg-gray-100 mb-4">
          {mainImage ? (
            <img
              src={mainImage}
              alt={property.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "https://via.placeholder.com/800x600?text=No+Image";
              }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-200">
              <span className="text-gray-400 text-sm">No Image</span>
            </div>
          )}
        </div>

        {/* Content Section - Minimal Design */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            {/* Title */}
            <h3 className="text-lg md:text-xl font-semibold text-[#1A1A1A] mb-2 line-clamp-2 group-hover:text-[#333333] transition-colors">
              {property.title}
            </h3>

            {/* Location and Year */}
            <p className="text-sm text-[#666666] font-normal">
              {year} - {property.location}
            </p>
          </div>

          {/* Arrow Icon */}
          <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <ArrowUpRight className="h-5 w-5 text-[#1A1A1A]" />
          </div>
        </div>
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
