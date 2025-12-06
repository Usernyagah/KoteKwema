import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-architecture.jpg";

const News = () => {
  return (
    <div className="bg-[#1A1A1A]">
      <div className="pt-20 pb-8">
        <div className="pl-6 lg:pl-12 pr-6 lg:pr-12">
          <div className="mb-8">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
              News
            </h2>
            <p className="text-lg text-white font-bold w-full">
              Stay informed about our latest projects, industry insights, awards, and firm announcements. Explore thought leadership articles on architectural trends, sustainable design, and the future of urban development in Kenya and beyond.
            </p>
          </div>
          
          {/* News Categories */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-[#333333] p-6">
              <h3 className="text-lg font-bold mb-3 text-white">Firm Announcements</h3>
              <ul className="space-y-2 text-white font-bold text-sm">
                <li>• New project wins in sustainable residential sector</li>
                <li>• Partnership with leading engineering firm</li>
                <li>• Expansion of Nairobi studio team</li>
              </ul>
            </div>
            <div className="bg-[#333333] p-6">
              <h3 className="text-lg font-bold mb-3 text-white">Awards & Recognition</h3>
              <ul className="space-y-2 text-white font-bold text-sm">
                <li>• LEED Excellence Award 2024</li>
                <li>• Best Sustainable Design - Kenya Architecture Awards</li>
                <li>• Featured in Architectural Digest East Africa</li>
              </ul>
            </div>
            <div className="bg-[#333333] p-6">
              <h3 className="text-lg font-bold mb-3 text-white">Industry Insights</h3>
              <ul className="space-y-2 text-white font-bold text-sm">
                <li>• The Future of Green Building in Kenya</li>
                <li>• Urban Planning Trends in East Africa</li>
                <li>• Sustainable Materials in Modern Architecture</li>
              </ul>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Left - Large Image with "Latest news" overlay (3/4 width) */}
        <div className="md:col-span-3 space-y-4">
          <Link to="/news/press" className="relative h-[300px] md:h-[450px] block group cursor-pointer mb-4">
            <img
              src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1200&h=800&fit=crop&q=80"
              alt="Latest news"
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute bottom-0 left-0 p-6">
              <span className="text-xs text-white font-bold mb-2 block">Press Coverage</span>
              <span className="text-white text-xl font-bold block">Kote Kwema Featured in International Architecture Magazine</span>
            </div>
          </Link>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#333333] p-6">
              <h4 className="text-lg font-bold mb-2 text-white">Events & Speaking</h4>
              <p className="text-white text-sm font-bold mb-2">Upcoming: Sustainable Architecture Conference, Nairobi - March 2024</p>
              <p className="text-white text-sm font-bold">Our team will present on innovative green building techniques.</p>
            </div>
            <div className="bg-[#333333] p-6">
              <h4 className="text-lg font-bold mb-2 text-white">Press Coverage</h4>
              <p className="text-white text-sm font-bold mb-2">Featured in: Architectural Review, Design Boom, Dezeen</p>
              <p className="text-white text-sm font-bold">Read about our latest projects and design philosophy.</p>
            </div>
          </div>
        </div>

        {/* Right - Subscription Form (1/4 width) */}
        <div className="md:col-span-1 bg-[#333333] p-8 lg:p-12 flex flex-col justify-center h-auto md:h-[450px] min-h-[250px]">
          <p className="text-[#D0D0D0] text-lg font-bold leading-relaxed mb-8">
            Stay up to date with the latest <span className="logo-font">KOTE KWEMA</span> projects and news.
          </p>
          <form className="space-y-4">
            <input
              type="email"
              placeholder="Email address..."
              className="w-full px-4 py-3 bg-[#1A1A1A] border border-[#404040] text-white placeholder-white/50 rounded-full focus:outline-none focus:border-white transition-colors duration-200 font-bold"
            />
            <button
              type="submit"
              className="w-full px-8 py-3 bg-[#D0D0D0] text-[#2A2A2A] rounded-full font-bold tracking-wide hover:bg-white transition-colors duration-200"
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


