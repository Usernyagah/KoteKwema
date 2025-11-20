import heroImage from "@/assets/hero-architecture.jpg";

const Architecture = () => {
  return (
    <section id="architecture" className="bg-gray-800">
      <div className="pt-20 pb-8">
        <div className="pl-6 lg:pl-12 pr-6 lg:pr-12">
          <div className="mb-8">
            <h2 className="text-4xl md:text-5xl font-light tracking-tight text-white">
              Architecture
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-0">
        {/* Left - Large Image with "Architecture" overlay (3/4 width) */}
        <div className="md:col-span-3 relative h-[400px] md:h-[700px]">
          <img
            src={heroImage}
            alt="Architecture"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 p-6">
            <span className="text-white text-2xl font-light">Architecture</span>
          </div>
        </div>

        {/* Right - Dark Grey Text Box (1/4 width) */}
        <div className="md:col-span-1 bg-gray-800 p-8 lg:p-12 flex flex-col justify-center h-auto md:h-[700px] min-h-[300px]">
          <p className="text-white text-lg font-light leading-relaxed mb-6">
            From the very beginning our practice was founded on a philosophy of innovation, sustainability and design. We continue to learn from the past and creatively embrace the challenges of the future, with a firm belief that good design makes a difference.
          </p>
          <p className="text-white text-xl font-light">
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


