const expertiseAreas = [
  {
    title: "Residential",
    description: "Custom homes and luxury residences that blend form with function",
  },
  {
    title: "Commercial",
    description: "Innovative workspaces designed for productivity and collaboration",
  },
  {
    title: "Cultural",
    description: "Museums, galleries, and public spaces that inspire communities",
  },
  {
    title: "Sustainable Design",
    description: "Eco-friendly solutions that minimize environmental impact",
  },
  {
    title: "Urban Planning",
    description: "Master planning for mixed-use developments and cityscapes",
  },
  {
    title: "Interior Design",
    description: "Cohesive interiors that complement architectural vision",
  },
];

const Expertise = () => {
  return (
    <section id="expertise" className="py-24 px-6 lg:px-12 bg-background">
      <div className="container mx-auto">
        <div className="mb-16 animate-fade-up">
          <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-4">
            Our Expertise
          </h2>
          <p className="text-lg text-muted-foreground font-light max-w-2xl">
            We bring decades of experience across multiple disciplines to every project
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {expertiseAreas.map((area, index) => (
            <div
              key={area.title}
              className="p-8 border border-border hover:border-foreground/20 transition-all duration-300 animate-fade-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <h3 className="text-xl font-light mb-3">{area.title}</h3>
              <p className="text-muted-foreground font-light leading-relaxed">
                {area.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Expertise;
