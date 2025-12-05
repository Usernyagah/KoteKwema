import heroImage from "@/assets/hero-architecture.jpg";
import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";
import project4 from "@/assets/project-4.jpg";

const Studio = () => {
  return (
    <div className="bg-[#1A1A1A]">
      <div className="mb-16">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-8 text-white">
          Studio
        </h2>
      </div>

      <div className="space-y-16 text-lg font-light leading-relaxed">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <img
              src={heroImage}
              alt="About"
              className="w-full h-[400px] object-cover"
            />
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-4 text-white">About</h3>
            <p className="text-white mb-6 font-bold">
              We are a global studio for sustainable architecture, urbanism, engineering and design, established in 1967. Kote Kwema was founded with a vision to create architecture that harmonizes with nature while meeting the evolving needs of communities. Our journey began in Nairobi, Kenya, and has expanded globally, bringing together diverse perspectives and expertise to deliver innovative design solutions.
            </p>
            <p className="text-white mb-6 font-bold">
              Our philosophy centers on the belief that architecture should serve both people and the planet. We approach each project with deep respect for local context, cultural heritage, and environmental sustainability, creating spaces that inspire and endure.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="md:order-2">
            <img
              src={project1}
              alt="Kote Kwema"
              className="w-full h-[400px] object-cover"
            />
          </div>
          <div className="md:order-1">
            <h3 className="text-2xl logo-font mb-4 text-white">KOTE KWEMA</h3>
            <p className="text-white mb-6 font-bold">
              From the very beginning our practice was founded on a philosophy of innovation, sustainability and design. We continue to learn from the past and creatively embrace the challenges of the future, with a firm belief that good design makes a difference.
            </p>
            <div className="mt-6 space-y-4">
              <div>
                <h4 className="text-lg font-bold mb-2 text-white">Core Values</h4>
                <ul className="text-white space-y-2 font-bold">
                  <li>• Sustainability: Environmental responsibility in every project</li>
                  <li>• Innovation: Pushing boundaries in design and technology</li>
                  <li>• Community Engagement: Creating spaces that serve communities</li>
                  <li>• Design Excellence: Uncompromising quality in every detail</li>
                  <li>• Cultural Sensitivity: Respecting local context and heritage</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <img
              src={project2}
              alt="Work Process"
              className="w-full h-[400px] object-cover"
            />
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-4 text-white">Work Process</h3>
            <p className="text-white mb-4 font-bold">
              Our architectural process is collaborative and client-focused, from initial concept to construction completion. We begin with deep research into site context, client needs, and environmental factors, then develop design solutions through iterative refinement.
            </p>
            <p className="text-white mb-4 font-bold">
              We utilize advanced design tools including Revit, AutoCAD, 3D modeling, and BIM technologies to visualize and optimize our designs. Our process emphasizes sustainability analysis, material research, and stakeholder engagement at every stage.
            </p>
            <p className="text-white font-bold">
              We collaborate closely with clients, engineers, consultants, and contractors to ensure seamless project delivery and exceptional outcomes.
            </p>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="text-2xl font-bold mb-4 text-white">Life at <span className="logo-font">KOTE KWEMA</span></h3>
            <p className="text-white mb-6 font-bold">
              We are committed to creating an inclusive and inspiring work environment where talented individuals can thrive and contribute to our global mission of sustainable design. Our studio culture values creativity, collaboration, and continuous learning.
            </p>
            <p className="text-white font-bold">
              Behind the scenes, our design process involves extensive sketching, concept development, material exploration, and iterative refinement. We celebrate the creative journey from initial inspiration to final built form.
            </p>
          </div>
          <div>
            <img
              src={project1}
              alt="Studio Culture"
              className="w-full h-[400px] object-cover"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="md:order-2">
            <img
              src={project3}
              alt="Equity, Diversity and Inclusion"
              className="w-full h-[400px] object-cover"
            />
          </div>
          <div className="md:order-1">
            <h3 className="text-2xl font-bold mb-4 text-white">Equity, Diversity and Inclusion</h3>
            <p className="text-white mb-6 font-bold">
              We believe that diverse perspectives strengthen our design process and enable us to create more meaningful and inclusive spaces for all.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <img
              src={project4}
              alt="Corporate Social Responsibility"
              className="w-full h-[400px] object-cover"
            />
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-4 text-white">Corporate Social Responsibility</h3>
            <p className="text-white mb-6 font-bold">
              Our commitment extends beyond architecture to making a positive impact on communities and the environment through responsible practices and partnerships.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="md:order-2">
            <img
              src={heroImage}
              alt="Global studios"
              className="w-full h-[400px] object-cover"
            />
          </div>
          <div className="md:order-1">
            <h3 className="text-2xl font-bold mb-4 text-white">Global Studios</h3>
            <p className="text-white mb-4 font-bold">
              With studios around the world, we bring local expertise and global perspective to every project, ensuring our designs respond to their unique contexts and communities.
            </p>
            <div className="mt-4 space-y-3 text-white font-bold">
              <p><strong>Nairobi Office:</strong> Our flagship studio in Kenya, serving East Africa</p>
              <p><strong>International Reach:</strong> Projects across Africa, Europe, and Asia</p>
              <p><strong>Local Expertise:</strong> Deep understanding of diverse regulatory environments, building codes, and cultural contexts in each market we serve</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Studio;


