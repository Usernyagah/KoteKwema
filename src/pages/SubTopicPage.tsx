import { useParams, useLocation } from "react-router-dom";
import { useEffect } from "react";
import SubTopicPageLayout from "@/components/SubTopicPageLayout";
import heroImage from "@/assets/hero-architecture.jpg";
import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";
import project4 from "@/assets/project-4.jpg";

const subtopicContent: Record<string, { 
  title: string; 
  breadcrumbs: string[]; 
  description: string;
  additionalContent?: string;
  sections?: Array<{ title: string; content: string }>;
}> = {
  // Expertise subtopics
  architecture: {
    title: "Architecture",
    breadcrumbs: ["Expertise", "Architecture"],
    description: "Architecture at Kote Kwema represents our core discipline, combining innovative design with sustainable practices to create buildings that respond to their context, serve their communities, and respect the environment.",
    additionalContent: "Our architectural approach integrates form, function, and sustainability. We design buildings that not only meet the functional needs of their occupants but also contribute positively to their surroundings. From residential homes to large-scale commercial developments, each project reflects our commitment to design excellence and environmental stewardship.",
    sections: [
      { title: "Design Philosophy", content: "We believe architecture should enhance human experience while respecting natural systems. Our designs respond to local climate, culture, and context, creating buildings that are both timeless and forward-thinking." },
      { title: "Services", content: "Comprehensive architectural services including conceptual design, detailed design development, construction documentation, and project management. We work across residential, commercial, cultural, and institutional sectors." }
    ]
  },
  climate: {
    title: "Climate and Sustainable Design",
    breadcrumbs: ["Expertise", "Climate and Sustainable Design"],
    description: "Our commitment to sustainable design drives every project. We integrate environmental responsibility with innovative solutions to create buildings that minimize impact while maximizing performance and occupant well-being.",
    additionalContent: "Sustainability is not an add-on but a fundamental principle in our design process. We employ passive design strategies, renewable energy systems, and sustainable materials to create buildings that reduce carbon footprint while providing exceptional comfort and performance.",
    sections: [
      { title: "Sustainable Strategies", content: "We implement passive solar design, natural ventilation, rainwater harvesting, green roofs, and renewable energy systems. Our projects often achieve LEED certification and exceed local environmental standards." },
      { title: "Material Selection", content: "We prioritize locally sourced, renewable, and low-impact materials. Our material research ensures durability, recyclability, and minimal environmental impact throughout the building lifecycle." }
    ]
  },
  engineering: {
    title: "Engineering",
    breadcrumbs: ["Expertise", "Engineering"],
    description: "Our engineering expertise ensures structural integrity, building performance, and technical excellence across all project types, from residential to large-scale commercial developments.",
    additionalContent: "Our engineering team provides comprehensive structural, mechanical, electrical, and plumbing design services. We integrate engineering solutions seamlessly with architectural design to create buildings that are safe, efficient, and sustainable.",
    sections: [
      { title: "Structural Engineering", content: "We design robust structural systems that optimize material use while ensuring safety and durability. Our expertise includes seismic design, foundation engineering, and advanced structural analysis." },
      { title: "Building Systems", content: "MEP (Mechanical, Electrical, Plumbing) design that maximizes energy efficiency and occupant comfort. We integrate smart building systems and automation for optimal performance." }
    ]
  },
  industrial: {
    title: "Industrial Design",
    breadcrumbs: ["Expertise", "Industrial Design"],
    description: "We design industrial facilities that balance operational efficiency with environmental responsibility, creating spaces that support manufacturing while respecting surrounding communities."
  },
  interiors: {
    title: "Interiors",
    breadcrumbs: ["Expertise", "Interiors"],
    description: "Our interior design approach creates spaces that enhance human experience, combining functionality with aesthetic excellence to deliver environments that inspire and support their occupants.",
    additionalContent: "We design interiors that reflect the architectural vision while addressing the specific needs of occupants. Our interior spaces balance aesthetics, functionality, and sustainability, creating environments that promote well-being and productivity.",
    sections: [
      { title: "Design Approach", content: "Our interior design process considers spatial flow, natural light, acoustics, and materiality. We create cohesive environments that extend the architectural narrative into every detail." },
      { title: "Sustainable Interiors", content: "We specify eco-friendly materials, low-VOC finishes, and energy-efficient lighting. Our interior designs contribute to overall building performance and occupant health." }
    ]
  },
  technology: {
    title: "Technology and Research",
    breadcrumbs: ["Expertise", "Technology and Research"],
    description: "We leverage cutting-edge technology and continuous research to push the boundaries of architectural design, integrating BIM, advanced modeling, and innovative building systems.",
    additionalContent: "Technology is integral to our design and delivery process. We utilize Building Information Modeling (BIM), parametric design, virtual reality, and advanced simulation tools to optimize designs and enhance collaboration.",
    sections: [
      { title: "BIM & 3D Modeling", content: "We use advanced BIM software for integrated design, clash detection, and construction coordination. Our 3D models enable clients to visualize projects before construction begins." },
      { title: "Research & Innovation", content: "Our research initiatives explore emerging technologies, sustainable materials, and design methodologies. We collaborate with academic institutions and industry partners to advance architectural practice." }
    ]
  },
  urban: {
    title: "Urban and Landscape Design",
    breadcrumbs: ["Expertise", "Urban and Landscape Design"],
    description: "Our urban planning and landscape design work creates cohesive, sustainable communities that balance development with environmental preservation and cultural heritage.",
    additionalContent: "We design at multiple scales, from master planning entire districts to creating intimate landscape spaces. Our work connects buildings to their context, creating vibrant public realms and preserving natural systems.",
    sections: [
      { title: "Urban Planning", content: "Comprehensive master planning services including land use analysis, transportation planning, infrastructure design, and community engagement. We create sustainable, livable urban environments." },
      { title: "Landscape Architecture", content: "Landscape design that integrates native vegetation, stormwater management, and public spaces. Our landscapes enhance biodiversity while providing beautiful, functional outdoor environments." }
    ]
  },
  workplace: {
    title: "Workplace Consultancy",
    breadcrumbs: ["Expertise", "Workplace Consultancy"],
    description: "We help organizations optimize their workspace through strategic design, creating environments that enhance productivity, collaboration, and employee well-being.",
    additionalContent: "Our workplace consultancy services help organizations understand how space impacts performance. We analyze work patterns, conduct user research, and design flexible environments that support diverse work styles and evolving needs.",
    sections: [
      { title: "Workplace Strategy", content: "We analyze organizational needs, work patterns, and future requirements to develop workplace strategies. Our approach considers hybrid work, collaboration needs, and employee well-being." },
      { title: "Design Solutions", content: "Flexible workspace designs that accommodate various work modes—focused work, collaboration, meetings, and social interaction. We create environments that attract and retain talent." }
    ]
  },
  // Projects subtopics
  residential: {
    title: "Residential Projects",
    breadcrumbs: ["Projects", "Residential"],
    description: "Our residential projects showcase sustainable design that harmonizes with nature, creating homes that are both beautiful and environmentally responsible.",
    additionalContent: "From single-family homes to multi-unit developments, our residential projects prioritize comfort, sustainability, and connection to nature. We design homes that respond to local climate and context while providing modern amenities and exceptional quality.",
    sections: [
      { title: "Single-Family Homes", content: "Custom-designed homes that reflect client lifestyle and site characteristics. Our residential designs integrate passive solar design, natural materials, and indoor-outdoor connections." },
      { title: "Multi-Unit Developments", content: "Sustainable residential communities that balance density with quality of life. We design developments that create community while respecting privacy and natural systems." }
    ]
  },
  commercial: {
    title: "Commercial Projects",
    breadcrumbs: ["Projects", "Commercial"],
    description: "Modern commercial spaces designed for efficiency, sustainability, and long-term value, from office buildings to retail developments.",
    additionalContent: "Our commercial projects create value for clients and communities. We design office buildings, retail centers, and mixed-use developments that are efficient, sustainable, and adaptable to changing market conditions.",
    sections: [
      { title: "Office Buildings", content: "Modern office buildings that attract tenants and support productivity. Our designs incorporate flexible floor plans, abundant natural light, and sustainable systems." },
      { title: "Retail & Mixed-Use", content: "Vibrant retail and mixed-use developments that activate streets and create community gathering spaces. We design for both commercial success and public benefit." }
    ]
  },
  cultural: {
    title: "Cultural Projects",
    breadcrumbs: ["Projects", "Cultural"],
    description: "Cultural facilities that celebrate heritage while providing modern amenities, creating spaces that serve communities and preserve identity.",
    additionalContent: "Cultural buildings are places of meaning and memory. We design museums, galleries, performance spaces, and community centers that honor cultural heritage while providing contemporary facilities for education, celebration, and expression.",
    sections: [
      { title: "Museums & Galleries", content: "Spaces for exhibition, education, and cultural exchange. Our designs create appropriate environments for artifacts and artworks while facilitating visitor engagement." },
      { title: "Community Centers", content: "Multi-purpose facilities that serve as community hubs. We design flexible spaces that accommodate diverse activities and foster social connection." }
    ]
  },
  "mixed-use": {
    title: "Mixed-Use Projects",
    breadcrumbs: ["Projects", "Mixed-Use"],
    description: "Integrated developments that combine residential, commercial, and public spaces to create vibrant, sustainable urban communities."
  },
  "urban-planning": {
    title: "Urban Planning Projects",
    breadcrumbs: ["Projects", "Urban Planning"],
    description: "Comprehensive master planning and urban design projects that shape sustainable, livable communities for the future."
  },
  // Studio subtopics
  about: {
    title: "About",
    breadcrumbs: ["Studio", "About"],
    description: "Learn about Kote Kwema's history, mission, and vision for creating sustainable architecture that serves communities and respects the environment."
  },
  history: {
    title: "History & Philosophy",
    breadcrumbs: ["Studio", "History & Philosophy"],
    description: "Our journey from a Nairobi-based practice to a global studio, and the core principles that guide our work in sustainable architecture and design."
  },
  process: {
    title: "Work Process",
    breadcrumbs: ["Studio", "Work Process"],
    description: "Our collaborative design process from initial concept through construction, emphasizing sustainability, innovation, and client engagement at every stage."
  },
  studios: {
    title: "Global Studios",
    breadcrumbs: ["Studio", "Global Studios"],
    description: "With studios around the world, we bring local expertise and global perspective to every project, ensuring designs respond to unique contexts and communities."
  },
  awards: {
    title: "Awards & Recognition",
    breadcrumbs: ["Studio", "Awards & Recognition"],
    description: "Recognition for excellence in sustainable design, innovation, and architectural achievement from leading industry organizations and publications."
  },
  // People subtopics
  leadership: {
    title: "Leadership",
    breadcrumbs: ["People", "Leadership"],
    description: "Meet the leaders who guide Kote Kwema's vision and drive our commitment to sustainable architecture and design excellence."
  },
  architects: {
    title: "Architects",
    breadcrumbs: ["People", "Architects"],
    description: "Our team of talented architects brings diverse experience and creative vision to every project, from concept development to construction oversight."
  },
  designers: {
    title: "Designers",
    breadcrumbs: ["People", "Designers"],
    description: "Creative designers who transform ideas into reality, combining aesthetic sensibility with technical expertise to deliver exceptional spaces."
  },
  engineers: {
    title: "Engineers",
    breadcrumbs: ["People", "Engineers"],
    description: "Technical experts who ensure structural integrity, building performance, and sustainable systems integration across all our projects."
  },
  support: {
    title: "Support Team",
    breadcrumbs: ["People", "Support Team"],
    description: "The dedicated professionals who support our design teams and ensure smooth project delivery from start to finish."
  },
  // News subtopics
  announcements: {
    title: "Firm Announcements",
    breadcrumbs: ["News", "Firm Announcements"],
    description: "Latest news about new project wins, team expansion, partnerships, and other important firm developments."
  },
  "news-awards": {
    title: "Awards & Recognition",
    breadcrumbs: ["News", "Awards & Recognition"],
    description: "Recent awards, honors, and recognition received by Kote Kwema for excellence in sustainable architecture and design."
  },
  "news-insights": {
    title: "Industry Insights",
    breadcrumbs: ["News", "Industry Insights"],
    description: "Thought leadership articles on architectural trends, sustainable design practices, and the future of urban development."
  },
  press: {
    title: "Press Coverage",
    breadcrumbs: ["News", "Press Coverage"],
    description: "Media coverage and features about Kote Kwema's projects, design philosophy, and contributions to sustainable architecture."
  },
  events: {
    title: "Events & Speaking",
    breadcrumbs: ["News", "Events & Speaking"],
    description: "Upcoming conferences, speaking engagements, workshops, and public events featuring Kote Kwema team members."
  },
  // Insights subtopics
  trends: {
    title: "Design Trends",
    breadcrumbs: ["Insights", "Design Trends"],
    description: "Analysis of emerging trends in architecture, interior design, and urban planning shaping the future of the built environment."
  },
  sustainability: {
    title: "Sustainability",
    breadcrumbs: ["Insights", "Sustainability"],
    description: "Deep dives into sustainable design practices, green building technologies, and environmental strategies for modern architecture."
  },
  "insights-urban": {
    title: "Urban Development",
    breadcrumbs: ["Insights", "Urban Development"],
    description: "Explorations of urban planning strategies, smart city concepts, and approaches to creating sustainable, livable communities."
  },
  "insights-technology": {
    title: "Technology",
    breadcrumbs: ["Insights", "Technology"],
    description: "How emerging technologies are transforming architecture, from BIM and 3D modeling to smart building systems and AI-assisted design."
  },
  "case-studies": {
    title: "Case Studies",
    breadcrumbs: ["Insights", "Case Studies"],
    description: "Detailed examinations of completed projects, exploring design challenges, solutions, and outcomes that inform future work."
  },
  // Careers subtopics
  positions: {
    title: "Open Positions",
    breadcrumbs: ["Careers", "Open Positions"],
    description: "Current job openings across our global studios. Explore opportunities to join our team of passionate architects, designers, and engineers.",
    additionalContent: "We're always looking for talented individuals who share our passion for sustainable design and architectural excellence. Join a team that values creativity, collaboration, and making a positive impact through architecture.",
    sections: [
      { title: "Current Openings", content: "Senior Architect - Nairobi: Lead design teams on large-scale commercial and residential projects. Minimum 8 years experience, proficiency in Revit and BIM required. Sustainable Design Specialist: Focus on environmental design, LEED certification, and sustainable building practices. Urban Planner: Work on master planning and urban design projects. Experience with GIS and urban design software essential." },
      { title: "How to Apply", content: "Submit your cover letter, resume, and portfolio (max 10 pages, PDF format under 10MB) to careers@kotekwema.com with the position title in the subject line." }
    ]
  },
  life: {
    title: "Life at Kote Kwema",
    breadcrumbs: ["Careers", "Life at Kote Kwema"],
    description: "Discover what it's like to work at Kote Kwema, from our collaborative culture to professional development opportunities and work-life balance."
  },
  application: {
    title: "Application Process",
    breadcrumbs: ["Careers", "Application Process"],
    description: "Learn how to apply for positions at Kote Kwema, including required materials, portfolio guidelines, and what to expect during the hiring process."
  },
  benefits: {
    title: "Benefits",
    breadcrumbs: ["Careers", "Benefits"],
    description: "Comprehensive benefits package including health insurance, professional development opportunities, competitive compensation, and more.",
    additionalContent: "We invest in our team's well-being and professional growth. Our benefits package reflects our commitment to creating a supportive work environment where employees can thrive both personally and professionally.",
    sections: [
      { title: "Health & Wellness", content: "Comprehensive health insurance, dental and vision coverage, wellness programs, and mental health support. We prioritize employee well-being." },
      { title: "Professional Development", content: "Continuing education opportunities, conference attendance, mentorship programs, and support for professional licensure. We invest in your career growth." },
      { title: "Work-Life Balance", content: "Flexible work arrangements, generous vacation time, and family-friendly policies. We believe sustainable careers require sustainable work practices." }
    ]
  },
  testimonials: {
    title: "Employee Testimonials",
    breadcrumbs: ["Careers", "Employee Testimonials"],
    description: "Hear from current team members about their experiences working at Kote Kwema and what makes our studio a great place to build a career."
  },
  // Contact subtopics
  nairobi: {
    title: "Nairobi Office",
    breadcrumbs: ["Contact", "Nairobi Office"],
    description: "Visit our flagship studio in Nairobi, Kenya. Contact information, office location, and directions to our Westlands office."
  },
  consultation: {
    title: "Request Consultation",
    breadcrumbs: ["Contact", "Request Consultation"],
    description: "Schedule a consultation to discuss your architectural project. Our team will help you explore design possibilities and project feasibility."
  },
  inquiry: {
    title: "General Inquiry",
    breadcrumbs: ["Contact", "General Inquiry"],
    description: "Have a question about our services, projects, or firm? Reach out through our general inquiry form and we'll get back to you promptly."
  },
  project: {
    title: "Project Inquiry",
    breadcrumbs: ["Contact", "Project Inquiry"],
    description: "Interested in working with Kote Kwema on your next project? Submit a project inquiry with details about your vision and requirements."
  },
  media: {
    title: "Media Contact",
    breadcrumbs: ["Contact", "Media Contact"],
    description: "Media professionals and journalists can reach our communications team for press inquiries, interviews, and project information."
  },
};

