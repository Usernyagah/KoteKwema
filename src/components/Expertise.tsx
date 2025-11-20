import heroImage from "@/assets/hero-architecture.jpg";
import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";
import project4 from "@/assets/project-4.jpg";

const expertiseAreas = [
  {
    title: "Interiors",
    image: project2,
  },
  {
    title: "Urban and Landscape Design",
    image: project3,
  },
  {
    title: "Workplace Consultancy",
    image: project4,
  },
];

const Expertise = () => {
  return (
    <div className="bg-[#1A1A1A]">
      <div className="pt-20 pb-8">
        <div className="pl-6 lg:pl-12 pr-6 lg:pr-12">
          <div className="mb-8">
            <h2 className="text-4xl md:text-5xl font-light tracking-tight text-[#D0D0D0]">
              Expertise
            </h2>
          </div>
          
          {/* Engineering - 3/4 width */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <div className="md:col-span-3 relative h-[400px] md:h-[600px] group cursor-pointer">
              <img
                src={heroImage}
                alt="Engineering"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 p-6">
                <span className="text-white text-xl font-light">Engineering</span>
              </div>
            </div>
            {/* Technology and Research - 1/4 width */}
            <div className="md:col-span-1 relative h-[400px] md:h-[600px] group cursor-pointer">
              <img
                src={project1}
                alt="Technology and Research"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 p-6">
                <span className="text-white text-xl font-light">Technology and Research</span>
              </div>
            </div>
          </div>

          {/* Rest of expertise areas - 3 column grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {expertiseAreas.map((area, index) => (
          <div
            key={`${area.title}-${index}`}
            className="relative h-[400px] group cursor-pointer"
          >
            <img
              src={area.image}
              alt={area.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute bottom-0 left-0 p-6">
              <span className="text-white text-xl font-light">{area.title}</span>
            </div>
          </div>
        ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Expertise;
