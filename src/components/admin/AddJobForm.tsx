import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";

interface JobFormData {
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  requirements: string;
  applicationEmail: string;
  applicationUrl: string;
}

const AddJobForm = () => {
  const [formData, setFormData] = useState<JobFormData>({
    title: "",
    department: "",
    location: "",
    type: "",
    description: "",
    requirements: "",
    applicationEmail: "",
    applicationUrl: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field: keyof JobFormData, value: string) => {
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
      await addDoc(collection(db, "jobVacancies"), {
        ...formData,
        isActive: true,
        createdAt: new Date(),
      });

      toast({
        title: "Success!",
        description: "Job vacancy added successfully.",
      });

      // Reset form
      setFormData({
        title: "",
        department: "",
        location: "",
        type: "",
        description: "",
        requirements: "",
        applicationEmail: "",
        applicationUrl: "",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add job vacancy. Please try again.",
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
          <Label htmlFor="title">Job Title *</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => handleChange("title", e.target.value)}
            required
            disabled={isSubmitting}
            placeholder="e.g., Senior Architect"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="department">Department *</Label>
          <Select value={formData.department} onValueChange={(value) => handleChange("department", value)} required>
            <SelectTrigger disabled={isSubmitting}>
              <SelectValue placeholder="Select department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="architecture">Architecture</SelectItem>
              <SelectItem value="design">Design</SelectItem>
              <SelectItem value="engineering">Engineering</SelectItem>
              <SelectItem value="interior-design">Interior Design</SelectItem>
              <SelectItem value="urban-planning">Urban Planning</SelectItem>
              <SelectItem value="administration">Administration</SelectItem>
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
            placeholder="e.g., Nairobi, Kenya"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="type">Job Type *</Label>
          <Select value={formData.type} onValueChange={(value) => handleChange("type", value)} required>
            <SelectTrigger disabled={isSubmitting}>
              <SelectValue placeholder="Select job type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="full-time">Full-Time</SelectItem>
              <SelectItem value="part-time">Part-Time</SelectItem>
              <SelectItem value="contract">Contract</SelectItem>
              <SelectItem value="internship">Internship</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="applicationEmail">Application Email</Label>
          <Input
            id="applicationEmail"
            type="email"
            value={formData.applicationEmail}
            onChange={(e) => handleChange("applicationEmail", e.target.value)}
            disabled={isSubmitting}
            placeholder="careers@kotekwema.com"
          />
          <p className="text-xs text-muted-foreground">
            Default: careers@kotekwema.com (as per careers page)
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="applicationUrl">Application URL</Label>
          <Input
            id="applicationUrl"
            type="url"
            value={formData.applicationUrl}
            onChange={(e) => handleChange("applicationUrl", e.target.value)}
            disabled={isSubmitting}
            placeholder="https://example.com/apply"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Job Description *</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => handleChange("description", e.target.value)}
          required
          disabled={isSubmitting}
          rows={4}
          placeholder="Describe the role and responsibilities"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="requirements">Requirements</Label>
        <Textarea
          id="requirements"
          value={formData.requirements}
          onChange={(e) => handleChange("requirements", e.target.value)}
          disabled={isSubmitting}
          rows={4}
          placeholder="List the requirements and qualifications"
        />
      </div>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Adding..." : "Add Job Vacancy"}
      </Button>
    </form>
  );
};

export default AddJobForm;
