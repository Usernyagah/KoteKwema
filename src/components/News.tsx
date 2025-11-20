import heroImage from "@/assets/hero-architecture.jpg";

const News = () => {
  return (
    <div className="bg-[#1A1A1A]">
      <div className="pt-20 pb-8">
        <div className="pl-6 lg:pl-12 pr-6 lg:pr-12">
          <div className="mb-8">
            <h2 className="text-4xl md:text-5xl font-light tracking-tight text-[#D0D0D0]">
              News
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Left - Large Image with "Latest news" overlay (3/4 width) */}
        <div className="md:col-span-3 relative h-[300px] md:h-[450px]">
          <img
            src={heroImage}
            alt="Latest news"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 p-6">
            <span className="text-white text-xl font-light">Latest news</span>
          </div>
        </div>

        {/* Right - Subscription Form (1/4 width) */}
        <div className="md:col-span-1 bg-[#333333] p-8 lg:p-12 flex flex-col justify-center h-auto md:h-[450px] min-h-[250px]">
          <p className="text-[#D0D0D0] text-lg font-light leading-relaxed mb-8">
            Stay up to date with the latest Kote Kwema projects and news.
          </p>
          <form className="space-y-4">
            <input
              type="email"
              placeholder="Email address..."
              className="w-full px-4 py-3 bg-[#1A1A1A] border border-[#404040] text-[#D0D0D0] placeholder-[#808080] rounded focus:outline-none focus:border-[#D0D0D0] transition-colors duration-200"
            />
            <button
              type="submit"
              className="w-full px-8 py-3 bg-[#D0D0D0] text-[#2A2A2A] rounded font-light tracking-wide hover:bg-white transition-colors duration-200"
            >
              Subscribe
            </button>
          </form>
        </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default News;


