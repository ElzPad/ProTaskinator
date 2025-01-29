import { where } from 'firebase/firestore';
import TaskTable from '../../components/organisms/TaskTable/TaskTable';
import { useCollection } from '../../hooks/useCollection';
import { TaskType } from '../../types/task';
import './Home.css';
import { useAuthContext } from '../../hooks/useAuthContext';
import Select, { ActionMeta, SingleValue } from 'react-select';
import { useState } from 'react';
import TaskBoard from '../../components/organisms/TaskBoard/TaskBoard';
import { SelectOptionsType } from '../../types/global';
import ProjectCard from '../../components/molecules/ProjectCard/ProjectCard';
import { ProjectType } from '../../types/project';

export default function Home() {
  const { user } = useAuthContext();
  const {
    documents: tasks,
    error: tasksError,
    isLoading: tasksLoading,
  } = useCollection<TaskType>('tasks', [
    where('createdBy.uid', '==', user?.uid),
  ]);
  const {
    documents: projects,
    error: projectsError,
    isLoading: projectsLoading,
  } = useCollection<ProjectType>('projects', [
    where('assignedUsers', 'array-contains', user?.uid),
  ]);
  const [visualization, setVisualization] = useState<SelectOptionsType | null>(
    null
  );
  const [projectsFilter, setProjectsFilter] = useState<string>('');

  const handleChange = (
    newValue: SingleValue<SelectOptionsType>,
    _: ActionMeta<SelectOptionsType>
  ) => {
    setVisualization(newValue);
  };

  const visualizationOptions: SelectOptionsType[] = [
    { value: 'Table', label: 'Table' },
    { value: 'Board', label: 'Board' },
  ];

  return (
    <div>
      <h1 className="pageTitle">Dashboard</h1>
      {tasksError && <div className="error">{tasksError}</div>}
      {tasksLoading && <div>Loading...</div>}
      {tasks && (
        <>
          <div className="headerContainer">
            <h2>Personal tasks</h2>
            <label className="selector">
              Visualization:
              <Select
                value={visualization}
                options={visualizationOptions}
                onChange={handleChange}
                defaultValue={{ value: 'Table', label: 'Table' }}
              />
            </label>
          </div>
          <div>
            {(visualization == null || visualization?.value == 'Table') && (
              <TaskTable tasks={tasks} />
            )}
            {visualization?.value == 'Board' && <TaskBoard tasks={tasks} />}
          </div>
        </>
      )}
      <br />
      {projectsError && <div className="error">{projectsError}</div>}
      {projectsLoading && <div>Loading...</div>}
      {projects && (
        <>
          <div className="headerContainer">
            <h2>Assigned Projects</h2>
          </div>
          <label className="projectsFilter">
            Search:
            <input
              type="text"
              value={projectsFilter}
              onChange={(e) => {
                setProjectsFilter(e.target.value.toLowerCase());
              }}
              placeholder="insert project name"
            />
          </label>

          <div className="projectDisplayer">
            {projects
              .filter((project) => {
                return project.title.toLowerCase().includes(projectsFilter);
              })
              .map((project) => (
                <div key={project.id} className="projectCardItem">
                  <ProjectCard projectInfo={project} />
                </div>
              ))}
          </div>
        </>
      )}
    </div>
  );
}
