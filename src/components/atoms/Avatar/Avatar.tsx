import './Avatar.css';
import { AvatarProps } from './Avatar.types';

export default function Avatar(props: AvatarProps) {
  return (
    <div className="avatar">
      <img src={props.src} alt="user avatar" />
    </div>
  );
}
