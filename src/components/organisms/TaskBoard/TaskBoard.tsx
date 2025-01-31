import { TaskType } from '../../../types/task';
import './TaskBoard.css';
import { TaskBoardProps } from './TaskBoard.types';

import ToDoIcon from '../../../assets/toDoIcon.svg';
import InProgressIcon from '../../../assets/inProgressIcon.svg';
import CompletedIcon from '../../../assets/completedIcon.svg';
import TaskCard from '../../molecules/TaskCard/TaskCard';

export default function TaskBoard(props: TaskBoardProps) {
  const groupedTasks = props.tasks.reduce(
    (acc, task) => {
      if (!acc[task.status]) {
        acc[task.status] = [];
      }
      acc[task.status].push(task);
      return acc;
    },
    {} as Record<string, TaskType[]>
  );

  const statuses: ('ToDo' | 'In Progress' | 'Completed')[] = [
    'ToDo',
    'In Progress',
    'Completed',
  ];

  return (
    <div style={{ display: 'flex', gap: '20px', flexGrow: 1 }}>
      {statuses.map((status) => (
        <Column
          key={status}
          status={status}
          tasks={groupedTasks[status] || []}
        />
      ))}
    </div>
  );
}

// Column component to render each group of tasks based on status
type ColumnProps = {
  status: 'ToDo' | 'In Progress' | 'Completed';
  tasks: TaskType[];
};

const Column: React.FC<ColumnProps> = ({ status, tasks }) => {
  const icons: { [key: string]: string } = {
    ToDo: ToDoIcon,
    'In Progress': InProgressIcon,
    Completed: CompletedIcon,
  };

  return (
    <div className="boardColumn">
      <div className="columnHeader">
        <img src={`${icons[status]}`} />
        <h3 style={{ textDecoration: 'underline', marginBottom: '20px' }}>
          {status}
        </h3>
      </div>

      <div className="columnScrollable">
        {tasks.length > 0 ? (
          tasks.map((task) => <TaskCard taskInfo={task} key={task.id} />)
        ) : (
          <p>No tasks in this column</p>
        )}
      </div>
    </div>
  );
};
