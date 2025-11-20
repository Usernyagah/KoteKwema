import { Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-architecture.jpg";

const Contact = () => {
  return (
    <div>
      <div className="mb-8">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-white">
          Start a Conversation
        </h2>
        <p className="text-lg text-white font-bold">
          Let's discuss how we can bring your vision to life
        </p>
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
            <p className="font-bold mb-1 text-white">Location</p>
            <p className="text-white text-sm font-bold">
              123 Architecture Lane
              <br />
              New York, NY 10001
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <Phone className="h-5 w-5 mt-1 text-white" />
          <div>
            <p className="font-bold mb-1 text-white">Phone</p>
            <p className="text-white text-sm font-bold">+1 (555) 123-4567</p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <Mail className="h-5 w-5 mt-1 text-white" />
          <div>
            <p className="font-bold mb-1 text-white">Email</p>
            <p className="text-white text-sm font-bold">
              contact@architecture.com
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

        <Button className="w-full bg-primary text-primary-foreground hover:bg-accent transition-colors duration-200">
          Send Message
        </Button>
      </form>
    </div>
  );
};

export default Contact;
