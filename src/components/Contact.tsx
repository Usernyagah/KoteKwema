import { Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-architecture.jpg";

const Contact = () => {
  return (
    <div>
      <div className="mb-8">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-white">
          Start Your Project
        </h2>
        <p className="text-lg text-white font-bold mb-4">
          Let's discuss how we can bring your vision to life. Request a consultation with our team to explore innovative design solutions for your project.
        </p>
        <div className="bg-[#333333] p-6 rounded-lg mb-6">
          <p className="text-white font-bold">
            Ready to begin? Schedule a consultation to discuss your architectural needs, project timeline, and design goals. Our team is here to guide you through every step of the process.
          </p>
        </div>
      </div>

      <div className="mb-8">
        <img
          src={heroImage}
          alt="Contact"
          className="w-full h-[300px] object-cover mb-8"
        />
      </div>

      <div className="space-y-6 mb-8">
        <div className="flex items-start gap-4">
          <MapPin className="h-5 w-5 mt-1 text-white" />
          <div>
            <p className="font-bold mb-1 text-white">Nairobi Office</p>
            <p className="text-white text-sm font-bold">
              Westlands, Nairobi
              <br />
              Kenya
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <Phone className="h-5 w-5 mt-1 text-white" />
          <div>
            <p className="font-bold mb-1 text-white">Phone</p>
            <p className="text-white text-sm font-bold">+254 20 123 4567</p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <Mail className="h-5 w-5 mt-1 text-white" />
          <div>
            <p className="font-bold mb-1 text-white">Email</p>
            <p className="text-white text-sm font-bold">
              contact@kotekwema.com
            </p>
          </div>
        </div>
      </div>

      <form className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-bold text-white">
            Name
          </label>
          <input
            type="text"
            id="name"
            className="w-full px-4 py-3 bg-background border border-border focus:border-foreground/50 focus:outline-none transition-colors duration-200 text-white font-bold placeholder-white/50"
            placeholder="Your name"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-bold text-white">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="w-full px-4 py-3 bg-background border border-border focus:border-foreground/50 focus:outline-none transition-colors duration-200 text-white font-bold placeholder-white/50"
            placeholder="your@email.com"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="message" className="text-sm font-bold text-white">
            Message
          </label>
          <textarea
            id="message"
            rows={6}
            className="w-full px-4 py-3 bg-background border border-border focus:border-foreground/50 focus:outline-none transition-colors duration-200 resize-none text-white font-bold placeholder-white/50"
            placeholder="Tell us about your project"
          />
        </div>

        <Button className="w-full bg-white text-[#1A1A1A] hover:bg-white/90 transition-colors duration-200 font-bold text-lg py-6">
          Request a Consultation
        </Button>
      </form>
    </div>
  );
};

export default Contact;
