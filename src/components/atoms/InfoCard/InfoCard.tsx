import './InfoCard.css';
import { InfoCardProps } from './InfoCard.types';

export default function InfoCard(props: InfoCardProps) {
  return (
    <div className="infoCard">
      <h4>{props.label}</h4>
      <div className="content">{props.children}</div>
    </div>
  );
}
