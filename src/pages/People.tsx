import MenuPageLayout from "@/components/MenuPageLayout";
import heroImage from "@/assets/hero-architecture.jpg";
import project1 from "@/assets/project-1.jpg";

const PeoplePage = () => {
  const teamMembers = [
    {
      name: "Dr. Sarah Wanjiku",
      role: "Principal Architect & Founder",
      qualifications: "M.Arch, PhD in Sustainable Design",
      bio: "With over 20 years of experience, Sarah leads our design vision with a passion for sustainable architecture and community engagement.",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&h=800&fit=crop&q=80",
    },
    {
      name: "James Kariuki",
      role: "Senior Project Manager",
      qualifications: "B.Arch, PMP Certified",
      bio: "James specializes in large-scale commercial projects and brings expertise in BIM technology and project delivery.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=800&fit=crop&q=80",
    },
    {
      name: "Amina Hassan",
      role: "Sustainable Design Specialist",
      qualifications: "M.Sc Environmental Engineering, LEED AP",
      bio: "Amina drives our sustainability initiatives, ensuring every project meets the highest environmental standards.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&h=800&fit=crop&q=80",
    },
  ];

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
          Our team of talented architects, designers, and engineers work together to create innovative and sustainable designs. Each member brings unique expertise, passion, and dedication to delivering exceptional architectural solutions.
        </p>
        
        <div className="space-y-12 mb-12">
          {teamMembers.map((member, index) => (
            <div key={index} className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-[400px] object-cover"
                />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2 text-white">{member.name}</h3>
                <p className="text-lg font-bold mb-2 text-white">{member.role}</p>
                <p className="text-sm font-bold mb-4 text-white/80">{member.qualifications}</p>
                <p className="text-white font-bold leading-relaxed">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="bg-[#333333] p-8 rounded-lg">
          <h3 className="text-2xl font-bold mb-4 text-white">Join Our Team</h3>
          <p className="text-white mb-6 font-bold">
            We're always looking for passionate individuals who share our commitment to sustainable design and innovation. Explore career opportunities and become part of our global studio.
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

