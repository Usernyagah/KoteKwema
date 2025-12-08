import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-architecture.jpg";
import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";
import project4 from "@/assets/project-4.jpg";
import interiorsImage from "@/assets/interiors.jpg";
import urbanLandscapeImage from "@/assets/urban-landscape.jpg";
import climateSustainableImage from "@/assets/climate-sustainable.jpg";
import engineeringImage from "@/assets/engineering.jpg";
import technologyResearchImage from "@/assets/technology-research.jpg";
import architecturalDesignImage from "@/assets/architectural-design.jpg";
import interiorDesignServiceImage from "@/assets/interior-design-service.jpg";
import bim3dModelingImage from "@/assets/bim-3d-modeling.jpg";
import projectManagementImage from "@/assets/project-management.jpg";

const expertiseAreas = [
  {
    title: "Interiors",
    image: interiorsImage,
    href: "/expertise/interiors",
  },
  {
    title: "Urban and Landscape Design",
    image: urbanLandscapeImage,
    href: "/expertise/urban",
  },
  {
    title: "Climate and Sustainable Design",
    image: climateSustainableImage,
    href: "/expertise/climate",
  },
];

const Expertise = () => {
  return (
    <div className="bg-[#1A1A1A]">
      <div className="pt-12 pb-4">
        <div className="pl-6 lg:pl-12 pr-6 lg:pr-12">
          <div className="mb-8">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
              Expertise
            </h2>
            <p className="text-lg text-white font-bold w-full">
              Kote Kwema offers architectural services, from initial concept development to project completion. Our expertise includes sustainable design, urban planning, and innovative building technologies.
            </p>
          </div>
          
          {/* Engineering - 3/4 width */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <Link to="/expertise/engineering" className="col-span-1 md:col-span-3 relative h-[300px] md:h-[450px] block group cursor-pointer">
              <img
                src={engineeringImage}
                alt="Engineering"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 p-6">
                <span className="text-white text-xl font-bold drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] bg-black/30 px-4 py-2 rounded">Engineering</span>
              </div>
            </Link>
            {/* Technology and Research - 1/4 width */}
            <Link to="/expertise/technology" className="col-span-1 md:col-span-1 relative h-[300px] md:h-[450px] block group cursor-pointer">
              <img
                src={technologyResearchImage}
                alt="Technology and Research"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 p-6">
                <span className="text-white text-xl font-bold">Technology and Research</span>
              </div>
            </Link>
          </div>

          {/* Service Menu with Images */}
          <div className="mb-8">
            <h3 className="text-2xl md:text-3xl font-bold mb-6 text-white">Our Services</h3>
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {/* Architectural Design & Planning */}
              <Link to="/expertise/architecture" className="relative h-[250px] md:h-[300px] block group cursor-pointer overflow-hidden rounded-lg">
                <img
                  src={architecturalDesignImage}
                  alt="Architectural Design & Planning"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-colors duration-300 flex items-end">
                  <div className="p-4 md:p-6 w-full">
                    <span className="text-white text-base md:text-lg font-bold">Architectural Design & Planning</span>
                  </div>
                </div>
              </Link>

              {/* Interior Design */}
              <Link to="/expertise/interiors" className="relative h-[250px] md:h-[300px] block group cursor-pointer overflow-hidden rounded-lg">
                <img
                  src={interiorDesignServiceImage}
                  alt="Interior Design"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-colors duration-300 flex items-end">
                  <div className="p-4 md:p-6 w-full">
                    <span className="text-white text-base md:text-lg font-bold">Interior Design</span>
                  </div>
                </div>
              </Link>

              {/* BIM & 3D Modeling */}
              <Link to="/expertise/technology" className="relative h-[250px] md:h-[300px] block group cursor-pointer overflow-hidden rounded-lg">
                <img
                  src={bim3dModelingImage}
                  alt="BIM & 3D Modeling"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-colors duration-300 flex items-end">
                  <div className="p-4 md:p-6 w-full">
                    <span className="text-white text-base md:text-lg font-bold">BIM & 3D Modeling</span>
                  </div>
                </div>
              </Link>

              {/* Project Management - Full width on mobile to fill space */}
              <Link to="/projects/residential" className="col-span-2 md:col-span-1 lg:col-span-1 relative h-[250px] md:h-[300px] block group cursor-pointer overflow-hidden rounded-lg">
                <img
                  src={projectManagementImage}
                  alt="Project Management"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-colors duration-300 flex items-end">
                  <div className="p-4 md:p-6 w-full">
                    <span className="text-white text-base md:text-lg font-bold">Project Management</span>
                  </div>
                </div>
              </Link>
            </div>
          </div>

          {/* Rest of expertise areas - 3 column grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {expertiseAreas.map((area, index) => (
          <Link
            key={`${area.title}-${index}`}
            to={area.href}
            className="relative h-[300px] block group cursor-pointer"
          >
            <img
              src={area.image}
              alt={area.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute bottom-0 left-0 p-6">
              <span className="text-white text-xl font-bold">{area.title}</span>
            </div>
          </Link>
        ))}
          </div>
          
          {/* View Project Examples Button - Below all sections */}
          <div className="mt-8 text-center">
            <Link to="/projects/residential" className="inline-block px-6 py-3 bg-white text-[#1A1A1A] hover:bg-white/90 transition-colors duration-200 font-bold tracking-wide rounded-full">
              View Project Examples
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Expertise;
