import { useState } from "react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-architecture.jpg";
import { toast } from "@/hooks/use-toast";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

const News = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Save to Firebase if configured
      if (db) {
        try {
          // Check if email already exists
          const q = query(collection(db, "emailSubscriptions"), where("email", "==", email));
          const querySnapshot = await getDocs(q);

          if (!querySnapshot.empty) {
            toast({
              title: "Already subscribed",
              description: "This email is already subscribed to our newsletter.",
            });
            setEmail("");
            setIsSubmitting(false);
            return;
          }

          // Save to Firebase
          await addDoc(collection(db, "emailSubscriptions"), {
            email,
            subscribedAt: new Date(),
          });
        } catch (firebaseError) {
          console.warn("Firebase save failed, continuing with Formspree:", firebaseError);
        }
      }

      // Also send to Formspree (optional, for email notifications)
      const response = await fetch("https://formspree.io/f/mnnebzqo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          _subject: "Newsletter Subscription - Kote Kwema",
          _format: "plain",
        }),
      });

      if (response.ok) {
        toast({
          title: "Success!",
          description: "Thank you for subscribing to our newsletter.",
        });
        setEmail("");
      } else {
        toast({
          title: "Error",
          description: "Something went wrong. Please try again later.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#1A1A1A]">
      <div className="pt-12 pb-4">
        <div className="pl-6 lg:pl-12 pr-6 lg:pr-12">
          {/* Heading - Visible on mobile, Description - Hidden on mobile */}
          <div className="mb-4 md:mb-8">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
              News
            </h2>
            <p className="text-lg text-white font-bold w-full hidden md:block">
              Stay informed about our latest projects, industry insights, awards, and firm announcements. Explore thought leadership articles on architectural trends, sustainable design, and the future of urban development in Kenya and beyond.
              <br /><br />
              <strong>Firm Announcements:</strong> New project wins, strategic partnerships, and team expansion updates.
              <br /><br />
              <strong>Awards & Recognition:</strong> Recognition for excellence in sustainable design and architectural innovation from industry organizations and publications.
              <br /><br />
              <strong>Industry Insights:</strong> Articles and perspectives on green building, urban planning trends, and sustainable materials in modern architecture.
              <br /><br />
              <strong>Events & Speaking:</strong> Upcoming conferences and speaking engagements where our team shares insights on innovative green building techniques and sustainable design.
              <br /><br />
              <strong>Press Coverage:</strong> Featured in leading architecture and design publications. Read about our latest projects and design philosophy.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Left - Large Image with "Latest news" overlay (3/4 width) */}
        <div className="col-span-1 md:col-span-3 space-y-4">
          <Link to="/news/announcements" className="relative h-[200px] md:h-[450px] block group cursor-pointer mb-4">
            <img
              src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1200&h=800&fit=crop&q=80"
              alt="Latest news"
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="hidden md:block absolute bottom-0 left-0 p-6">
              <span className="text-white text-xl font-bold block">Latest News and Updates</span>
            </div>
          </Link>
        </div>

        {/* Right - Subscription Form (1/4 width) */}
        <div className="col-span-1 md:col-span-1 bg-[#333333] p-3 md:p-8 lg:p-12 flex flex-col justify-center h-auto md:h-[450px] min-h-[200px] md:min-h-[250px]">
          <p className="text-[#D0D0D0] text-xs md:text-lg font-bold leading-relaxed mb-4 md:mb-8">
            Stay up to date with the latest <span className="logo-font">KOTE KWEMA</span> projects and news.
          </p>
          <form onSubmit={handleSubmit} className="space-y-2 md:space-y-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address..."
              required
              disabled={isSubmitting}
              className="w-full px-3 md:px-4 py-2 md:py-3 text-xs md:text-base bg-[#1A1A1A] border border-[#404040] text-white placeholder-white/50 rounded-full focus:outline-none focus:border-white transition-colors duration-200 font-bold disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-4 md:px-8 py-2 md:py-3 text-xs md:text-base bg-[#D0D0D0] text-[#2A2A2A] rounded-full font-bold tracking-wide hover:bg-white transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Subscribing..." : "Subscribe"}
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

