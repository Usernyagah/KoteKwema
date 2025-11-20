import heroImage from "@/assets/hero-architecture.jpg";

const News = () => {
  return (
    <div className="bg-gray-800">
      <div className="pt-20 pb-8">
        <div className="pl-6 lg:pl-12 pr-6 lg:pr-12">
          <div className="mb-8">
            <h2 className="text-4xl md:text-5xl font-light tracking-tight text-white">
              News
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-0">
        {/* Left - Large Image with "Latest news" overlay (3/4 width) */}
        <div className="md:col-span-3 relative h-[400px] md:h-[600px]">
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
        <div className="md:col-span-1 bg-gray-700 p-8 lg:p-12 flex flex-col justify-center h-auto md:h-[600px] min-h-[300px]">
          <p className="text-white text-lg font-light leading-relaxed mb-8">
            Stay up to date with the latest Kote Kwema projects and news.
          </p>
          <form className="space-y-4">
            <input
              type="email"
              placeholder="Email address..."
              className="w-full px-4 py-3 bg-gray-800 border border-gray-600 text-white placeholder-gray-400 rounded focus:outline-none focus:border-gray-500 transition-colors duration-200"
            />
            <button
              type="submit"
              className="w-full px-8 py-3 bg-white text-gray-800 rounded font-light tracking-wide hover:bg-gray-100 transition-colors duration-200"
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


