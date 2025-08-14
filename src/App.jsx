import { useState } from "react";
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import ProjectsSidebar from "./components/ProjectsSidebar";
import SelectedProject from "./components/SelectedProject";

function App() {
  const [projectsState, setProjectsState] = useState({
    selectedProjectId: undefined,
    projects: [],
    tasks: [],
  });

  //page navigation functions
  function handleClickAddProject() {
    setProjectsState((prevProjectsState) => ({
      ...projectsState,
      selectedProjectId: null,
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

  //CRUD project functions
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

  function handleDeleteProject() {
    setProjectsState((prevProjectsState) => ({
      ...projectsState,
      selectedProjectId: undefined,
      projects: prevProjectsState.projects.filter(
        (project) => project.id !== prevProjectsState.selectedProjectId
      ),
    }));
  }
  
  //CRUD task functions
  function handleAddTask(text) {
    setProjectsState((prevProjectsState) => {
      const taskId = Math.random();
      const newTask = {
        text: text,
        id: taskId,
        projectId: prevProjectsState.selectedProjectId,
      };

      return {
        ...prevProjectsState,
        tasks: [...prevProjectsState.tasks, newTask],
      };
    });
  }

  function handleDeleteTask(taskId) {
    setProjectsState((prevProjectsState) => {
      return {
        ...prevProjectsState,
        tasks: prevProjectsState.tasks.filter(task => task.id !== taskId),
      };
    });
  }

  const selectedProject = projectsState.projects.find(
    (project) => project.id === projectsState.selectedProjectId
  );

  let content = (
    <SelectedProject
      project={selectedProject}
      onDeleteProject={handleDeleteProject}
      onAddTask={handleAddTask}
      onDeleteTask={handleDeleteTask}
      tasks={projectsState.tasks}
    />
  );

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
        selectedProjectId={projectsState.selectedProjectId}
      />
      {content}
    </main>
  );
}

export default App;
