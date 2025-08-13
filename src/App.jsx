import { useState } from "react";
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import ProjectsSidebar from "./components/ProjectsSidebar";

function App() {
  const [projectsState, setProjectsState] = useState({
    selectedProjectId: undefined,
    projects: []
  });

  function handleClickAddProject() {
    setProjectsState(prevProjectsState => ({
      ...projectsState,
      selectedProjectId: null
    }))
  }

  function handleAddProject(projectData) {
    const projectId = Math.random();
    const newProject = {
      ...projectData,
      id: projectId
    }

    setProjectsState(prevProjectsState => ({
      ...prevProjectsState,
      selectedProjectId: undefined,
      projects: [...prevProjectsState.projects, newProject]
    }))
  }

  let content;

  if (projectsState.selectedProjectId === null) {
    content = <NewProject onAdd={handleAddProject}/>;
  } else if (projectsState.selectedProjectId === undefined) {
    content = <NoProjectSelected onClickAddProject={handleClickAddProject} />;
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectsSidebar onClickAddProject={handleClickAddProject} projectList={projectsState.projects}/>
      {content}
    </main>
  );
}

export default App;
