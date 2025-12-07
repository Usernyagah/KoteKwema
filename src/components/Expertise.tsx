import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-architecture.jpg";
import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";
import project4 from "@/assets/project-4.jpg";

const expertiseAreas = [
  {
    title: "Interiors",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop&q=80",
    href: "/expertise/interiors",
  },
  {
    title: "Urban and Landscape Design",
    image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop&q=80",
    href: "/expertise/urban",
  },
  {
    title: "Workplace Consultancy",
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&h=600&fit=crop&q=80",
    href: "/expertise/workplace",
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
              Kote Kwema offers comprehensive architectural services, from initial concept development to project completion. Our expertise spans multiple sectors, with specialized knowledge in sustainable design, urban planning, and innovative building technologies.
            </p>
          </div>
          
          {/* Engineering - 3/4 width */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <Link to="/expertise/engineering" className="col-span-1 md:col-span-3 relative h-[300px] md:h-[450px] block group cursor-pointer">
              <img
                src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1200&h=800&fit=crop&q=80"
                alt="Engineering"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 p-6">
                <span className="text-white text-xl font-bold">Engineering</span>
              </div>
            </Link>
            {/* Technology and Research - 1/4 width */}
            <Link to="/expertise/technology" className="col-span-1 md:col-span-1 relative h-[300px] md:h-[450px] block group cursor-pointer">
              <img
                src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&h=1200&fit=crop&q=80"
                alt="Technology and Research"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 p-6">
                <span className="text-white text-xl font-bold">Technology and Research</span>
              </div>
            </Link>
          </div>

          {/* Service Menu */}
          <div className="mb-8 bg-[#333333] p-8 rounded-lg">
            <h3 className="text-2xl font-bold mb-6 text-white">Our Services</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-bold mb-3 text-white">Core Services</h4>
                <ul className="space-y-2 text-white font-bold">
                  <li>• Architectural Design & Planning</li>
                  <li>• Urban Planning & Master Planning</li>
                  <li>• Interior Design</li>
                  <li>• Landscape Architecture</li>
                  <li>• Engineering Services</li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-bold mb-3 text-white">Specialized Services</h4>
                <ul className="space-y-2 text-white font-bold">
                  <li>• Sustainable Design & LEED Consulting</li>
                  <li>• BIM Technology & 3D Modeling</li>
                  <li>• Historic Preservation</li>
                  <li>• Workplace Consultancy</li>
                  <li>• Project Management</li>
                </ul>
              </div>
            </div>
            <div className="mt-6">
              <Link to="/projects" className="inline-block px-6 py-3 bg-white text-[#1A1A1A] hover:bg-white/90 transition-colors duration-200 font-bold tracking-wide rounded-full">
                View Project Examples
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
        </div>
      </div>
    </div>
  );
};

export default Expertise;
