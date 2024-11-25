import TaskCard from '../../components/molecules/TaskCard/TaskCard';
import Modal from '../../components/organisms/Modal/Modal';
import { timestamp } from '../../firebase/config';
import { Task } from '../../types/task';
import './Home.css';

const task: Task = {
  uid: 'ciao',
  email: 'prova1@gmail.com',
  dueDate: timestamp.fromDate(new Date()),
  notes: 'Devo ricordare di fare gli inviti.',
  peopleList: ['Giovanna', 'Lilly', 'Salvo'],
  tags: ['#uni', '#laurea'],
};

export default function Home() {
  return (
    <div>
      <p>Home</p>
      <Modal>
        <TaskCard taskInfo={task} />
      </Modal>
    </div>
  );
}
