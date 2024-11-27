import TaskCard from '../../components/molecules/TaskCard/TaskCard';
import Modal from '../../components/organisms/Modal/Modal';
import { useCollection } from '../../hooks/useCollection';
import './Home.css';

export default function Home() {
  const { documents, error } = useCollection('tasks');

  return (
    <div>
      <p>Home</p>
      {error && <div className="error">{error}</div>}
      {documents &&
        documents.map((task) => {
          return (
            <div key={task.id}>
              <Modal status={task.status} title={task.title}>
                <TaskCard taskInfo={task} />
              </Modal>
            </div>
          );
        })}
    </div>
  );
}
