import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";
import project4 from "@/assets/project-4.jpg";

const projects = [
  {
    id: 1,
    title: "Modern Residence",
    category: "Residential",
    image: project2,
    year: "2024",
  },
  {
    id: 2,
    title: "Innovation Tower",
    category: "Commercial",
    image: project3,
    year: "2023",
  },
  {
    id: 3,
    title: "Cultural Center",
    category: "Cultural",
    image: project4,
    year: "2023",
  },
];

const ProjectsGrid = () => {
  return (
    <section id="projects" className="py-24 px-6 lg:px-12 bg-secondary/30">
      <div className="container mx-auto">
        <div className="mb-16 animate-fade-up">
          <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-4">
            Selected Works
          </h2>
          <p className="text-lg text-muted-foreground font-light">
            A portfolio of recent projects spanning residential, commercial, and cultural spaces
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <a
              key={project.id}
              href="#"
              className="group space-y-4 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative overflow-hidden aspect-[4/5]">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs tracking-widest text-muted-foreground uppercase">
                    {project.category}
                  </span>
                  <span className="text-xs text-muted-foreground">{project.year}</span>
                </div>
                <h3 className="text-xl font-light group-hover:text-accent-foreground transition-colors duration-200">
                  {project.title}
                </h3>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsGrid;
