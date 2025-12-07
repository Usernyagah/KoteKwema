import heroImage from "@/assets/hero-architecture.jpg";
import project1 from "@/assets/project-1.jpg";

const Careers = () => {
  return (
    <div>
      <div className="mb-8">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-white">
          Careers
        </h2>
        <p className="text-lg text-white font-bold mb-4">
          Join our global studio and be part of creating sustainable architecture that makes a difference.
        </p>
        <div className="bg-[#333333] p-6 rounded-lg mb-8">
          <h3 className="text-xl font-bold mb-4 text-white">Why Work at Kote Kwema?</h3>
          <p className="text-white mb-4 font-bold">
            At Kote Kwema, we offer more than just a job—we provide a platform for professional growth, creative expression, and meaningful impact. Our company culture values innovation, collaboration, and work-life balance.
          </p>
          <ul className="text-white space-y-2 font-bold">
            <li>• Work on diverse, award-winning projects across multiple sectors</li>
            <li>• Competitive benefits package including health insurance and professional development</li>
            <li>• Collaborative environment with mentorship opportunities</li>
            <li>• Global exposure through our international studio network</li>
            <li>• Commitment to sustainability and social responsibility</li>
          </ul>
        </div>
      </div>

      <div className="space-y-12 text-lg font-light leading-relaxed">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop&q=80"
              alt="Vacancies"
              className="w-full h-[350px] object-cover"
            />
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-4 text-white">Current Openings</h3>
            <div className="space-y-4 mb-6">
              <div className="border-l-2 border-white pl-4">
                <h4 className="text-lg font-bold mb-2 text-white">Senior Architect - Nairobi</h4>
                <p className="text-white mb-2 font-bold">Lead design teams on large-scale commercial and residential projects. Minimum 8 years experience, proficiency in Revit and BIM required.</p>
              </div>
              <div className="border-l-2 border-white pl-4">
                <h4 className="text-lg font-bold mb-2 text-white">Sustainable Design Specialist</h4>
                <p className="text-white mb-2 font-bold">Focus on environmental design, LEED certification, and sustainable building practices. Background in environmental engineering preferred.</p>
              </div>
              <div className="border-l-2 border-white pl-4">
                <h4 className="text-lg font-bold mb-2 text-white">Urban Planner</h4>
                <p className="text-white font-bold">Work on master planning and urban design projects. Experience with GIS and urban design software essential.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="text-2xl font-bold mb-4 text-white">Application Process</h3>
            <p className="text-white mb-4 font-bold">
              To apply, please submit the following in PDF format (total file size under 10MB):
            </p>
            <ul className="text-white space-y-2 mb-6 font-bold">
              <li>• Cover letter expressing your interest and fit</li>
              <li>• Current resume/CV</li>
              <li>• Portfolio showcasing relevant projects (max 10 pages)</li>
              <li>• Contact information and availability</li>
            </ul>
            <p className="text-white font-bold">
              Email applications to: careers@kotekwema.com with the position title in the subject line.
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-4 text-white">Employee Testimonials</h3>
            <div className="space-y-4">
              <div className="bg-[#333333] p-4 rounded">
                <p className="text-white italic mb-2 font-bold">"Working at Kote Kwema has been transformative. The collaborative culture and commitment to sustainable design align perfectly with my values."</p>
                <p className="text-white text-sm font-bold">— Sarah M., Senior Architect</p>
              </div>
              <div className="bg-[#333333] p-4 rounded">
                <p className="text-white italic mb-2 font-bold">"The opportunity to work on diverse international projects while contributing to environmental sustainability makes every day meaningful."</p>
                <p className="text-white text-sm font-bold">— James K., Project Manager</p>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 flex gap-4">
          <a href="/contact" className="px-8 py-3 bg-white text-[#1A1A1A] hover:bg-white/90 transition-colors duration-200 font-bold tracking-wide">
            Apply Now
          </a>
          <button className="px-8 py-3 border border-white hover:border-white/80 transition-colors duration-200 font-bold tracking-wide text-white">
            View All Positions
          </button>
        </div>
      </div>
    </div>
  );
};

export default Careers;


