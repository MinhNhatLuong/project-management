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
    const newProject = {
      ...projectData,
      id: Math.random()
    }

    setProjectsState(prevProjectsState => ({
      ...prevProjectsState,
      projects: [...prevProjectsState.projects, newProject]
    }))
  }

  console.log(projectsState);

  let content;

  if (projectsState.selectedProjectId === null) {
    content = <NewProject onAdd={handleAddProject}/>;
  } else if (projectsState.selectedProjectId === undefined) {
    content = <NoProjectSelected onClickAddProject={handleClickAddProject} />;
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectsSidebar onClickAddProject={handleClickAddProject} projectList={projectsState}/>
      {content}
    </main>
  );
}

export default App;
