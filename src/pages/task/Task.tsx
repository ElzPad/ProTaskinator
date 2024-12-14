import { Link, useNavigate, useParams } from 'react-router-dom';
import './Task.css';
import { useDocument } from '../../hooks/useDocument';
import { TaskType } from '../../types/task';
import InfoCard from '../../components/atoms/InfoCard/InfoCard';
import { useFirestore } from '../../hooks/useFirestore';

export default function Task() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { document, isLoading, error } = useDocument<TaskType>(
    'tasks',
    id ? id : ''
  );
  const { deleteDocument } = useFirestore('tasks');

  const handleDelete = (e: React.FormEvent) => {
    deleteDocument(id ? id : '');
    navigate('/');
  };

  return (
    <div>
      {isLoading && <div>Loading..</div>}
      {error && <div className="error">{error}</div>}
      {document && (
        <>
          <h2 className="pageTitle">Task: {document.title}</h2>
          <div style={{ display: 'flex', gap: '10px' }}>
            <InfoCard label="Title">
              <p>{document.title}</p>
            </InfoCard>
            <InfoCard label="Due date">
              <p>{document.dueDate.toDate().toString()}</p>
            </InfoCard>
          </div>
          <div>
            <InfoCard label="Notes">
              <p>{document.notes}</p>
            </InfoCard>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <InfoCard label="People">
              <p>{document.peopleList.join(', ')} </p>
            </InfoCard>
            <InfoCard label="Tags">
              <ul>
                {document.tagsList.map((tag) => {
                  return (
                    <div className="linkBtn" style={{ marginRight: '5px' }}>
                      <Link to={`/tag/${tag}`}>#{tag}</Link>
                    </div>
                  );
                })}
              </ul>
            </InfoCard>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <InfoCard label="Status">
              <p>{document.status} </p>
            </InfoCard>
            <InfoCard label="Required Time">
              <p>{document.requiredTime}</p>
            </InfoCard>
          </div>
          <div style={{ marginTop: '10px' }}>
            <button className="btn" onClick={handleDelete}>
              Delete task
            </button>
          </div>
        </>
      )}
    </div>
  );
}
