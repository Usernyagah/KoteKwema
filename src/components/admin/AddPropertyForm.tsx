import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { Plus, X, Upload, Loader2 } from "lucide-react";

interface PropertyFormData {
  title: string;
  description: string;
  category: string; // Changed from 'type' to 'category' to match projects page
  location: string;
  price: string;
  bedrooms: string;
  bathrooms: string;
  area: string;
  images: string[];
}

interface ImageUploadState {
  file: File | null;
  uploading: boolean;
  url: string;
}

const AddPropertyForm = () => {
  const [formData, setFormData] = useState<PropertyFormData>({
    title: "",
    description: "",
    category: "",
    location: "",
    price: "",
    bedrooms: "",
    bathrooms: "",
    area: "",
    images: [""],
  });
  const [imageUploads, setImageUploads] = useState<ImageUploadState[]>([{ file: null, uploading: false, url: "" }]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field: keyof PropertyFormData, value: string | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageChange = (index: number, value: string) => {
    const newImages = [...formData.images];
    newImages[index] = value;
    handleChange("images", newImages);
    
    // Clear file upload if URL is entered
    const newUploads = [...imageUploads];
    if (newUploads[index]) {
      newUploads[index] = { file: null, uploading: false, url: "" };
      setImageUploads(newUploads);
    }
  };

  const handleFileSelect = async (index: number, file: File | null) => {
    if (!file) return;

    if (!storage) {
      toast({
        title: "Error",
        description: "Firebase Storage is not configured.",
        variant: "destructive",
      });
      return;
    }

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast({
        title: "Invalid file",
        description: "Please select an image file.",
        variant: "destructive",
      });
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Image must be less than 10MB.",
        variant: "destructive",
      });
      return;
    }

    // Update upload state
    const newUploads = [...imageUploads];
    newUploads[index] = { file, uploading: true, url: "" };
    setImageUploads(newUploads);

    try {
      // Create a unique filename
      const timestamp = Date.now();
      const filename = `properties/${timestamp}_${file.name}`;
      const storageRef = ref(storage, filename);

      // Upload file
      await uploadBytes(storageRef, file);

      // Get download URL
      const downloadURL = await getDownloadURL(storageRef);

      // Update state with URL
      const updatedUploads = [...imageUploads];
      updatedUploads[index] = { file: null, uploading: false, url: downloadURL };
      setImageUploads(updatedUploads);

      // Update form data with the URL
      const newImages = [...formData.images];
      newImages[index] = downloadURL;
      handleChange("images", newImages);

      toast({
        title: "Success!",
        description: "Image uploaded successfully.",
      });
    } catch (error) {
      toast({
        title: "Upload failed",
        description: "Failed to upload image. Please try again.",
        variant: "destructive",
      });
      const updatedUploads = [...imageUploads];
      updatedUploads[index] = { file: null, uploading: false, url: "" };
      setImageUploads(updatedUploads);
    }
  };

  const addImageField = () => {
    handleChange("images", [...formData.images, ""]);
    setImageUploads([...imageUploads, { file: null, uploading: false, url: "" }]);
  };

  const removeImageField = (index: number) => {
    if (formData.images.length > 1) {
      const newImages = formData.images.filter((_, i) => i !== index);
      handleChange("images", newImages);
      const newUploads = imageUploads.filter((_, i) => i !== index);
      setImageUploads(newUploads);
    }
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
      // Filter out empty image URLs
      const validImages = formData.images.filter((url) => url.trim() !== "");
      
      await addDoc(collection(db, "properties"), {
        ...formData,
        category: formData.category, // Save as 'category' to match projects page structure
        images: validImages.length > 0 ? validImages : [],
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
        category: "",
        location: "",
        price: "",
        bedrooms: "",
        bathrooms: "",
        area: "",
        images: [""],
      });
      setImageUploads([{ file: null, uploading: false, url: "" }]);
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
          <Label htmlFor="category">Category *</Label>
          <Select value={formData.category} onValueChange={(value) => handleChange("category", value)} required>
            <SelectTrigger disabled={isSubmitting}>
              <SelectValue placeholder="Select project category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="residential">Residential</SelectItem>
              <SelectItem value="commercial">Commercial</SelectItem>
              <SelectItem value="cultural">Cultural</SelectItem>
              <SelectItem value="mixed-use">Mixed-Use</SelectItem>
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

      </div>

      <div className="space-y-2">
        <Label>Property Images</Label>
        <p className="text-sm text-muted-foreground">
          Upload images from your computer or enter image URLs
        </p>
        <div className="space-y-3">
          {formData.images.map((imageUrl, index) => (
            <div key={index} className="space-y-2 p-4 border rounded-lg">
              <div className="flex gap-2">
                <div className="flex-1 space-y-2">
                  <Label className="text-xs">Upload from computer:</Label>
                  <div className="flex gap-2">
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0] || null;
                        handleFileSelect(index, file);
                      }}
                      disabled={isSubmitting || imageUploads[index]?.uploading}
                      className="flex-1"
                    />
                    {imageUploads[index]?.uploading && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Uploading...
                      </div>
                    )}
                  </div>
                  {imageUploads[index]?.url && (
                    <p className="text-xs text-green-600">✓ Image uploaded successfully</p>
                  )}
                </div>
                {formData.images.length > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => removeImageField(index)}
                    disabled={isSubmitting || imageUploads[index]?.uploading}
                    className="shrink-0 self-end"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Or enter image URL:</Label>
                <Input
                  type="url"
                  value={imageUrl}
                  onChange={(e) => handleImageChange(index, e.target.value)}
                  disabled={isSubmitting || imageUploads[index]?.uploading}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              {imageUrl && (
                <div className="mt-2">
                  <img
                    src={imageUrl}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-32 object-cover rounded border"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                </div>
              )}
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            onClick={addImageField}
            disabled={isSubmitting}
            className="w-full"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Another Image
          </Button>
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
