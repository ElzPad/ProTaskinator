import TaskTable from '../../components/organisms/TaskTable/TaskTable';
import { useCollection } from '../../hooks/useCollection';
import { TaskType } from '../../types/task';
import './Home.css';

export default function Home() {
  const { documents, error, isLoading } = useCollection<TaskType>('tasks');

  return (
    <div>
      <h2 className="pageTitle">Dashboard</h2>
      {error && <div className="error">{error}</div>}
      {isLoading && <div>Loading...</div>}
      {documents && <TaskTable tasks={documents} />}
    </div>
  );
}
