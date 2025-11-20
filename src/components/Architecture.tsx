import heroImage from "@/assets/hero-architecture.jpg";

const Architecture = () => {
  return (
    <section id="architecture" className="bg-[#1A1A1A]">
      <div className="pt-20 pb-8">
        <div className="pl-6 lg:pl-12 pr-6 lg:pr-12">
          <div className="mb-8">
            <h2 className="text-4xl md:text-5xl font-light tracking-tight text-[#D0D0D0]">
              Architecture
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Left - Large Image with "Architecture" overlay (3/4 width) */}
        <a href="#" className="md:col-span-3 relative h-[300px] md:h-[500px] block group cursor-pointer">
          <img
            src={heroImage}
            alt="Architecture"
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute bottom-0 left-0 p-6">
            <span className="text-white text-2xl font-light">Architecture</span>
          </div>
        </a>

        {/* Right - Dark Grey Text Box (1/4 width) */}
        <div className="md:col-span-1 bg-[#333333] p-8 lg:p-12 flex flex-col justify-center h-auto md:h-[500px] min-h-[250px]">
          <p className="text-[#D0D0D0] text-lg font-light leading-relaxed mb-6">
            From the very beginning our practice was founded on a philosophy of innovation, sustainability and design. We continue to learn from the past and creatively embrace the challenges of the future, with a firm belief that good design makes a difference.
          </p>
          <p className="text-[#D0D0D0] text-xl font-light">
            Kote Kwema
          </p>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
};

export default Architecture;


