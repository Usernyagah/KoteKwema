import heroImage from "@/assets/hero-architecture.jpg";
import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";
import project4 from "@/assets/project-4.jpg";

const Studio = () => {
  return (
    <div>
      <div className="mb-16">
        <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-8">
          Studio
        </h2>
      </div>

      <div className="space-y-16 text-lg font-light leading-relaxed">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <img
              src={heroImage}
              alt="About"
              className="w-full h-[400px] object-cover"
            />
          </div>
          <div>
            <h3 className="text-2xl font-light mb-4">About</h3>
            <p className="text-muted-foreground mb-6">
              We are a global studio for sustainable architecture, urbanism, engineering and design, established in 1967.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="md:order-2">
            <img
              src={project1}
              alt="Kote Kwema"
              className="w-full h-[400px] object-cover"
            />
          </div>
          <div className="md:order-1">
            <h3 className="text-2xl font-light mb-4">Kote Kwema</h3>
            <p className="text-muted-foreground mb-6">
              From the very beginning our practice was founded on a philosophy of innovation, sustainability and design. We continue to learn from the past and creatively embrace the challenges of the future, with a firm belief that good design makes a difference.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <img
              src={project2}
              alt="Life at Kote Kwema"
              className="w-full h-[400px] object-cover"
            />
          </div>
          <div>
            <h3 className="text-2xl font-light mb-4">Life at Kote Kwema</h3>
            <p className="text-muted-foreground mb-6">
              We are committed to creating an inclusive and inspiring work environment where talented individuals can thrive and contribute to our global mission of sustainable design.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="md:order-2">
            <img
              src={project3}
              alt="Equity, Diversity and Inclusion"
              className="w-full h-[400px] object-cover"
            />
          </div>
          <div className="md:order-1">
            <h3 className="text-2xl font-light mb-4">Equity, Diversity and Inclusion</h3>
            <p className="text-muted-foreground mb-6">
              We believe that diverse perspectives strengthen our design process and enable us to create more meaningful and inclusive spaces for all.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <img
              src={project4}
              alt="Corporate Social Responsibility"
              className="w-full h-[400px] object-cover"
            />
          </div>
          <div>
            <h3 className="text-2xl font-light mb-4">Corporate Social Responsibility</h3>
            <p className="text-muted-foreground mb-6">
              Our commitment extends beyond architecture to making a positive impact on communities and the environment through responsible practices and partnerships.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="md:order-2">
            <img
              src={heroImage}
              alt="Global studios"
              className="w-full h-[400px] object-cover"
            />
          </div>
          <div className="md:order-1">
            <h3 className="text-2xl font-light mb-4">Global studios</h3>
            <p className="text-muted-foreground">
              With studios around the world, we bring local expertise and global perspective to every project, ensuring our designs respond to their unique contexts and communities.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Studio;


