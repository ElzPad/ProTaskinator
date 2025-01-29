import './ProjectCard.css';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
} from 'chart.js';
import Avatar from '../../atoms/Avatar/Avatar';
import { ProjectType } from '../../../types/project';
import { NavLink } from 'react-router-dom';

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale
);

interface ProjectCardProps {
  projectInfo: ProjectType;
}

function calculateTimeProgress(startDate: Date, endDate: Date): number {
  const today = new Date();

  if (today < startDate) return 0; // Before the start date
  if (today > endDate) return 100; // After the end date

  const totalDuration = endDate.getTime() - startDate.getTime();
  const elapsedTime = today.getTime() - startDate.getTime();

  return (elapsedTime / totalDuration) * 100;
}

function calculateTasksProgress({
  toDo,
  inProgress,
  completed,
}: {
  toDo: number;
  inProgress: number;
  completed: number;
}) {
  const total = toDo + inProgress + completed;
  const progress = completed + inProgress * 0.5;

  if (toDo + inProgress + completed === 0) return 0;

  return (progress / total) * 100;
}

export default function ProjectCard({ projectInfo }: ProjectCardProps) {
  const chartData =
    projectInfo.progress.toDo +
      projectInfo.progress.inProgress +
      projectInfo.progress.completed >
    0
      ? {
          labels: ['ToDo', 'In progress', 'Completed'],
          datasets: [
            {
              data: [24, 43, 12],
              backgroundColor: ['#efebce', '#c1292e', '#235789'],
            },
          ],
        }
      : {
          labels: ['No tasks'],
          datasets: [
            {
              data: [1],
              backgroundColor: ['#efebce'],
            },
          ],
        };

  return (
    <div className="projectCard">
      <NavLink to={`/project/${projectInfo.id}`}>
        <div className="topContainer">
          <div className="descriptionContainer">
            <h3>{projectInfo.title}</h3>
            <p>{projectInfo.briefDescription}</p>
          </div>
          <div>
            <Pie data={chartData} />
          </div>
        </div>
        <div className="assignedUsers">
          <p>Team:</p>
          <ul className="assignedUsersList">
            {Object.entries(projectInfo.assignedUsersInfo).map(([id, info]) => (
              <li key={id}>
                <Avatar src={info[1]} />
              </li>
            ))}
          </ul>
        </div>
        <br />
        <div>
          <p>Elapsed time:</p>
          <div
            style={{
              width: '100%',
              backgroundColor: '#efebce',
              borderRadius: '5px',
              height: '30px',
            }}
          >
            <div
              style={{
                width: `${calculateTimeProgress(projectInfo.startDate.toDate(), projectInfo.dueDate.toDate())}%`,
                backgroundColor: '#235789',
                height: '100%',
                borderRadius: '5px',
                textAlign: 'center',
                lineHeight: '30px',
                color: 'white',
                fontWeight: 'bold',
              }}
            >
              {calculateTimeProgress(
                projectInfo.startDate.toDate(),
                projectInfo.dueDate.toDate()
              ).toFixed(2)}
              %
            </div>
          </div>
        </div>
        <br />
        <div>
          <p>Tasks progress:</p>
          <div
            style={{
              width: '100%',
              backgroundColor: '#efebce',
              borderRadius: '5px',
              height: '30px',
            }}
          >
            <div
              style={{
                width: `${calculateTasksProgress(projectInfo.progress)}%`,
                backgroundColor: '#235789',
                height: '100%',
                borderRadius: '5px',
                textAlign: 'center',
                lineHeight: '30px',
                color: 'white',
                fontWeight: 'bold',
              }}
            >
              {calculateTasksProgress(projectInfo.progress).toFixed(2)}%
            </div>
          </div>
        </div>
      </NavLink>
    </div>
  );
}
