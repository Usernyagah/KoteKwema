import { useState, useEffect } from "react";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";
import PropertyCard from "./PropertyCard";

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
  category?: string; // Filter by category: residential, commercial, cultural, mixed-use, all
  locationFilter?: string; // Filter by location (town/city name)
  searchQuery?: string; // Search query to filter properties
  sortBy?: string; // Sort option: date-desc, date-asc, alphabetical
  showFilters?: boolean; // Whether to show filter UI (handled by parent)
  onTotalCountChange?: (count: number) => void; // Callback for total count
}

const PropertiesList = ({ 
  category, 
  locationFilter,
  searchQuery = "",
  sortBy = "date-desc",
  onTotalCountChange 
}: PropertiesListProps) => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
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
        // Handle "all" category as showing all properties
        const actualCategory = category === "all" ? undefined : category;
        
        if (actualCategory) {
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

  // Filter and sort properties based on search query, location filter, and sort option
  useEffect(() => {
    let filtered = [...properties];

    // Apply location filter
    if (locationFilter) {
      filtered = filtered.filter((property) => {
        return property.location.toLowerCase().includes(locationFilter.toLowerCase());
      });
    }

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter((property) => {
        const titleMatch = property.title.toLowerCase().includes(query);
        const descriptionMatch = property.description.toLowerCase().includes(query);
        const locationMatch = property.location.toLowerCase().includes(query);
        const categoryMatch = property.category?.toLowerCase().includes(query);
        return titleMatch || descriptionMatch || locationMatch || categoryMatch;
      });
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "date-asc":
          const aTimeAsc = a.createdAt?.toMillis?.() || 0;
          const bTimeAsc = b.createdAt?.toMillis?.() || 0;
          return aTimeAsc - bTimeAsc;
        case "alphabetical":
          return a.title.localeCompare(b.title);
        case "date-desc":
        default:
          const aTimeDesc = a.createdAt?.toMillis?.() || 0;
          const bTimeDesc = b.createdAt?.toMillis?.() || 0;
          return bTimeDesc - aTimeDesc;
      }
    });

    setFilteredProperties(filtered);
    
    // Notify parent of total count
    if (onTotalCountChange) {
      onTotalCountChange(filtered.length);
    }
  }, [properties, searchQuery, locationFilter, sortBy, onTotalCountChange]);

  if (isLoading) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">Loading projects...</p>
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

  if (!isLoading && filteredProperties.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">
          {searchQuery ? `No projects found matching "${searchQuery}".` : "No projects found."}
        </p>
      </div>
    );
  }

  return (
    <div className="mt-8 md:mt-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {filteredProperties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </div>
  );
};

export default PropertiesList;
