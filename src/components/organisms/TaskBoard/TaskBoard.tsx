import './TaskBoard.css';
import { TaskBoardProps } from './TaskBoard.types';

export default function TaskBoard(props: TaskBoardProps) {
  return <div>{props.tasks.length}</div>;
}
