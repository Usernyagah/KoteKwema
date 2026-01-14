import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";

interface PropertyFormData {
  title: string;
  description: string;
  type: string;
  location: string;
  price: string;
  bedrooms: string;
  bathrooms: string;
  area: string;
  imageUrl: string;
}

const AddPropertyForm = () => {
  const [formData, setFormData] = useState<PropertyFormData>({
    title: "",
    description: "",
    type: "",
    location: "",
    price: "",
    bedrooms: "",
    bathrooms: "",
    area: "",
    imageUrl: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field: keyof PropertyFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!db) {
      toast({
        title: "Error",
        description: "Firebase is not configured. Please check your .env file.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      await addDoc(collection(db, "properties"), {
        ...formData,
        price: formData.price ? parseFloat(formData.price) : null,
        bedrooms: formData.bedrooms ? parseInt(formData.bedrooms) : null,
        bathrooms: formData.bathrooms ? parseInt(formData.bathrooms) : null,
        area: formData.area ? parseFloat(formData.area) : null,
        createdAt: new Date(),
      });

      toast({
        title: "Success!",
        description: "Property added successfully.",
      });

      // Reset form
      setFormData({
        title: "",
        description: "",
        type: "",
        location: "",
        price: "",
        bedrooms: "",
        bathrooms: "",
        area: "",
        imageUrl: "",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add property. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="title">Title *</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => handleChange("title", e.target.value)}
            required
            disabled={isSubmitting}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="type">Type *</Label>
          <Select value={formData.type} onValueChange={(value) => handleChange("type", value)} required>
            <SelectTrigger disabled={isSubmitting}>
              <SelectValue placeholder="Select property type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="residential">Residential</SelectItem>
              <SelectItem value="commercial">Commercial</SelectItem>
              <SelectItem value="mixed-use">Mixed-Use</SelectItem>
              <SelectItem value="land">Land</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="location">Location *</Label>
          <Input
            id="location"
            value={formData.location}
            onChange={(e) => handleChange("location", e.target.value)}
            required
            disabled={isSubmitting}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="price">Price</Label>
          <Input
            id="price"
            type="number"
            value={formData.price}
            onChange={(e) => handleChange("price", e.target.value)}
            disabled={isSubmitting}
            placeholder="Enter price"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="bedrooms">Bedrooms</Label>
          <Input
            id="bedrooms"
            type="number"
            value={formData.bedrooms}
            onChange={(e) => handleChange("bedrooms", e.target.value)}
            disabled={isSubmitting}
            placeholder="Number of bedrooms"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="bathrooms">Bathrooms</Label>
          <Input
            id="bathrooms"
            type="number"
            value={formData.bathrooms}
            onChange={(e) => handleChange("bathrooms", e.target.value)}
            disabled={isSubmitting}
            placeholder="Number of bathrooms"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="area">Area (sq ft)</Label>
          <Input
            id="area"
            type="number"
            value={formData.area}
            onChange={(e) => handleChange("area", e.target.value)}
            disabled={isSubmitting}
            placeholder="Property area"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="imageUrl">Image URL</Label>
          <Input
            id="imageUrl"
            type="url"
            value={formData.imageUrl}
            onChange={(e) => handleChange("imageUrl", e.target.value)}
            disabled={isSubmitting}
            placeholder="https://example.com/image.jpg"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description *</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => handleChange("description", e.target.value)}
          required
          disabled={isSubmitting}
          rows={4}
          placeholder="Enter property description"
        />
      </div>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Adding..." : "Add Property"}
      </Button>
    </form>
  );
};

export default AddPropertyForm;
