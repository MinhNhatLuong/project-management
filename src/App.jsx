import { useState } from "react";
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import ProjectsSidebar from "./components/ProjectsSidebar";
import SelectedProject from "./components/SelectedProject";

function App() {
  const [projectsState, setProjectsState] = useState({
    selectedProjectId: undefined,
    projects: [],
  });

  function handleClickAddProject() {
    setProjectsState((prevProjectsState) => ({
      ...projectsState,
      selectedProjectId: null,
    }));
  }

  function handleAddProject(projectData) {
    const projectId = Math.random();
    const newProject = {
      ...projectData,
      id: projectId,
    };

    setProjectsState((prevProjectsState) => ({
      ...prevProjectsState,
      selectedProjectId: undefined,
      projects: [...prevProjectsState.projects, newProject],
    }));
  }

  function handleCancelAddProject() {
    setProjectsState((prevProjectsState) => ({
      ...projectsState,
      selectedProjectId: undefined,
    }));
  }

  function handleSelectProject(id) {
    setProjectsState((prevProjectsState) => ({
      ...projectsState,
      selectedProjectId: id,
    }));
  }

  function handleDeleteProject() {
    setProjectsState((prevProjectsState) => ({
      ...projectsState,
      selectedProjectId: undefined,
      projects: prevProjectsState.projects.filter(project => project.id !== prevProjectsState.selectedProjectId)
    }));
  }
  
  const selectedProject = projectsState.projects.find(project => project.id === projectsState.selectedProjectId);
  let content = <SelectedProject project={selectedProject} onDeleteProject={handleDeleteProject}/>;

  if (projectsState.selectedProjectId === null) {
    content = (
      <NewProject onAdd={handleAddProject} onCancel={handleCancelAddProject} />
    );
  } else if (projectsState.selectedProjectId === undefined) {
    content = <NoProjectSelected onClickAddProject={handleClickAddProject} />;
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectsSidebar
        onClickAddProject={handleClickAddProject}
        projectList={projectsState.projects}
        onSelectProject={handleSelectProject}
      />
      {content}
    </main>
  );
}

export default App;
