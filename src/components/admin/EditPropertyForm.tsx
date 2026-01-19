import { useState, useEffect } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { uploadImage } from "@/utils/cloudinary";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { Plus, X, Loader2, Upload } from "lucide-react";

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
}

interface PropertyFormData {
  title: string;
  description: string;
  category: string;
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

interface EditPropertyFormProps {
  property: Property;
  onSuccess: () => void;
}

const EditPropertyForm = ({ property, onSuccess }: EditPropertyFormProps) => {
  const [formData, setFormData] = useState<PropertyFormData>({
    title: property.title || "",
    description: property.description || "",
    category: property.category || "",
    location: property.location || "",
    price: property.price?.toString() || "",
    bedrooms: property.bedrooms?.toString() || "",
    bathrooms: property.bathrooms?.toString() || "",
    area: property.area?.toString() || "",
    images: property.images || [""],
  });
  const [imageUploads, setImageUploads] = useState<ImageUploadState[]>(
    property.images && property.images.length > 0
      ? property.images.map(() => ({ file: null, uploading: false, url: "" }))
      : [{ file: null, uploading: false, url: "" }]
  );

  // Ensure images array matches uploads array length
  useEffect(() => {
    if (formData.images.length !== imageUploads.length) {
      const newUploads = formData.images.map(() => ({ file: null, uploading: false, url: "" }));
      setImageUploads(newUploads);
    }
  }, [formData.images.length]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field: keyof PropertyFormData, value: string | string[] | ((prev: string | string[]) => string | string[])) => {
    setFormData((prev) => {
      const newValue = typeof value === 'function' ? value(prev[field]) : value;
      return { ...prev, [field]: newValue };
    });
  };

  const handleImageChange = (index: number, value: string) => {
    const newImages = [...formData.images];
    newImages[index] = value;
    handleChange("images", newImages);
    
    const newUploads = [...imageUploads];
    if (newUploads[index]) {
      newUploads[index] = { file: null, uploading: false, url: "" };
      setImageUploads(newUploads);
    }
  };

  const handleFileSelect = async (index: number, file: File | null) => {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast({
        title: "Invalid file",
        description: "Please select an image file.",
        variant: "destructive",
      });
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Image must be less than 10MB.",
        variant: "destructive",
      });
      return;
    }

    const newUploads = [...imageUploads];
    newUploads[index] = { file, uploading: true, url: "" };
    setImageUploads(newUploads);

    try {
      // Upload to Cloudinary
      const result = await uploadImage(file, {
        folder: "properties",
      });

      const updatedUploads = [...imageUploads];
      updatedUploads[index] = { file: null, uploading: false, url: result.secure_url };
      setImageUploads(updatedUploads);

      const newImages = [...formData.images];
      newImages[index] = result.secure_url;
      handleChange("images", newImages);

      toast({
        title: "Success!",
        description: "Image uploaded successfully.",
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to upload image. Please try again.";
      toast({
        title: "Upload failed",
        description: errorMessage,
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

  const handleMultipleFileSelect = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const validFiles: File[] = [];
    const invalidFiles: string[] = [];

    // Validate all files
    Array.from(files).forEach((file) => {
      if (!file.type.startsWith("image/")) {
        invalidFiles.push(`${file.name} (not an image)`);
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        invalidFiles.push(`${file.name} (too large, max 10MB)`);
        return;
      }
      validFiles.push(file);
    });

    if (invalidFiles.length > 0) {
      toast({
        title: "Some files were skipped",
        description: invalidFiles.join(", "),
        variant: "destructive",
      });
    }

    if (validFiles.length === 0) return;

    // Add new image fields for each file
    const currentLength = formData.images.length;
    const initialImages = [...formData.images, ...Array(validFiles.length).fill("")];
    const initialUploads = [...imageUploads, ...validFiles.map(() => ({ file: null, uploading: false, url: "" }))];
    
    handleChange("images", initialImages);
    setImageUploads(initialUploads);

    // Upload all files to Cloudinary in parallel
    const uploadPromises = validFiles.map(async (file, i) => {
      const index = currentLength + i;
      
      // Update upload state to uploading
      setImageUploads((prev) => {
        const updated = [...prev];
        updated[index] = { file, uploading: true, url: "" };
        return updated;
      });

      try {
        // Upload to Cloudinary
        const result = await uploadImage(file, {
          folder: "properties",
        });

        // Update state with URL using functional update
        setImageUploads((prev) => {
          const updated = [...prev];
          updated[index] = { file: null, uploading: false, url: result.secure_url };
          return updated;
        });

        // Update form data with the URL using functional update
        handleChange("images", (prevImages) => {
          const updated = [...prevImages];
          updated[index] = result.secure_url;
          return updated;
        });

        return { success: true, file: file.name };
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : `Failed to upload ${file.name}. Please try again.`;
        toast({
          title: "Upload failed",
          description: errorMessage,
          variant: "destructive",
        });
        
        // Update state to show failed
        setImageUploads((prev) => {
          const updated = [...prev];
          updated[index] = { file: null, uploading: false, url: "" };
          return updated;
        });
        
        return { success: false, file: file.name };
      }
    });

    // Wait for all uploads to complete
    const results = await Promise.all(uploadPromises);
    const successCount = results.filter((r) => r.success).length;

    if (successCount > 0) {
      toast({
        title: "Success!",
        description: `${successCount} image${successCount > 1 ? "s" : ""} uploaded successfully.`,
      });
    }
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
      const validImages = formData.images.filter((url) => url.trim() !== "");
      
      await updateDoc(doc(db, "properties", property.id), {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        location: formData.location,
        images: validImages.length > 0 ? validImages : [],
        price: formData.price ? parseFloat(formData.price) : null,
        bedrooms: formData.bedrooms ? parseInt(formData.bedrooms) : null,
        bathrooms: formData.bathrooms ? parseInt(formData.bathrooms) : null,
        area: formData.area ? parseFloat(formData.area) : null,
        updatedAt: new Date(),
      });

      toast({
        title: "Success!",
        description: "Property updated successfully.",
      });

      onSuccess();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update property. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Essential Fields - What appears on the card */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-[#1A1A1A] border-b border-[#E5E5E5] pb-2">
          Essential Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleChange("title", e.target.value)}
              required
              disabled={isSubmitting}
              className="rounded-md"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category *</Label>
            <Select value={formData.category} onValueChange={(value) => handleChange("category", value)} required>
              <SelectTrigger disabled={isSubmitting} className="rounded-md">
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

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="location">Location *</Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => handleChange("location", e.target.value)}
              required
              disabled={isSubmitting}
              placeholder="e.g., Nairobi, Mombasa, Kisumu"
              className="rounded-md"
            />
            <p className="text-xs text-muted-foreground">
              The location will appear on the project card as: [Year] - [Location]
            </p>
          </div>
        </div>
      </div>

      {/* Additional Details - Optional fields */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-[#1A1A1A] border-b border-[#E5E5E5] pb-2">
          Additional Details (Optional)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="price">Price (KSh)</Label>
            <Input
              id="price"
              type="number"
              value={formData.price}
              onChange={(e) => handleChange("price", e.target.value)}
              disabled={isSubmitting}
              placeholder="Enter price in KSh"
              className="rounded-md"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="area">Area (m²)</Label>
            <Input
              id="area"
              type="number"
              value={formData.area}
              onChange={(e) => handleChange("area", e.target.value)}
              disabled={isSubmitting}
              placeholder="Property area in square metres"
              className="rounded-md"
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
              className="rounded-md"
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
              className="rounded-md"
            />
          </div>
        </div>
      </div>

      {/* Images */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-[#1A1A1A] border-b border-[#E5E5E5] pb-2">
          Images
        </h3>
        <div className="space-y-2">
          <Label>Property Images *</Label>
          <p className="text-sm text-muted-foreground">
            Upload images from your computer or enter image URLs. The first image will be displayed on the project card.
          </p>
        
        {/* Multiple Image Upload Button */}
        <div className="mb-4">
          <Input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => handleMultipleFileSelect(e.target.files)}
            disabled={isSubmitting}
            className="hidden"
            id="multiple-image-upload-edit"
          />
          <Label htmlFor="multiple-image-upload-edit" className="cursor-pointer">
            <Button
              type="button"
              variant="outline"
              disabled={isSubmitting}
              className="w-full"
              asChild
            >
              <span>
                <Upload className="h-4 w-4 mr-2" />
                Select Multiple Images
              </span>
            </Button>
          </Label>
          <p className="text-xs text-muted-foreground mt-1 text-center">
            Hold Ctrl/Cmd to select multiple images at once (max 10MB per image)
          </p>
        </div>

        <div className="space-y-3">
          {formData.images.map((imageUrl, index) => (
            <div key={index} className="space-y-2 p-4 border rounded-md">
              <div className="flex gap-2">
                <div className="flex-1 space-y-2">
                  <Label className="text-xs">Upload from computer (can select multiple):</Label>
                  <div className="flex gap-2">
                    <Input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={(e) => {
                        const files = e.target.files;
                        if (files && files.length > 0) {
                          // If multiple files selected, use the multiple file handler
                          if (files.length > 1) {
                            handleMultipleFileSelect(files);
                          } else {
                            // Single file - use single file handler
                            handleFileSelect(index, files[0]);
                          }
                        }
                      }}
                      disabled={isSubmitting || imageUploads[index]?.uploading}
                      className="flex-1 rounded-md"
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
                  className="rounded-md"
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
      </div>

      {/* Description */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-[#1A1A1A] border-b border-[#E5E5E5] pb-2">
          Description
        </h3>
        <div className="space-y-2">
          <Label htmlFor="description">Description *</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => handleChange("description", e.target.value)}
            required
            disabled={isSubmitting}
            rows={4}
            placeholder="Enter property description (shown in detail view)"
            className="rounded-md"
          />
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-4 border-t border-[#E5E5E5]">
        <Button type="button" variant="outline" onClick={onSuccess} disabled={isSubmitting} className="rounded-md">
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting} className="rounded-md">
          {isSubmitting ? "Updating..." : "Update Property"}
        </Button>
      </div>
    </form>
  );
};

export default EditPropertyForm;
