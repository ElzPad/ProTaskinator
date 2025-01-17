import { TaskType } from '../../../types/task';
import './TaskBoard.css';
import { TaskBoardProps } from './TaskBoard.types';

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
  return (
    <div
      style={{
        border: '1px solid #ccc',
        flex: 1,
        padding: '10px',
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
      }}
    >
      <h4 style={{ textDecoration: 'underline', marginBottom: '20px' }}>
        {status}
      </h4>
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <div key={task.id} style={{ marginBottom: '10px' }}>
            <h4>{task.title}</h4>
            <p>{task.notes}</p>
          </div>
        ))
      ) : (
        <p>No tasks in this column</p>
      )}
    </div>
  );
};
