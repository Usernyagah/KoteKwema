import MenuPageLayout from "@/components/MenuPageLayout";
import heroImage from "@/assets/hero-architecture.jpg";
import project1 from "@/assets/project-1.jpg";

const PeoplePage = () => {
  return (
    <MenuPageLayout>
      <div>
        <h1 className="text-4xl md:text-5xl font-light tracking-tight mb-8">People</h1>
        <div className="mb-8">
          <img
            src={heroImage}
            alt="People"
            className="w-full h-[400px] object-cover"
          />
        </div>
        <p className="text-lg font-light leading-relaxed text-muted-foreground mb-8">
          Our team of talented architects, designers, and engineers work together to create innovative and sustainable designs.
        </p>
        <div>
          <img
            src={project1}
            alt="Team"
            className="w-full h-[300px] object-cover"
          />
        </div>
      </div>
    </MenuPageLayout>
  );
};

export default PeoplePage;