const SubTopicPage = () => {
  const { subtopic } = useParams<{ subtopic: string }>();
  const location = useLocation();
  const pathParts = location.pathname.split('/').filter(Boolean);
  const category = pathParts[0] || "";
  
  // Scroll to top when component mounts or route changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  
  const key = subtopic || "";
  const content = subtopicContent[key] || {
    title: subtopic?.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase()) || "Page",
    breadcrumbs: [category?.charAt(0).toUpperCase() + category?.slice(1) || "", subtopic?.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase()) || ""],
    description: "Explore our work and expertise in this area."
  };

  return (
    <SubTopicPageLayout
      title={content.title}
      breadcrumbs={content.breadcrumbs}
      image={heroImage}
    >
      <div className="pl-6 lg:pl-12 pr-6 lg:pr-12 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg max-w-none mb-12">
            <p className="text-lg md:text-xl text-[#1A1A1A] font-light leading-relaxed mb-8">
              {content.description}
            </p>
            {content.additionalContent && (
              <p className="text-lg md:text-xl text-[#1A1A1A] font-light leading-relaxed mb-8">
                {content.additionalContent}
              </p>
            )}
            
            {/* Sections */}
            {content.sections && content.sections.length > 0 && (
              <div className="space-y-8 mt-12">
                {content.sections.map((section, index) => (
                  <div key={index} className="border-l-2 border-[#E5E5E5] pl-6">
                    <h3 className="text-2xl font-light text-black mb-4">{section.title}</h3>
                    <p className="text-base text-[#4A4A4A] font-light leading-relaxed">
                      {section.content}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Project Grid - Only show for project-related pages */}
          {(category === "projects" || category === "expertise") && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
              <div className="text-center">
                <img
                  src={project1}
                  alt={content.title}
                  className="w-full h-[300px] object-cover mb-4 mx-auto"
                />
                <h3 className="text-xl font-light text-black mb-2">Featured Project</h3>
                <p className="text-sm text-[#4A4A4A] font-light">
                  Exemplary work showcasing our expertise in this area
                </p>
              </div>
              <div className="text-center">
                <img
                  src={project2}
                  alt={content.title}
                  className="w-full h-[300px] object-cover mb-4 mx-auto"
                />
                <h3 className="text-xl font-light text-black mb-2">Innovation</h3>
                <p className="text-sm text-[#4A4A4A] font-light">
                  Cutting-edge solutions and creative approaches
                </p>
              </div>
              <div className="text-center">
                <img
                  src={project3}
                  alt={content.title}
                  className="w-full h-[300px] object-cover mb-4 mx-auto"
                />
                <h3 className="text-xl font-light text-black mb-2">Sustainability</h3>
                <p className="text-sm text-[#4A4A4A] font-light">
                  Environmental responsibility in every project
                </p>
              </div>
              <div className="text-center">
                <img
                  src={project4}
                  alt={content.title}
                  className="w-full h-[300px] object-cover mb-4 mx-auto"
                />
                <h3 className="text-xl font-light text-black mb-2">Excellence</h3>
                <p className="text-sm text-[#4A4A4A] font-light">
                  Uncompromising quality and attention to detail
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </SubTopicPageLayout>
  );
};

export default SubTopicPage;

