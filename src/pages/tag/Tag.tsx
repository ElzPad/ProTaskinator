import { useParams } from 'react-router-dom';
import TaskTable from '../../components/organisms/TaskTable/TaskTable';
import { useCollection } from '../../hooks/useCollection';
import { TaskType } from '../../types/task';
import './Tag.css';

export default function Home() {
  const { id } = useParams();
  const { documents, error, isLoading } = useCollection<TaskType>('tasks');

  return (
    <div>
      <h2 className="pageTitle">Tag: #{id}</h2>
      {error && <div className="error">{error}</div>}
      {isLoading && <div>Loading...</div>}
      {documents && (
        <TaskTable
          tasks={documents.filter((d) => {
            return d.tagsList.includes(id ? id : '');
          })}
        />
      )}
    </div>
  );
}
