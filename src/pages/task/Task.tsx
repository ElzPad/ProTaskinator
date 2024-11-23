import { useParams } from 'react-router-dom'
import './Task.css'

export default function Task() {
  const {id} = useParams();

  return (
    <div>Task {id}</div>
  )
}
