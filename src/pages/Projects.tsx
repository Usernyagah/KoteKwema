import MenuPageLayout from "@/components/MenuPageLayout";
import ProjectsGrid from "@/components/ProjectsGrid";

const ProjectsPage = () => {
  return (
    <MenuPageLayout>
      <div>
        <h1 className="text-4xl md:text-5xl font-light tracking-tight mb-8">Projects</h1>
        <ProjectsGrid />
      </div>
    </MenuPageLayout>
  );
};

export default ProjectsPage;

