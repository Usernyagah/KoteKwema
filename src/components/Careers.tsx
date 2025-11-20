import heroImage from "@/assets/hero-architecture.jpg";
import project1 from "@/assets/project-1.jpg";

const Careers = () => {
  return (
    <div>
      <div className="mb-8">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-white">
          Careers
        </h2>
        <p className="text-lg text-white font-bold">
          Join our global studio and be part of creating sustainable architecture that makes a difference.
        </p>
      </div>

      <div className="space-y-12 text-lg font-light leading-relaxed">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <img
              src={heroImage}
              alt="Vacancies"
              className="w-full h-[350px] object-cover"
            />
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-4 text-white">Vacancies</h3>
            <p className="text-white mb-6 font-bold">
              We are always looking for talented individuals who share our passion for innovative design and sustainable architecture. Explore current opportunities across our global studios.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="md:order-2">
            <img
              src={project1}
              alt="Life at Kote Kwema"
              className="w-full h-[350px] object-cover"
            />
          </div>
          <div className="md:order-1">
            <h3 className="text-2xl font-bold mb-4 text-white">Life at Kote Kwema</h3>
            <p className="text-white mb-6 font-bold">
              Working with us means being part of a collaborative, creative environment where your ideas can shape the future of architecture. We value innovation, sustainability, and design excellence.
            </p>
          </div>
        </div>

        <div className="pt-8">
          <button className="px-8 py-3 border border-white hover:border-white/80 transition-colors duration-200 font-bold tracking-wide text-white">
            View Open Positions
          </button>
        </div>
      </div>
    </div>
  );
};

export default Careers;


