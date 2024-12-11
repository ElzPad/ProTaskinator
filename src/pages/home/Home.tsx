import TaskTable from '../../components/organisms/TaskTable/TaskTable';
import { useCollection } from '../../hooks/useCollection';
import { Task } from '../../types/task';
import './Home.css';

export default function Home() {
  const { documents, error, isLoading } = useCollection<Task>('tasks');

  return (
    <div>
      {error && <div className="error">{error}</div>}
      {isLoading && <div>Loading...</div>}
      {documents && <TaskTable tasks={documents} />}
    </div>
  );
}
