import './TaskCard.css';
import { Task } from '../../../types/task';
import { useEffect, useState } from 'react';

interface TaskCardProps {
  taskInfo: Task;
}

export default function TaskCard({ taskInfo }: TaskCardProps) {
  const [dateString, setDateString] = useState<string>('');

  useEffect(() => {
    setDateString(taskInfo.dueDate.toDate().toLocaleString());
  }, []);

  return (
    <div className="taskCard">
      <div className="cardRow">
        <div className="cardColumn">
          <p className="label">Notes:</p>
          <p>{taskInfo.notes}</p>
        </div>
        <div className="cardColumn">
          <p className="label">Due date:</p>
          <p>{dateString}</p>
        </div>
      </div>
      <div className="cardRow">
        <div className="cardColumn">
          <p className="label">People:</p>
          <ul>
            {taskInfo.peopleList.map((p) => {
              return <p>{p}</p>;
            })}
          </ul>
        </div>
        <div className="cardColumn">
          <p className="label">Tags:</p>
          {taskInfo.tags.map((tag) => {
            return <span>{tag}</span>;
          })}
        </div>
      </div>
    </div>
  );
}
