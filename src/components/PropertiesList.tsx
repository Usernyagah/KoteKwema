import { useState, useEffect } from "react";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Card, CardContent } from "@/components/ui/card";

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
  createdAt: any;
}

interface PropertiesListProps {
  category?: string; // Filter by category: residential, commercial, cultural, mixed-use
}

const PropertiesList = ({ category }: PropertiesListProps) => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProperties = async () => {
      if (!db) {
        setError("Firebase is not configured");
        setIsLoading(false);
        return;
      }

      try {
        let q;
        if (category) {
          // Try with orderBy first, fallback to without if index is missing
          try {
            q = query(
              collection(db, "properties"),
              where("category", "==", category),
              orderBy("createdAt", "desc")
            );
            const querySnapshot = await getDocs(q);
            const propertiesData: Property[] = [];
            
            querySnapshot.forEach((doc) => {
              const data = doc.data();
              propertiesData.push({
                id: doc.id,
                ...data,
                images: data.images || [],
              } as Property);
            });

            setProperties(propertiesData);
          } catch (orderByError: any) {
            // If orderBy fails (missing index), try without it
            if (orderByError.code === "failed-precondition") {
              console.warn("Firestore index missing, fetching without orderBy");
              q = query(
                collection(db, "properties"),
                where("category", "==", category)
              );
              const querySnapshot = await getDocs(q);
              const propertiesData: Property[] = [];
              
              querySnapshot.forEach((doc) => {
                const data = doc.data();
                propertiesData.push({
                  id: doc.id,
                  ...data,
                  images: data.images || [],
                } as Property);
              });

              // Sort manually
              propertiesData.sort((a, b) => {
                const aTime = a.createdAt?.toMillis?.() || 0;
                const bTime = b.createdAt?.toMillis?.() || 0;
                return bTime - aTime;
              });

              setProperties(propertiesData);
            } else {
              throw orderByError;
            }
          }
        } else {
          q = query(collection(db, "properties"), orderBy("createdAt", "desc"));
          const querySnapshot = await getDocs(q);
          const propertiesData: Property[] = [];
          
          querySnapshot.forEach((doc) => {
            const data = doc.data();
            propertiesData.push({
              id: doc.id,
              ...data,
              images: data.images || [],
            } as Property);
          });

          setProperties(propertiesData);
        }
      } catch (err: any) {
        console.error("Error fetching properties:", err);
        if (err.code === "failed-precondition") {
          setError("Firestore index required. Please create a composite index in Firebase Console.");
        } else {
          setError("Failed to load properties");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchProperties();
  }, [category]);

  if (isLoading) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">Loading properties...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-destructive">{error}</p>
      </div>
    );
  }

  if (properties.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No properties found.</p>
      </div>
    );
  }

  return (
    <div className="mt-8 md:mt-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {properties.map((property) => (
          <Card
            key={property.id}
            className="overflow-hidden border border-[#E5E5E5] bg-white hover:shadow-lg transition-shadow duration-300"
          >
            {property.images && property.images.length > 0 && (
              <div className="aspect-[16/9] overflow-hidden">
                <img
                  src={property.images[0]}
                  alt={property.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://via.placeholder.com/800x450?text=No+Image";
                  }}
                />
              </div>
            )}
            <CardContent className="p-4 md:p-6 bg-white">
              <h3 className="text-lg md:text-xl font-semibold text-[#1A1A1A] mb-2">
                {property.title}
              </h3>
              <div className="space-y-1 mb-3">
                <p className="text-xs md:text-sm text-[#666666] font-medium">
                  {property.location}
                </p>
                {property.price && (
                  <p className="text-sm font-semibold text-[#1A1A1A]">
                    ${property.price.toLocaleString()}
                  </p>
                )}
                <div className="flex gap-4 text-xs text-[#666666]">
                  {property.bedrooms && (
                    <span>{property.bedrooms} Bed{property.bedrooms > 1 ? "s" : ""}</span>
                  )}
                  {property.bathrooms && (
                    <span>{property.bathrooms} Bath{property.bathrooms > 1 ? "s" : ""}</span>
                  )}
                  {property.area && <span>{property.area.toLocaleString()} sq ft</span>}
                </div>
              </div>
              <p className="text-xs md:text-sm text-[#4A4A4A] font-light leading-relaxed line-clamp-3">
                {property.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PropertiesList;
