import { ArrowRight } from "lucide-react";
import project1 from "@/assets/project-1.jpg";

const FeaturedProject = () => {
  return (
    <section className="py-24 px-6 lg:px-12 bg-background">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-fade-up">
            <span className="text-sm tracking-widest text-muted-foreground uppercase">
              Featured Project
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight">
              Corporate Headquarters
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed font-light">
              A transformative workspace designed to foster collaboration and innovation. 
              This 50,000 square foot headquarters features sustainable materials, 
              natural lighting, and flexible spaces that adapt to modern work patterns.
            </p>
            <div className="pt-4">
              <a
                href="#"
                className="inline-flex items-center gap-2 text-sm tracking-wide hover:gap-4 transition-all duration-300"
              >
                View Project <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
          <div className="relative group overflow-hidden animate-fade-in">
            <img
              src={project1}
              alt="Corporate Headquarters"
              className="w-full h-[600px] object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProject;
