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
          Join our studio and be part of creating sustainable architecture that makes a difference.
        </p>
        <div className="bg-[#333333] p-6 rounded-lg mb-8">
          <h3 className="text-xl font-bold mb-4 text-white">Why Work at Kote Kwema?</h3>
          <p className="text-white mb-4 font-bold">
            At Kote Kwema, we offer more than just a job—we provide a platform for professional growth, creative expression, and meaningful impact. Our company culture values innovation, collaboration, and work-life balance.
          </p>
          <ul className="text-white space-y-2 font-bold">
            <li>• Work on diverse projects across different sectors</li>
            <li>• Competitive benefits package including health insurance and professional development</li>
            <li>• Collaborative environment with mentorship opportunities</li>
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
            <p className="text-white mb-4 font-bold">
              We occasionally have openings for talented architects and designers. If you're passionate about sustainable design and would like to join our team, please reach out.
            </p>
            <p className="text-white font-bold">
              Send your portfolio and resume to: careers@kotekwema.com
            </p>
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
            <h3 className="text-2xl font-bold mb-4 text-white">What We Offer</h3>
            <p className="text-white mb-4 font-bold">
              As a small studio, we offer a close-knit working environment where every team member's contribution matters. You'll work directly on projects from concept to completion, gaining valuable experience across all aspects of architectural practice.
            </p>
            <p className="text-white font-bold">
              We value creativity, sustainability, and collaborative design. If this aligns with your values, we'd love to hear from you.
            </p>
          </div>
        </div>

        <div className="pt-8">
          <a href="/contact" className="inline-block px-8 py-3 bg-white text-[#1A1A1A] hover:bg-white/90 transition-colors duration-200 font-bold tracking-wide">
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
};

export default Careers;


