import './TaskCard.css';
import { TaskType } from '../../../types/task';
import { useEffect, useState } from 'react';

interface TaskCardProps {
  taskInfo: TaskType;
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
          <p className="label">People ({taskInfo.peopleList.length}):</p>
          <ul>
            {taskInfo.peopleList.map((p: string) => {
              return (
                <span key={p}>
                  <span>{p}</span>
                  <br />
                </span>
              );
            })}
          </ul>
        </div>
        <div className="cardColumn">
          <p className="label">Tags ({taskInfo.tagsList?.length}):</p>
          {taskInfo.tagsList?.map((tag: string) => {
            return (
              <span key={tag}>
                <span>{tag}</span>
                <br />
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}
