import { useParams } from 'react-router-dom';
import './Project.css';

export default function Project() {
  const { id } = useParams();
  return <div>Project {id}</div>;
}
