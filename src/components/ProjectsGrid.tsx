import { useState } from "react";
import { Link } from "react-router-dom";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";
import project4 from "@/assets/project-4.jpg";

const projects = [
  {
    id: 1,
    title: "Modern Residence",
    category: "Residential",
    location: "Nairobi, Kenya",
    image: project2,
    year: "2024",
    challenge: "Design a sustainable family home that integrates with the natural landscape while providing modern amenities.",
    solution: "A contemporary residence featuring passive solar design, rainwater harvesting, and locally sourced materials.",
    features: ["LEED Gold Certified", "Solar Power Integration", "Native Landscaping"],
  },
  {
    id: 2,
    title: "Innovation Tower",
    category: "Commercial",
    location: "Nairobi, Kenya",
    image: project3,
    year: "2023",
    challenge: "Create a landmark commercial building that sets new standards for sustainable high-rise design in East Africa.",
    solution: "A 30-story tower incorporating green walls, energy-efficient systems, and flexible workspace design.",
    features: ["BIM Technology", "Smart Building Systems", "Mixed-Use Development"],
  },
  {
    id: 3,
    title: "Cultural Center",
    category: "Cultural",
    location: "Nairobi, Kenya",
    image: project4,
    year: "2023",
    challenge: "Design a cultural hub that celebrates local heritage while providing modern exhibition and performance spaces.",
    solution: "A contemporary facility that blends traditional architectural elements with innovative spatial design.",
    features: ["Community Engagement", "Flexible Event Spaces", "Cultural Preservation"],
  },
];

const ProjectsGrid = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const categories = ["All", "Residential", "Commercial", "Cultural"];
  
  const filteredProjects = selectedCategory === null || selectedCategory === "All"
    ? projects
    : projects.filter(p => p.category === selectedCategory);

  return (
    <div>
      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-4 mb-8">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category === "All" ? null : category)}
            className={`px-6 py-2 border transition-colors duration-200 font-bold tracking-wide ${
              (selectedCategory === null && category === "All") || selectedCategory === category
                ? "bg-white text-[#1A1A1A] border-white"
                : "border-white text-white hover:bg-white/10"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="space-y-12">
        {filteredProjects.map((project) => {
          // Map category to subtopic href
          const categoryToHref: Record<string, string> = {
            "Residential": "/projects/residential",
            "Commercial": "/projects/commercial",
            "Cultural": "/projects/cultural",
          };
          const href = categoryToHref[project.category] || "#";
          
          return (
          <Link
            key={project.id}
            to={href}
            className="group block space-y-4"
          >
            <div className="relative overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-[400px] object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs tracking-widest text-white uppercase font-bold">
                  {project.category} • {project.location}
                </span>
                <span className="text-xs text-white font-bold">{project.year}</span>
              </div>
              <h3 className="text-xl font-bold text-white group-hover:text-white/80 transition-colors duration-200">
                {project.title}
              </h3>
              <div className="space-y-2">
                <p className="text-white/80 font-bold"><strong>Challenge:</strong> {project.challenge}</p>
                <p className="text-white/80 font-bold"><strong>Solution:</strong> {project.solution}</p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {project.features.map((feature, idx) => (
                    <span key={idx} className="px-3 py-1 bg-[#333333] text-white text-xs font-bold rounded">
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Link>
          );
        })}
      </div>
    </div>
  );
};

export default ProjectsGrid;
