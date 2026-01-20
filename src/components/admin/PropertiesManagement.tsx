import { useState, useEffect } from "react";
import { collection, query, orderBy, onSnapshot, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Edit, Trash2, Eye } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import AddPropertyForm from "./AddPropertyForm";
import EditPropertyForm from "./EditPropertyForm";

interface Property {
  id: string;
  title: string;
  category: string;
  location: string;
  price?: number;
  bedrooms?: number;
  bathrooms?: number;
  area?: number;
  images: string[];
  description: string;
  createdAt: any;
}

const PropertiesManagement = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  useEffect(() => {
    if (!db) {
      setIsLoading(false);
      return;
    }

    const q = query(collection(db, "properties"), orderBy("createdAt", "desc"));
    
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const props: Property[] = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          props.push({
            id: doc.id,
            ...data,
            images: data.images || [],
          } as Property);
        });
        setProperties(props);
        setIsLoading(false);
      },
      (error) => {
        console.error("Error fetching properties:", error);
        toast({
          title: "Error",
          description: "Failed to load properties.",
          variant: "destructive",
        });
        setIsLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"? This action cannot be undone.`)) {
      return;
    }

    if (!db) {
      toast({
        title: "Error",
        description: "Firebase is not configured.",
        variant: "destructive",
      });
      return;
    }

    try {
      await deleteDoc(doc(db, "properties", id));
      toast({
        title: "Success",
        description: "Property deleted successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete property.",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (property: Property) => {
    setEditingProperty(property);
    setIsEditDialogOpen(true);
  };

  const handleEditClose = () => {
    setEditingProperty(null);
    setIsEditDialogOpen(false);
  };

  if (isLoading) {
    return <div className="text-center py-8">Loading projects...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <p className="text-sm text-muted-foreground">
          Total projects: <span className="font-semibold">{properties.length}</span>
        </p>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>Add New Property</Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Project</DialogTitle>
              <DialogDescription>Add a new project to the database</DialogDescription>
            </DialogHeader>
            <AddPropertyForm onSuccess={() => setIsAddDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      {properties.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          No projects yet. Click "Add New Project" to get started.
        </div>
      ) : (
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Images</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {properties.map((property) => (
                <TableRow key={property.id}>
                  <TableCell className="font-medium">{property.title}</TableCell>
                  <TableCell className="capitalize">{property.category}</TableCell>
                  <TableCell>{property.location}</TableCell>
                  <TableCell>
                    {property.price ? `KSh ${property.price.toLocaleString()}` : "-"}
                  </TableCell>
                  <TableCell>
                    {property.images?.length || 0} image{property.images?.length !== 1 ? "s" : ""}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(property)}
                        title="Edit"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(property.id, property.title)}
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {editingProperty && (
        <Dialog open={isEditDialogOpen} onOpenChange={handleEditClose}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Property</DialogTitle>
              <DialogDescription>Update property information</DialogDescription>
            </DialogHeader>
            <EditPropertyForm 
              property={editingProperty} 
              onSuccess={handleEditClose}
            />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default PropertiesManagement;
