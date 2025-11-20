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
    <div>
      <div className="space-y-12">
        {projects.map((project) => (
          <a
            key={project.id}
            href="#"
            className="group block space-y-4"
          >
            <div className="relative overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-[400px] object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs tracking-widest text-muted-foreground uppercase">
                  {project.category}
                </span>
                <span className="text-xs text-muted-foreground">{project.year}</span>
              </div>
              <h3 className="text-xl font-light group-hover:text-gray-600 transition-colors duration-200">
                {project.title}
              </h3>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default ProjectsGrid;
