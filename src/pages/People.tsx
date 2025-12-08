import MenuPageLayout from "@/components/MenuPageLayout";
import heroImage from "@/assets/hero-architecture.jpg";
import project1 from "@/assets/project-1.jpg";

const PeoplePage = () => {
  const teamMembers: never[] = [];

  return (
    <MenuPageLayout>
      <div>
        <h1 className="text-4xl md:text-5xl font-light tracking-tight mb-8 text-white">People</h1>
        <div className="mb-8">
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=600&fit=crop&q=80"
            alt="People"
            className="w-full h-[400px] object-cover"
          />
        </div>
        <p className="text-lg font-light leading-relaxed text-white mb-12 font-bold">
          Our small team works together to create innovative and sustainable designs. We bring passion and dedication to delivering exceptional architectural solutions.
        </p>
        
        <div className="bg-[#333333] p-8 rounded-lg">
          <h3 className="text-2xl font-bold mb-4 text-white">Join Our Team</h3>
          <p className="text-white mb-6 font-bold">
            We're always looking for passionate individuals who share our commitment to sustainable design and innovation. Explore career opportunities and become part of our studio.
          </p>
          <a href="/careers" className="inline-block px-8 py-3 bg-white text-[#1A1A1A] hover:bg-white/90 transition-colors duration-200 font-bold tracking-wide">
            View Careers
          </a>
        </div>
      </div>
    </MenuPageLayout>
  );
};

export default PeoplePage;

