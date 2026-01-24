import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { v4 as uuidv4 } from 'uuid';

interface ContactFormProps {
  formType: "consultation" | "inquiry" | "project";
  formId?: string; // Formspree form ID - optional, can be set per form type
}

const ContactForm = ({ formType, formId }: ContactFormProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    projectType: "",
    budget: "",
    timeline: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Formspree form IDs for different form types
  const getFormId = () => {
    if (formId) return formId;

    // Return form ID based on form type
    switch (formType) {
      case "consultation":
        return "xjkneovj";
      case "inquiry":
        return "mdkqldob";
      case "project":
        return "manrdbyk";
      default:
        return "mdkqldob"; // Default to general inquiry
    }
  };

  const getFormSubject = () => {
    switch (formType) {
      case "consultation":
        return "Consultation Request - Kote Kwema";
      case "inquiry":
        return "General Inquiry - Kote Kwema";
      case "project":
        return "Project Inquiry - Kote Kwema";
      default:
        return "Contact Form - Kote Kwema";
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const submissionData = {
        ...formData,
        id: uuidv4(),
        formType,
        status: 'new',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };

      // Save to Firebase
      console.log("Saving submission to Firestore:", submissionData);
      const docRef = await addDoc(collection(db, "contactSubmissions"), submissionData);
      console.log("Submission saved with ID:", docRef.id);

      // Optional: Keep the Formspree submission if you still want email notifications
      try {
        await fetch(`https://formspree.io/f/${getFormId()}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
            _subject: getFormSubject(),
            _format: "plain",
            formType,
          }),
        });
      } catch (emailError) {
        console.error("Failed to send email notification:", emailError);
        // Continue even if email fails
      }

      toast({
        title: "Thank you!",
        description:
          "Your message has been sent. We'll get back to you within 24-48 hours.",
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
        projectType: "",
        budget: "",
        timeline: "",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again or email us directly at info@kotekwema.com",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 mt-8 md:mt-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-[#1A1A1A] mb-2">
            Name *
          </label>
          <Input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            required
            disabled={isSubmitting}
            className="w-full bg-white border border-[#E5E5E5] text-[#1A1A1A] focus:border-[#1A1A1A]"
            placeholder="Your name"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-[#1A1A1A] mb-2">
            Email *
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            disabled={isSubmitting}
            className="w-full bg-white border border-[#E5E5E5] text-[#1A1A1A] focus:border-[#1A1A1A]"
            placeholder="your@email.com"
          />
        </div>
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-[#1A1A1A] mb-2">
          Phone
        </label>
        <Input
          id="phone"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          disabled={isSubmitting}
          className="w-full bg-white border border-[#E5E5E5] text-[#1A1A1A] focus:border-[#1A1A1A]"
          placeholder="+254 20 123 4567"
        />
      </div>

      {formType === "project" && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="projectType" className="block text-sm font-medium text-[#1A1A1A] mb-2">
                Project Type
              </label>
              <Input
                id="projectType"
                name="projectType"
                type="text"
                value={formData.projectType}
                onChange={handleChange}
                disabled={isSubmitting}
                className="w-full bg-white border border-[#E5E5E5] text-[#1A1A1A] focus:border-[#1A1A1A]"
                placeholder="Residential, Commercial, etc."
              />
            </div>

            <div>
              <label htmlFor="budget" className="block text-sm font-medium text-[#1A1A1A] mb-2">
                Budget Range
              </label>
              <Input
                id="budget"
                name="budget"
                type="text"
                value={formData.budget}
                onChange={handleChange}
                disabled={isSubmitting}
                className="w-full bg-white border border-[#E5E5E5] text-[#1A1A1A] focus:border-[#1A1A1A]"
                placeholder="Budget range"
              />
            </div>
          </div>

          <div>
            <label htmlFor="timeline" className="block text-sm font-medium text-[#1A1A1A] mb-2">
              Timeline
            </label>
            <Input
              id="timeline"
              name="timeline"
              type="text"
              value={formData.timeline}
              onChange={handleChange}
              disabled={isSubmitting}
              className="w-full bg-white border border-[#E5E5E5] text-[#1A1A1A] focus:border-[#1A1A1A]"
              placeholder="Expected timeline"
            />
          </div>
        </>
      )}

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-[#1A1A1A] mb-2">
          Message *
        </label>
        <Textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          disabled={isSubmitting}
          rows={6}
          className="w-full bg-white border border-[#E5E5E5] text-[#1A1A1A] focus:border-[#1A1A1A] resize-none"
          placeholder={
            formType === "consultation"
              ? "Tell us about your project and what you'd like to discuss..."
              : formType === "project"
                ? "Tell us about your project vision, requirements, and goals..."
                : "How can we help you?"
          }
        />
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full md:w-auto bg-[#1A1A1A] text-white hover:bg-[#2A2A2A] px-8 py-6 text-base font-bold disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Sending..." : formType === "consultation" ? "Request Consultation" : formType === "project" ? "Submit Project Inquiry" : "Send Message"}
      </Button>
    </form>
  );
};

export default ContactForm;

