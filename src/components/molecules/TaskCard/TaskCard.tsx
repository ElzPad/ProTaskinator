import './TaskCard.css';
import { TaskType } from '../../../types/task';
import { useFirestore } from '../../../hooks/useFirestore';
import { Link } from 'react-router-dom';
import ArrowIcon from '../../../assets/leftArrowIcon.svg';
import { increment } from 'firebase/firestore';

interface TaskCardProps {
  taskInfo: TaskType;
}

export default function TaskCard({ taskInfo }: TaskCardProps) {
  const { updateDocument: updateTask } = useFirestore('tasks');
  const { updateDocument: updateProject } = useFirestore('projects');

  const sliceText = (text: string, dim: number): string => {
    return text.slice(0, dim) + (text.length >= dim ? '...' : '');
  };

  const setToDo = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const currentStatus = taskInfo.status;
    const resource =
      currentStatus == 'ToDo'
        ? 'progress.toDo'
        : currentStatus == 'In Progress'
          ? 'progress.inProgress'
          : 'progress.completed';

    if (taskInfo.id) {
      if (taskInfo.projectId != '') {
        updateProject(taskInfo.projectId, {
          [resource]: increment(-1),
          'progress.toDo': increment(1),
        });
      }
      updateTask(taskInfo.id, {
        status: 'ToDo',
      });
    }
  };
  const setInProgress = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const currentStatus = taskInfo.status;
    const resource =
      currentStatus == 'ToDo'
        ? 'progress.toDo'
        : currentStatus == 'In Progress'
          ? 'progress.inProgress'
          : 'progress.completed';

    if (taskInfo.id) {
      if (taskInfo.projectId != '') {
        updateProject(taskInfo.projectId, {
          [resource]: increment(-1),
          'progress.inProgress': increment(1),
        });
      }
      updateTask(taskInfo.id, {
        status: 'In Progress',
      });
    }
  };
  const setCompleted = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const currentStatus = taskInfo.status;
    const resource =
      currentStatus == 'ToDo'
        ? 'progress.toDo'
        : currentStatus == 'In Progress'
          ? 'progress.inProgress'
          : 'progress.completed';

    if (taskInfo.id) {
      if (taskInfo.projectId != '') {
        updateProject(taskInfo.projectId, {
          [resource]: increment(-1),
          'progress.completed': increment(1),
        });
      }
      updateTask(taskInfo.id, {
        status: 'Completed',
      });
    }
  };

  return (
    <div className="taskCard">
      <Link to={`/task/${taskInfo.id}`}>
        <div className="pin"></div>
        <div className="cardRow">
          <div className="cardColumn">
            <h4>{taskInfo.title}</h4>
          </div>
        </div>
        <div className="cardRow buttonRow">
          {taskInfo.status == 'ToDo' && (
            <>
              <button
                className="btn progressBtn forwardBtn"
                onClick={(e) => setInProgress(e)}
              >
                <span>Set "In Progress"</span>
                <img src={ArrowIcon} alt="Arrow icon" />
              </button>
              <button className="btn disabledBtn backwardBtn" disabled>
                ToDo
              </button>
            </>
          )}
          {taskInfo.status == 'In Progress' && (
            <>
              <button
                className="btn completedBtn forwardBtn"
                onClick={(e) => setCompleted(e)}
              >
                Set "Completed"
                <img src={ArrowIcon} alt="Arrow icon" />
              </button>
              <button
                className="btn todoBtn backwardBtn"
                onClick={(e) => setToDo(e)}
              >
                <img src={ArrowIcon} alt="Arrow icon" />
                Set "ToDo"
              </button>
            </>
          )}
          {taskInfo.status == 'Completed' && (
            <>
              <button className="btn disabledBtn forwardBtn" disabled>
                Completed
              </button>
              <button
                className="btn progressBtn backwardBtn"
                onClick={(e) => setInProgress(e)}
              >
                <img src={ArrowIcon} alt="Arrow icon" />
                <span>Set "In Progress"</span>
              </button>
            </>
          )}
        </div>
        <div className="cardRow">
          <div className="cardColumn">
            <p className="label">Notes:</p>
            <p>{taskInfo.notes}</p>
          </div>
          <div className="cardColumn">
            <p className="label">Tags ({taskInfo.tagsList?.length}):</p>
            <p>{sliceText(taskInfo.tagsList.join(', '), 30)}</p>
          </div>
        </div>
      </Link>
    </div>
  );
}
