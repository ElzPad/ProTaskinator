import { useNavigate, useParams } from 'react-router-dom';
import './Project.css';
import { useDocument } from '../../hooks/useDocument';
import InfoCard from '../../components/atoms/InfoCard/InfoCard';
import { useFirestore } from '../../hooks/useFirestore';
import { ProjectType } from '../../types/project';
import { useState } from 'react';
import { useCollection } from '../../hooks/useCollection';
import { TaskType } from '../../types/task';
import { where } from 'firebase/firestore';
import TaskTable from '../../components/organisms/TaskTable/TaskTable';
import { SelectOptionsType } from '../../types/global';
import TaskBoard from '../../components/organisms/TaskBoard/TaskBoard';
import Select, { ActionMeta, SingleValue } from 'react-select';
import ChatFrame from '../../components/organisms/ChatFrame/ChatFrame';
import { MessageType } from '../../types/message';

export default function Project() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { document, isLoading, error } = useDocument<ProjectType>(
    'projects',
    id ? id : ''
  );
  const { deleteDocument, response } = useFirestore('tasks');
  const [visualization, setVisualization] = useState<string>('tasks');

  const {
    documents: tasks,
    error: tasksError,
    isLoading: tasksLoading,
  } = useCollection<TaskType>('tasks', [where('projectId', '==', id)]);

  const [taskVisualization, setTaskVisualization] =
    useState<SelectOptionsType | null>(null);
  const handleChange = (
    newValue: SingleValue<SelectOptionsType>,
    _: ActionMeta<SelectOptionsType>
  ) => {
    setTaskVisualization(newValue);
  };
  const taskVisualizationOptions: SelectOptionsType[] = [
    { value: 'Table', label: 'Table' },
    { value: 'Board', label: 'Board' },
  ];

  const {
    documents: messages,
    isLoading: messagesLoading,
    error: messagesError,
  } = useCollection<MessageType>(
    'messages',
    [where('isGroupChat', '==', true), where('receiverUid', '==', id)],
    'createdAt',
    'asc'
  );

  const handleDelete = (e: React.FormEvent) => {
    e.preventDefault();
    deleteDocument(id ? id : '');
    if (!response.error) {
      navigate('/');
    } else {
      console.log(response.error);
    }
  };

  return (
    <div>
      {isLoading && <div>Loading..</div>}
      {error && <div className="error">{error}</div>}
      {document && (
        <>
          <h1 className="pageTitle">Project: {document.title}</h1>
          <div className="pageSelector">
            <p
              className={visualization == 'tasks' ? 'selected' : ''}
              onClick={() => setVisualization('tasks')}
            >
              Tasks
            </p>
            <p
              className={visualization == 'info' ? 'selected' : ''}
              onClick={() => setVisualization('info')}
            >
              Info
            </p>
            <p
              className={visualization == 'chat' ? 'selected' : ''}
              onClick={() => setVisualization('chat')}
            >
              Chat
            </p>
          </div>
          {visualization == 'info' && (
            <>
              {tasksError && <div className="error">{tasksError}</div>}
              {tasksLoading && <div>Loading...</div>}
              {tasks && (
                <>
                  <h2>Info</h2>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <InfoCard label="Title">
                      <p>
                        {document.title} {id}
                      </p>
                    </InfoCard>
                    <InfoCard label="Start date">
                      <p>{document.startDate.toDate().toString()}</p>
                    </InfoCard>
                    <InfoCard label="Due date">
                      <p>{document.dueDate.toDate().toString()}</p>
                    </InfoCard>
                  </div>
                  <div>
                    <InfoCard label="Notes">
                      <p>{document.briefDescription}</p>
                    </InfoCard>
                  </div>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <InfoCard label="People">
                      <p>{document.assignedUsers.join(', ')} </p>
                    </InfoCard>
                  </div>
                  <div style={{ display: 'flex', gap: '10px' }}></div>
                  <div style={{ marginTop: '10px' }}>
                    <button className="btn" onClick={handleDelete}>
                      Delete project
                    </button>
                  </div>
                </>
              )}
            </>
          )}
          {visualization == 'tasks' && (
            <>
              {tasksError && <div className="error">{tasksError}</div>}
              {tasksLoading && <div>Loading...</div>}
              {tasks && (
                <>
                  <div className="headerContainer">
                    <h2>Tasks</h2>
                    <label className="selector">
                      Visualization:
                      <Select
                        value={taskVisualization}
                        options={taskVisualizationOptions}
                        onChange={handleChange}
                        defaultValue={{ value: 'Table', label: 'Table' }}
                      />
                    </label>
                  </div>
                  <button
                    className="btn"
                    style={{
                      backgroundColor: 'var(--primary-color)',
                      color: 'white',
                    }}
                    onClick={() => {
                      navigate(`/create-task/${document.id}`);
                    }}
                  >
                    Add task +
                  </button>
                  <div>
                    {(taskVisualization == null ||
                      taskVisualization?.value == 'Table') && (
                      <TaskTable tasks={tasks} />
                    )}
                    {taskVisualization?.value == 'Board' && (
                      <TaskBoard tasks={tasks} />
                    )}
                  </div>
                </>
              )}
            </>
          )}
          {visualization == 'chat' && (
            <>
              <div className="headerContainer">
                <h2>Group chat</h2>
              </div>

              {messages && (
                <ChatFrame
                  groupChat={id}
                  messages={messages ? messages : []}
                  isLoading={messagesLoading ? messagesLoading : false}
                  isError={messagesError ? true : false}
                />
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}
