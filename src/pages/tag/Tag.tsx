import './Tag.css';
import { useParams } from 'react-router-dom';

export default function Tag() {
  const { id } = useParams();
  return <div>Tag #{id}</div>;
}
