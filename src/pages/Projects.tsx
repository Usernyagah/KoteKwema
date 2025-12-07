import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ProjectsGrid from "@/components/ProjectsGrid";

const ProjectsPage = () => {
  return (
    <div className="min-h-screen bg-[#1A1A1A]">
      <Navigation />
      <section className="pt-12 pb-12">
        <div className="pl-6 lg:pl-12 pr-6 lg:pr-12">
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white">Projects</h1>
          </div>
          <ProjectsGrid />
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default ProjectsPage;

