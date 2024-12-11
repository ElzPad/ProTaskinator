import './ChipsBar.css';
import { ChipsBarProps } from './ChipsBar.types';

export default function ChipsBar(props: ChipsBarProps) {
  return (
    <div className="chipsBar">
      <span>{props.content}</span>
      <button type="button" onClick={props.handleRemove}>
        X
      </button>
    </div>
  );
}
