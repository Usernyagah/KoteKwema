import { useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import SubTopicPageLayout from "@/components/SubTopicPageLayout";
import { Card, CardContent } from "@/components/ui/card";
import ContactForm from "@/components/ContactForm";
import StructuredData from "@/components/StructuredData";
import PropertiesList from "@/components/PropertiesList";
import ProjectsFilter from "@/components/ProjectsFilter";
import { useSEO } from "@/hooks/useSEO";
import { trackPageView } from "@/utils/analytics";
import heroImage from "@/assets/hero-architecture.jpg";
import koteKwemaImage from "@/assets/kote kwema.jpg";
import bonfaceAgeroImage from "@/assets/unnamed.jpg";
import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";
import project4 from "@/assets/project-4.jpg";

interface Person {
  name: string;
  role: string;
  bio: string;
  image: string;
}

interface ArchitectureCard {
  title: string;
  content: string;
  image?: string;
}

const subtopicContent: Record<string, {
  title: string;
  breadcrumbs: string[];
  description: string;
  additionalContent?: string;
  sections?: Array<{ title: string; content: string }>;
  people?: Person[];
  cards?: ArchitectureCard[];
}> = {
  // Expertise subtopics
  architecture: {
    title: "Architecture",
    breadcrumbs: ["Expertise", "Architecture"],
    description: "Architecture at Kote Kwema represents our core discipline, combining innovative design with sustainable practices to create buildings that respond to their context, serve their communities, and respect the environment.",
    additionalContent: "Our architectural approach integrates form, function, and sustainability. We design buildings that not only meet the functional needs of their occupants but also contribute positively to their surroundings. Each project reflects our commitment to design excellence and environmental stewardship.",
    cards: [
      {
        title: "Design Philosophy",
        content: "We believe architecture should enhance human experience while respecting natural systems. Our designs respond to local climate, culture, and context, creating buildings that are both timeless and forward-thinking.",
        image: project1
      },
      {
        title: "Services",
        content: "Architectural services including conceptual design, design development, construction documentation, and project management. We work on residential, commercial, and cultural projects.",
        image: project2
      }
    ]
  },
  climate: {
    title: "Climate and Sustainable Design",
    breadcrumbs: ["Expertise", "Climate and Sustainable Design"],
    description: "Our commitment to sustainable design drives every project. We integrate environmental responsibility with innovative solutions to create buildings that minimize impact while maximizing performance and occupant well-being.",
    additionalContent: "Sustainability is not an add-on but a fundamental principle in our design process. We employ passive design strategies, renewable energy systems, and sustainable materials to create buildings that reduce carbon footprint while providing exceptional comfort and performance.",
    cards: [
      {
        title: "Sustainable Strategies",
        content: "We implement passive solar design, natural ventilation, rainwater harvesting, green roofs, and renewable energy systems. Our projects often achieve LEED certification and exceed local environmental standards.",
        image: project3
      },
      {
        title: "Material Selection",
        content: "We prioritize locally sourced, renewable, and low-impact materials. Our material research ensures durability, recyclability, and minimal environmental impact throughout the building lifecycle.",
        image: project4
      }
    ]
  },
  engineering: {
    title: "Engineering",
    breadcrumbs: ["Expertise", "Engineering"],
    description: "Our engineering expertise ensures structural integrity, building performance, and technical excellence across all project types. We provide structural, mechanical, electrical, and plumbing design services, integrating engineering solutions seamlessly with architectural design to create buildings that are safe, efficient, and sustainable.",
    cards: [
      {
        title: "Structural Engineering",
        content: "We design robust structural systems that optimize material use while ensuring safety and durability. Our expertise includes seismic design, foundation engineering, and advanced structural analysis.",
        image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1200&h=800&fit=crop&q=80"
      },
      {
        title: "Building Systems",
        content: "MEP (Mechanical, Electrical, Plumbing) design that maximizes energy efficiency and occupant comfort. We integrate smart building systems and automation for optimal performance.",
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=800&fit=crop&q=80"
      }
    ]
  },
  interiors: {
    title: "Interiors",
    breadcrumbs: ["Expertise", "Interiors"],
    description: "Our interior design approach creates spaces that enhance human experience, combining functionality with aesthetic excellence. We design interiors that reflect the architectural vision while addressing the specific needs of occupants, balancing aesthetics, functionality, and sustainability.",
    cards: [
      {
        title: "Design Approach",
        content: "Our interior design process considers spatial flow, natural light, acoustics, and materiality. We create cohesive environments that extend the architectural narrative into every detail.",
        image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&h=800&fit=crop&q=80"
      },
      {
        title: "Sustainable Interiors",
        content: "We specify eco-friendly materials, low-VOC finishes, and energy-efficient lighting. Our interior designs contribute to overall building performance and occupant health.",
        image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=1200&h=800&fit=crop&q=80"
      }
    ]
  },
  technology: {
    title: "Technology and Research",
    breadcrumbs: ["Expertise", "Technology and Research"],
    description: "We use modern technology to enhance our design process, integrating BIM and 3D modeling tools to create better architectural solutions.",
    additionalContent: "Technology is integral to our design process. We utilize Building Information Modeling (BIM) and 3D modeling tools to visualize and optimize our designs.",
    cards: [
      {
        title: "BIM & 3D Modeling",
        content: "We use advanced BIM software for integrated design, clash detection, and construction coordination. Our 3D models enable clients to visualize projects before construction begins.",
        image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=1200&h=800&fit=crop&q=80"
      },
      {
        title: "Innovation",
        content: "We explore emerging technologies and innovative building systems to push the boundaries of architectural design and delivery.",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=800&fit=crop&q=80"
      }
    ]
  },
  urban: {
    title: "Urban and Landscape Design",
    breadcrumbs: ["Expertise", "Urban and Landscape Design"],
    description: "Our urban planning and landscape design work creates cohesive, sustainable communities that balance development with environmental preservation and cultural heritage. We design at multiple scales, connecting buildings to their context and creating vibrant public realms.",
    cards: [
      {
        title: "Urban Planning",
        content: "Urban planning services including land use analysis, transportation planning, and community engagement. We create sustainable, livable urban environments.",
        image: "https://images.unsplash.com/photo-1514565131-fce0801e5785?w=1200&h=800&fit=crop&q=80"
      },
      {
        title: "Landscape Architecture",
        content: "Landscape design that integrates native vegetation, stormwater management, and public spaces. Our landscapes enhance biodiversity while providing beautiful, functional outdoor environments.",
        image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&h=800&fit=crop&q=80"
      }
    ]
  },
  // Projects subtopics
  all: {
    title: "Projects",
    breadcrumbs: ["Projects", "All"],
    description: "Explore our complete portfolio of architectural projects, from residential and commercial developments to cultural institutions and mixed-use spaces. Each project reflects our commitment to sustainable design, innovation, and creating spaces that serve communities while respecting the environment.",
  },
  residential: {
    title: "Residential Projects",
    breadcrumbs: ["Projects", "Residential"],
    description: "Our residential projects showcase sustainable design that harmonizes with nature, creating homes that are both beautiful and environmentally responsible. From single-family homes to multi-unit developments, we prioritize comfort, sustainability, and connection to nature.",
    cards: [
      {
        title: "Residential Design",
        content: "We design custom homes and residential developments that respond to local climate and context while providing modern amenities and exceptional quality. Our residential designs integrate passive solar design, natural materials, and indoor-outdoor connections.",
        image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&h=800&fit=crop&q=80"
      },
      {
        title: "Sustainable Homes",
        content: "Our residential projects prioritize sustainability and connection to nature. We create homes that reduce environmental impact while providing exceptional comfort and quality of life for residents.",
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=800&fit=crop&q=80"
      }
    ]
  },
  commercial: {
    title: "Commercial Projects",
    breadcrumbs: ["Projects", "Commercial"],
    description: "Modern commercial spaces designed for efficiency, sustainability, and long-term value. We design office buildings, retail centers, and mixed-use developments that are efficient, sustainable, and adaptable to changing market conditions.",
    cards: [
      {
        title: "Office Buildings",
        content: "Modern office buildings that attract tenants and support productivity. Our designs incorporate flexible floor plans, abundant natural light, and sustainable systems.",
        image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=800&fit=crop&q=80"
      },
      {
        title: "Retail & Mixed-Use",
        content: "Vibrant retail and mixed-use developments that activate streets and create community gathering spaces. We design for both commercial success and public benefit.",
        image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1200&h=800&fit=crop&q=80"
      }
    ]
  },
  cultural: {
    title: "Cultural Projects",
    breadcrumbs: ["Projects", "Cultural"],
    description: "Cultural facilities that celebrate heritage while providing modern amenities. We design museums, galleries, performance spaces, and community centers that honor cultural heritage while providing contemporary facilities for education, celebration, and expression.",
    cards: [
      {
        title: "Museums & Galleries",
        content: "Spaces for exhibition, education, and cultural exchange. Our designs create appropriate environments for artifacts and artworks while facilitating visitor engagement.",
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=800&fit=crop&q=80"
      },
      {
        title: "Community Centers",
        content: "Multi-purpose facilities that serve as community hubs. We design flexible spaces that accommodate diverse activities and foster social connection.",
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=800&fit=crop&q=80"
      }
    ]
  },
  "mixed-use": {
    title: "Mixed-Use Projects",
    breadcrumbs: ["Projects", "Mixed-Use"],
    description: "Integrated developments that combine residential, commercial, and public spaces to create vibrant, sustainable urban communities.",
    cards: [
      {
        title: "Mixed-Use Development",
        content: "Integrated developments that combine residential, commercial, and public spaces. We create vibrant, sustainable urban communities that balance different uses while creating cohesive neighborhoods.",
        image: "https://images.unsplash.com/photo-1514565131-fce0801e5785?w=1200&h=800&fit=crop&q=80"
      },
      {
        title: "Urban Integration",
        content: "Our mixed-use projects seamlessly integrate different functions, creating dynamic environments that serve diverse needs while contributing to sustainable urban development.",
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=800&fit=crop&q=80"
      }
    ]
  },
  // Studio subtopics
  about: {
    title: "About",
    breadcrumbs: ["Studio", "About"],
    description: "Learn about Kote Kwema's history, mission, and vision for creating sustainable architecture that serves communities and respects the environment.",
    additionalContent: "Kote Kwema is a Nairobi-based architecture practice founded with a vision to create architecture that harmonizes with nature while meeting the evolving needs of communities. We craft sustainable architecture, urban landscapes, and engineering solutions where innovation meets environmental stewardship.",
    sections: [
      {
        title: "Our Mission",
        content: "Our philosophy centers on the belief that architecture should serve both people and the planet. We approach each project with deep respect for local context, cultural heritage, and environmental sustainability, creating spaces that inspire and endure. We believe that good design makes a difference and that sustainable architecture can transform communities."
      },
      {
        title: "Our Approach",
        content: "As a small but dedicated studio, we bring together diverse perspectives and expertise to deliver innovative design solutions. We work closely with clients, communities, and stakeholders to understand their needs and create buildings that respond to their unique context. Our collaborative process ensures that every project reflects our core values of innovation, sustainability, and design excellence."
      },
      {
        title: "Connect With Us",
        content: "Follow our work and stay updated on our latest projects and insights. Connect with us on X (Twitter) @KoteKwema to see our design process, completed projects, and thoughts on sustainable architecture in Kenya and beyond."
      }
    ]
  },
  history: {
    title: "History & Philosophy",
    breadcrumbs: ["Studio", "History & Philosophy"],
    description: "Our journey as a Nairobi-based practice and the core principles that guide our work in sustainable architecture and design.",
    additionalContent: "Kote Kwema was established with a clear vision: to create architecture that serves communities while respecting the environment. From our beginnings in Nairobi, we have remained committed to sustainable design principles and innovative solutions that respond to local context and cultural heritage.",
    sections: [
      {
        title: "Our Foundation",
        content: "Founded on principles of innovation, sustainability, and design excellence, Kote Kwema has grown from a small practice to a recognized name in sustainable architecture in Kenya. Our journey reflects our commitment to learning from the past while creatively embracing the challenges of the future."
      },
      {
        title: "Design Philosophy",
        content: "We believe that good design makes a difference. Our philosophy centers on creating buildings that enhance human experience while respecting natural systems. Every project begins with understanding the local context, climate, culture, and community needs. We design buildings that are both timeless and forward-thinking, creating spaces that inspire and endure."
      },
      {
        title: "Core Values",
        content: "Sustainability is not an add-on but a fundamental principle in our design process. We integrate environmental responsibility with innovative solutions, ensuring that every project minimizes impact while maximizing performance and occupant well-being. Our commitment to design excellence means we never compromise on quality, detail, or the user experience."
      }
    ]
  },
  process: {
    title: "Work Process",
    breadcrumbs: ["Studio", "Work Process"],
    description: "Our collaborative design process from initial concept through construction, emphasizing sustainability, innovation, and client engagement at every stage.",
    additionalContent: "We begin with deep research into site context, client needs, and environmental factors, then develop design solutions through iterative refinement. We utilize advanced design tools including Revit, AutoCAD, and 3D modeling to visualize and optimize our designs.",
    sections: [
      {
        title: "Discovery & Research",
        content: "Every project starts with comprehensive research. We analyze site conditions, local climate, building codes, cultural context, and client requirements. This foundation ensures our designs are informed, responsive, and appropriate for their specific context."
      },
      {
        title: "Design Development",
        content: "Through collaborative workshops and iterative design sessions, we develop concepts that balance aesthetic vision with practical requirements. We work closely with clients to refine designs, ensuring the final solution meets their needs while exceeding expectations."
      },
      {
        title: "Technical Design & Documentation",
        content: "Our technical design phase transforms concepts into buildable reality. We create detailed construction documents, coordinate with consultants, and ensure all aspects of the design are carefully considered. We use BIM technology to integrate all building systems and identify potential issues before construction begins."
      },
      {
        title: "Construction & Delivery",
        content: "During construction, we maintain close collaboration with contractors and consultants to ensure design intent is realized. We conduct regular site visits, respond to queries, and make necessary adjustments while maintaining the integrity of the design vision."
      }
    ]
  },
  studios: {
    title: "Our Studio",
    breadcrumbs: ["Studio", "Our Studio"],
    description: "Based in Nairobi, Kenya, our studio brings local expertise and deep understanding of the regional context to every project. We work from a single location, allowing us to maintain close relationships with clients and ensure designs respond to unique local needs and communities.",
    additionalContent: "Our Nairobi studio serves as the heart of our practice. Located in the vibrant capital city, we are deeply connected to the local architectural community, building industry, and cultural context. This connection allows us to create designs that are truly responsive to the needs of Kenyan communities.",
    sections: [
      {
        title: "Location & Context",
        content: "Nairobi's dynamic urban environment and rich cultural heritage inform our work. We understand the local climate, building materials, construction practices, and regulatory environment, enabling us to create designs that are both innovative and practical for the East African context."
      },
      {
        title: "Studio Culture",
        content: "As a small studio, we foster a collaborative and inclusive work environment. Every team member's contribution matters, and we value diverse perspectives and creative thinking. Our studio culture emphasizes continuous learning, professional growth, and a shared commitment to sustainable design."
      },
      {
        title: "Client Relationships",
        content: "Working from a single location allows us to build strong, lasting relationships with our clients. We maintain close communication throughout every project, ensuring clients are involved in the design process and satisfied with the final outcome. Our small size means clients work directly with the principals and senior team members."
      }
    ]
  },
  awards: {
    title: "Awards & Recognition",
    breadcrumbs: ["Studio", "Awards & Recognition"],
    description: "We are proud of the recognition we've received for our work in sustainable design and architectural innovation. While we focus on creating meaningful architecture rather than awards, we appreciate when our efforts are acknowledged by industry peers and organizations.",
    additionalContent: "Recognition for our work validates our commitment to design excellence and sustainable practices. These acknowledgments inspire us to continue pushing boundaries and creating architecture that makes a positive impact on communities and the environment.",
    sections: [
      {
        title: "Our Approach to Recognition",
        content: "While awards are not our primary motivation, we value the recognition that comes from creating exceptional architecture. Each acknowledgment represents our commitment to sustainable design, innovation, and serving our clients and communities with excellence."
      },
      {
        title: "Industry Recognition",
        content: "Our work has been recognized by local and international organizations for excellence in sustainable design, architectural innovation, and community impact. These recognitions reflect our dedication to creating buildings that serve both people and the planet."
      },
      {
        title: "Looking Forward",
        content: "We continue to focus on creating meaningful architecture that serves communities and respects the environment. Recognition is a welcome byproduct of our commitment to excellence, but our true measure of success is the positive impact our buildings have on the people who use them and the communities they serve."
      }
    ]
  },
  // People subtopics
  leadership: {
    title: "Leadership",
    breadcrumbs: ["People", "Leadership"],
    description: "Meet the leaders who guide Kote Kwema's vision and drive our commitment to sustainable architecture and design excellence.",
    additionalContent: "Our leadership team brings decades of combined experience in architecture, design, and sustainable building practices. They guide our studio's strategic direction and ensure every project reflects our core values of innovation, sustainability, and design excellence.",
    people: [
      {
        name: "Architect Mwangi",
        role: "Principal Architect @KoteKwema",
        bio: "Architect Mwangi leads our design vision with extensive experience in sustainable architecture and innovative design solutions. With a deep commitment to creating buildings that serve communities and respect the environment, Architect Mwangi guides our team in delivering exceptional architectural projects that combine aesthetic excellence with environmental responsibility.",
        image: koteKwemaImage
      },
      {
        name: "Bonface Agero",
        role: "Operational Director, M.AAK, B.Arch",
        bio: "Bonface Agero brings extensive operational expertise and architectural knowledge to Kote Kwema. With qualifications including M.AAK and B.Arch, he oversees the firm's day-to-day operations, ensuring efficient project delivery and maintaining the highest standards of quality and professionalism across all our work.",
        image: bonfaceAgeroImage
      }
    ]
  },
  architects: {
    title: "Architects",
    breadcrumbs: ["People", "Architects"],
    description: "Our team of talented architects brings diverse experience and creative vision to every project, from concept development to construction oversight.",
    additionalContent: "Our architects combine technical expertise with creative vision to deliver exceptional design solutions. Each member of our team brings unique skills and perspectives, working collaboratively to create buildings that are both beautiful and functional.",
    people: [
      {
        name: "Architect Mwangi",
        role: "Principal Architect @KoteKwema",
        bio: "Architect Mwangi brings extensive experience in sustainable architecture and innovative design solutions. With a deep commitment to creating buildings that serve communities and respect the environment, Architect Mwangi leads our architectural team in delivering exceptional projects that combine aesthetic excellence with environmental responsibility.",
        image: koteKwemaImage
      }
    ]
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
  // Careers subtopics
  positions: {
    title: "Open Positions",
    breadcrumbs: ["Careers", "Open Positions"],
    description: "Current job openings at our studio. Explore opportunities to join our team of passionate architects, designers, and engineers.",
    additionalContent: "We're always looking for talented individuals who share our passion for sustainable design and architectural excellence. Join our small but dedicated team that values creativity, collaboration, and making a positive impact through architecture.",
    sections: [
      { title: "Current Openings", content: "We occasionally have openings for talented architects and designers. If you're passionate about sustainable design and would like to join our team, please reach out with your portfolio and resume." },
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
    description: "Benefits package including health insurance, professional development opportunities, and competitive compensation.",
    additionalContent: "We invest in our team's well-being and professional growth. Our benefits reflect our commitment to creating a supportive work environment.",
    sections: [
      { title: "Health & Wellness", content: "Health insurance and wellness support. We prioritize employee well-being." },
      { title: "Professional Development", content: "Continuing education opportunities, conference attendance, mentorship programs, and support for professional licensure. We invest in your career growth." },
      { title: "Work-Life Balance", content: "Flexible work arrangements, generous vacation time, and family-friendly policies. We believe sustainable careers require sustainable work practices." }
    ]
  },
  // Contact subtopics
  nairobi: {
    title: "Nairobi Office",
    breadcrumbs: ["Contact", "Nairobi Office"],
    description: "Visit our flagship studio in Nairobi, Kenya. Contact information, office location, and directions to our Westlands office.",
    additionalContent: "Our Nairobi studio is located in the heart of the city, easily accessible and designed to welcome clients, collaborators, and visitors. We're proud to call Nairobi home and are deeply connected to the local architectural community and building industry.",
    sections: [
      {
        title: "Office Location",
        content: "We are located in Westlands, Nairobi, in a space that reflects our commitment to sustainable design and collaborative work. Our studio is designed to facilitate creativity, client meetings, and team collaboration. Please contact us in advance to schedule a visit."
      },
      {
        title: "Contact Information",
        content: "Phone: +254 710 746 917 | Email: info@kotekwema.com | Address: Westlands, Nairobi, Kenya. For specific inquiries, please use our contact forms or reach out directly via email. We typically respond within 24-48 hours during business days."
      },
      {
        title: "Visiting Hours",
        content: "Our office is open Monday through Friday, 9:00 AM to 5:00 PM EAT. We recommend scheduling an appointment in advance to ensure someone is available to meet with you. For project consultations, we offer flexible scheduling including evening and weekend appointments when needed."
      },
      {
        title: "Getting Here",
        content: "Westlands is easily accessible by public transport, taxi, or private vehicle. We're located near major business districts and shopping centers. Parking is available on-site. For detailed directions, please contact us and we'll provide specific guidance based on your mode of transportation."
      }
    ]
  },
  consultation: {
    title: "Request Consultation",
    breadcrumbs: ["Contact", "Request Consultation"],
    description: "Schedule a consultation to discuss your architectural project. Our team will help you explore design possibilities and project feasibility.",
    additionalContent: "We offer initial consultations to discuss your project vision, understand your needs, and explore how Kote Kwema can help bring your ideas to life. Whether you're planning a new building, renovation, or exploring design possibilities, we're here to listen and provide expert guidance.",
    sections: [
      {
        title: "What to Expect",
        content: "During your consultation, we'll discuss your project goals, site conditions, budget considerations, timeline, and design preferences. This initial meeting helps us understand your vision and allows you to learn about our approach, process, and how we can help achieve your objectives."
      },
      {
        title: "Preparation",
        content: "To make the most of your consultation, please come prepared with any site information, preliminary ideas, budget range, and timeline considerations. If you have existing drawings, photos, or reference images, feel free to bring them along. The more information you can share, the more productive our discussion will be."
      },
      {
        title: "Consultation Types",
        content: "We offer various consultation formats: in-person meetings at our studio, site visits, virtual consultations via video call, or a combination. Initial consultations typically last 60-90 minutes. For complex projects, we may recommend a follow-up meeting to dive deeper into specific aspects."
      },
      {
        title: "Next Steps",
        content: "After your consultation, we'll provide a summary of our discussion and, if appropriate, a proposal for next steps. This may include preliminary design services, feasibility studies, or full architectural services depending on your project needs and stage of development."
      }
    ]
  },
  inquiry: {
    title: "General Inquiry",
    breadcrumbs: ["Contact", "General Inquiry"],
    description: "Have a question about our services, projects, or firm? Reach out through our general inquiry form and we'll get back to you promptly.",
    additionalContent: "We welcome questions about our work, design philosophy, services, or any aspect of our practice. Whether you're a potential client, student, collaborator, or simply interested in learning more about sustainable architecture, we're happy to connect.",
    sections: [
      {
        title: "What We Can Help With",
        content: "General inquiries can cover a wide range of topics: information about our services and expertise, questions about our design approach, requests for project examples or case studies, media inquiries, speaking opportunities, collaboration proposals, or general questions about sustainable architecture and design."
      },
      {
        title: "Response Time",
        content: "We aim to respond to all inquiries within 24-48 hours during business days. For urgent matters, please indicate this in your message and we'll prioritize accordingly. For detailed project inquiries, we may need additional time to provide comprehensive responses."
      },
      {
        title: "How to Reach Us",
        content: "You can reach us via email at info@kotekwema.com, through our contact form, or by phone. For specific types of inquiries (media, partnerships, etc.), please mention this in your message so we can direct it to the appropriate team member."
      },
      {
        title: "Follow-Up",
        content: "If your inquiry requires a more detailed response or follow-up discussion, we'll coordinate a time that works for both parties. We value meaningful conversations and are committed to providing helpful, thorough responses to all inquiries."
      }
    ]
  },
  project: {
    title: "Project Inquiry",
    breadcrumbs: ["Contact", "Project Inquiry"],
    description: "Interested in working with Kote Kwema on your next project? Submit a project inquiry with details about your vision and requirements.",
    additionalContent: "We're excited to learn about your project and explore how we can help bring your vision to reality. Whether you're planning a residential, commercial, cultural, or mixed-use development, we bring expertise in sustainable design, innovative solutions, and collaborative project delivery.",
    sections: [
      {
        title: "Project Information to Include",
        content: "When submitting a project inquiry, please include: project type and scope, site location and conditions, budget range, timeline and key milestones, design goals and priorities, sustainability objectives, and any specific requirements or constraints. The more information you can provide, the better we can assess how we can help."
      },
      {
        title: "Our Process",
        content: "After receiving your project inquiry, we'll review the information and schedule an initial consultation to discuss your project in detail. We'll assess project feasibility, discuss our approach, and provide a proposal outlining services, timeline, and fees. We believe in transparent communication and collaborative planning from the start."
      },
      {
        title: "Project Types",
        content: "We work on a variety of project types including residential (single-family, multi-family, affordable housing), commercial (offices, retail, hospitality), cultural and institutional buildings, mixed-use developments, renovations and adaptive reuse, and master planning. We're particularly interested in projects that prioritize sustainability and community impact."
      },
      {
        title: "Getting Started",
        content: "Submit your project inquiry through our contact form or email us directly at info@kotekwema.com with 'Project Inquiry' in the subject line. Include as much detail as possible about your project. We'll review your inquiry and get back to you within 2-3 business days to schedule a consultation and discuss next steps."
      }
    ]
  },
};

const SubTopicPage = () => {
  const { subtopic } = useParams<{ subtopic: string }>();
  const location = useLocation();
  const pathParts = location.pathname.split('/').filter(Boolean);
  const category = pathParts[0] || "";

  // Filter states for "all" projects page
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [filterLocation, setFilterLocation] = useState<string>("All locations");
  const [sortBy, setSortBy] = useState<string>("date-desc");
  const [totalCount, setTotalCount] = useState<number>(0);

  // Scroll to top when component mounts or route changes
  useEffect(() => {
    window.scrollTo(0, 0);
    // Reset filters when route changes
    if (category !== "projects" || subtopic !== "all") {
      setSearchQuery("");
      setFilterCategory("all");
      setFilterLocation("All locations");
      setSortBy("date-desc");
    }
  }, [location.pathname, category, subtopic]);

  const key = subtopic || "";
  const content = subtopicContent[key] || {
    title: subtopic?.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase()) || "Page",
    breadcrumbs: [category?.charAt(0).toUpperCase() + category?.slice(1) || "", subtopic?.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase()) || ""],
    description: "Explore our work and expertise in this area."
  };

  // SEO
  useSEO({
    title: content.title,
    description: content.description,
    url: `${window.location.origin}${location.pathname}`,
  });

  // Analytics tracking
  useEffect(() => {
    trackPageView(location.pathname, content.title);
  }, [location.pathname, content.title]);

  // Breadcrumb structured data
  const breadcrumbData = {
    itemListElement: content.breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb,
      item: index === 0
        ? 'https://kotekwema.com'
        : `https://kotekwema.com${location.pathname}`,
    })),
  };

  // Determine which pages should show images and which shouldn't
  const pagesWithImages = ["about", "history"];
  const shouldShowImage = pagesWithImages.includes(key);
  const pageImage = heroImage;

  return (
    <SubTopicPageLayout
      title={content.title}
      breadcrumbs={content.breadcrumbs}
      image={pageImage}
      hideImage={!shouldShowImage}
    >
      <div className="px-4 md:px-6 lg:px-12 py-12 md:py-16 lg:py-24">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg max-w-none mb-8 md:mb-12">
            <p className="text-base md:text-lg lg:text-xl text-[#1A1A1A] font-light leading-relaxed mb-6 md:mb-8">
              {content.description}
            </p>
            {content.additionalContent && (
              <p className="text-base md:text-lg lg:text-xl text-[#1A1A1A] font-light leading-relaxed mb-6 md:mb-8">
                {content.additionalContent}
              </p>
            )}

            {/* Sections */}
            {content.sections && content.sections.length > 0 && (
              <div className="space-y-6 md:space-y-8 mt-8 md:mt-12">
                {content.sections.map((section, index) => (
                  <div key={index} className="border-l-2 border-[#E5E5E5] pl-4 md:pl-6">
                    <h3 className="text-xl md:text-2xl font-light text-black mb-3 md:mb-4">{section.title}</h3>
                    <p className="text-sm md:text-base text-[#4A4A4A] font-light leading-relaxed">
                      {section.content}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* People Cards - For Leadership page */}
            {content.people && content.people.length > 0 && (
              <div className="mt-8 md:mt-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                  {content.people.map((person, index) => (
                    <Card key={index} className="overflow-hidden border border-[#E5E5E5] bg-white hover:shadow-lg transition-shadow duration-300">
                      <div className="aspect-[3/4] overflow-hidden">
                        <img
                          src={person.image}
                          alt={person.name}
                          className="w-full h-full object-cover"
                          style={{ objectPosition: 'center top' }}
                        />
                      </div>
                      <CardContent className="p-4 md:p-6 bg-white">
                        <h3 className="text-lg md:text-xl font-semibold text-[#1A1A1A] mb-2">{person.name}</h3>
                        <p className="text-xs md:text-sm text-[#666666] font-medium mb-3 md:mb-4">{person.role}</p>
                        <p className="text-xs md:text-sm text-[#4A4A4A] font-light leading-relaxed">{person.bio}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Architecture Cards - For Architecture page */}
            {content.cards && content.cards.length > 0 && (
              <div className="mt-8 md:mt-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  {content.cards.map((card, index) => (
                    <Card key={index} className="overflow-hidden border border-[#E5E5E5] bg-white hover:shadow-lg transition-shadow duration-300">
                      {card.image && (
                        <div className="aspect-[16/9] overflow-hidden">
                          <img
                            src={card.image}
                            alt={card.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <CardContent className="p-4 md:p-6 bg-white">
                        <h3 className="text-lg md:text-xl font-semibold text-[#1A1A1A] mb-3 md:mb-4">{card.title}</h3>
                        <p className="text-xs md:text-sm text-[#4A4A4A] font-light leading-relaxed">{card.content}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Properties from Firestore - For Projects pages */}
            {(key === "residential" || key === "commercial" || key === "cultural" || key === "mixed-use" || key === "all") && (
              <div className="mt-8 md:mt-12">
                {/* Show filter UI only for "all" page */}
                {key === "all" ? (
                  <>
                    <ProjectsFilter
                      category={filterCategory}
                      location={filterLocation}
                      onCategoryChange={(cat) => {
                        setFilterCategory(cat);
                      }}
                      onLocationChange={(loc) => {
                        setFilterLocation(loc);
                      }}
                      onSearchChange={setSearchQuery}
                      onSortChange={setSortBy}
                      totalCount={totalCount}
                    />
                    <PropertiesList
                      category={filterCategory}
                      locationFilter={filterLocation === "All locations" ? undefined : filterLocation}
                      searchQuery={searchQuery}
                      sortBy={sortBy}
                      onTotalCountChange={setTotalCount}
                    />
                  </>
                ) : (
                  <>
                    <h2 className="text-2xl md:text-3xl font-light text-black mb-6">Our Projects</h2>
                    <PropertiesList category={key === "mixed-use" ? "mixed-use" : key} />
                  </>
                )}
              </div>
            )}

            {/* Nairobi Office Map & Details */}
            {key === "nairobi" && (
              <div className="mt-8 md:mt-12">
                <div className="mb-8">
                  <h3 className="text-xl md:text-2xl font-light text-black mb-4">Location Map</h3>
                  <div className="w-full h-[450px] bg-gray-100 rounded-lg overflow-hidden border border-[#E5E5E5]">
                    <iframe
                      title="Westlands Arcade Map"
                      src="https://www.google.com/maps?q=Westlands%20Arcade&output=embed"
                      className="w-full h-full border-0"
                      loading="lazy"
                      allowFullScreen
                      referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl md:text-2xl font-light text-black mb-4">Mailing Address</h3>
                  <p className="text-base text-[#4A4A4A] font-light leading-relaxed">
                    P.O. Box 51625-00100<br />
                    Nairobi, Kenya
                  </p>
                </div>
              </div>
            )}

            {/* Contact Forms - For Contact pages */}
            {(key === "consultation" || key === "inquiry" || key === "project") && (
              <div className="mt-8 md:mt-12 border-t border-[#E5E5E5] pt-8 md:pt-12">
                <h3 className="text-2xl md:text-3xl font-light text-black mb-6">
                  {key === "consultation" && "Request a Consultation"}
                  {key === "inquiry" && "Send Us a Message"}
                  {key === "project" && "Submit Your Project Inquiry"}
                </h3>
                <ContactForm
                  formType={key === "consultation" ? "consultation" : key === "project" ? "project" : "inquiry"}
                />
              </div>
            )}
          </div>

        </div>
      </div>
      <StructuredData type="BreadcrumbList" data={breadcrumbData} />
    </SubTopicPageLayout>
  );
};

export default SubTopicPage;

