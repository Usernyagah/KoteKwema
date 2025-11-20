import MenuPageLayout from "@/components/MenuPageLayout";
import heroImage from "@/assets/hero-architecture.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";

const InsightsPage = () => {
  return (
    <MenuPageLayout>
      <div>
        <h1 className="text-4xl md:text-5xl font-light tracking-tight mb-8">Insights</h1>
        <div className="mb-8">
          <img
            src={heroImage}
            alt="Insights"
            className="w-full h-[400px] object-cover mb-6"
          />
        </div>
        <p className="text-lg font-light leading-relaxed text-muted-foreground mb-8">
          Explore our thoughts on architecture, sustainability, and design innovation.
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <img
              src={project2}
              alt="Architecture Insights"
              className="w-full h-[250px] object-cover mb-4"
            />
            <h3 className="text-xl font-light mb-2">Design Philosophy</h3>
            <p className="text-muted-foreground font-light text-sm">
              Our approach to architecture combines innovation with sustainability.
            </p>
          </div>
          <div>
            <img
              src={project3}
              alt="Sustainability Insights"
              className="w-full h-[250px] object-cover mb-4"
            />
            <h3 className="text-xl font-light mb-2">Sustainable Future</h3>
            <p className="text-muted-foreground font-light text-sm">
              Building for tomorrow with today's sustainable technologies.
            </p>
          </div>
        </div>
      </div>
    </MenuPageLayout>
  );
};

export default InsightsPage;

