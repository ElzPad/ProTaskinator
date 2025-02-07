import { Link, useNavigate, useParams } from 'react-router-dom';
import './Project.css';
import { useDocument } from '../../hooks/useDocument';
import InfoCard from '../../components/atoms/InfoCard/InfoCard';
import { useFirestore } from '../../hooks/useFirestore';
import { ProjectType } from '../../types/project';
import { useEffect, useRef, useState } from 'react';
import { useCollection } from '../../hooks/useCollection';
import { TaskType } from '../../types/task';
import { where } from 'firebase/firestore';
import TaskTable from '../../components/organisms/TaskTable/TaskTable';
import { SelectOptionsType } from '../../types/global';
import TaskBoard from '../../components/organisms/TaskBoard/TaskBoard';
import Select, { ActionMeta, SingleValue } from 'react-select';
import ChatFrame from '../../components/organisms/ChatFrame/ChatFrame';
import { MessageType } from '../../types/message';
import WarningIcon from '../../assets/warningIcon.svg';
import { Pie } from 'react-chartjs-2';
import Avatar from '../../components/atoms/Avatar/Avatar';

function calculateTasksProgress({
  toDo,
  inProgress,
  completed,
}: {
  toDo: number;
  inProgress: number;
  completed: number;
}) {
  const total = toDo + inProgress + completed;
  const progress = completed + inProgress * 0.5;

  if (toDo + inProgress + completed === 0) return 0;

  return (progress / total) * 100;
}

function calculateTimeProgress(startDate: Date, endDate: Date): number {
  const today = new Date();

  if (today < startDate) return 0; // Before the start date
  if (today > endDate) return 100; // After the end date

  const totalDuration = endDate.getTime() - startDate.getTime();
  const elapsedTime = today.getTime() - startDate.getTime();

  return (elapsedTime / totalDuration) * 100;
}

export default function Project() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { document, isLoading, error } = useDocument<ProjectType>(
    'projects',
    id ? id : ''
  );
  const { deleteDocument, response } = useFirestore('tasks');
  const [visualization, setVisualization] = useState<string>('tasks');
  const scrollableRef = useRef<HTMLDivElement | null>(null);

  const {
    documents: tasks,
    error: tasksError,
    isLoading: tasksLoading,
  } = useCollection<TaskType>(
    'tasks',
    [where('projectId', '==', id)],
    'status',
    'desc'
  );

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

  const chartData =
    (document?.progress.toDo as number) +
      (document?.progress.inProgress as number) +
      (document?.progress.completed as number) >
    0
      ? {
          labels: ['ToDo', 'In progress', 'Completed'],
          datasets: [
            {
              data: [
                document?.progress.toDo,
                document?.progress.inProgress,
                document?.progress.completed,
              ],
              backgroundColor: ['#efebce', '#c1292e', '#235789'],
            },
          ],
        }
      : {
          labels: ['No tasks'],
          datasets: [
            {
              data: [1],
              backgroundColor: ['#efebce'],
            },
          ],
        };

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

  useEffect(() => {
    if (scrollableRef.current) {
      scrollableRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }, [visualization]);

  return (
    <div>
      {isLoading && <div>Loading..</div>}
      {error && <div className="error">{error}</div>}
      {document && (
        <div>
          <h1 className="pageTitle">Project: {document.title}</h1>
          <div className="pageSelector" ref={scrollableRef}>
            <p
              className={visualization == 'tasks' ? 'selected' : ''}
              onClick={() => {
                setVisualization('tasks');
              }}
            >
              Tasks
            </p>
            <p
              className={visualization == 'documents' ? 'selected' : ''}
              onClick={() => {
                setVisualization('documents');
              }}
            >
              Documents
            </p>
            <p
              className={visualization == 'chat' ? 'selected' : ''}
              onClick={() => {
                setVisualization('chat');
              }}
            >
              Chat
            </p>

            <p
              className={visualization == 'info' ? 'selected' : ''}
              onClick={() => {
                setVisualization('info');
              }}
            >
              Info
            </p>
          </div>
          {visualization == 'info' && (
            <>
              <h2>Info</h2>
              <div className="infoRow">
                <div>
                  <InfoCard label="Title">
                    <p>{document.title}</p>
                  </InfoCard>
                  <InfoCard label="Brief description">
                    <p>{document.briefDescription}</p>
                  </InfoCard>
                  <InfoCard label="Longer description">
                    <p>{document.description}</p>
                  </InfoCard>
                </div>
                <InfoCard label="Tasks distribution">
                  <div>
                    <Pie data={chartData} />
                  </div>
                </InfoCard>
              </div>
              <div className="infoRow">
                <InfoCard label="Start date">
                  <p>
                    {document.startDate.toDate().toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </InfoCard>
                <InfoCard label="Due date">
                  <p>
                    {document.dueDate.toDate().toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </InfoCard>
              </div>
              <div className="infoRow">
                <InfoCard label="Elapsed time">
                  <div className="progressBar">
                    <div
                      className="progressIndicator"
                      style={{
                        width: `${calculateTimeProgress(document.startDate.toDate(), document.dueDate.toDate())}%`,
                      }}
                    >
                      {calculateTimeProgress(
                        document.startDate.toDate(),
                        document.dueDate.toDate()
                      ).toFixed(2)}
                      %
                    </div>
                  </div>
                </InfoCard>
              </div>

              <div className="infoRow">
                <InfoCard label="Tasks Progress">
                  {' '}
                  <div className="progressBar">
                    <div
                      className="progressIndicator"
                      style={{
                        width: `${calculateTasksProgress(document.progress).toFixed(2)}%`,
                      }}
                    >
                      {calculateTasksProgress(document.progress).toFixed(2)}%
                    </div>
                  </div>
                </InfoCard>
              </div>
              <div className="infoRow">
                <InfoCard label="People">
                  <div className="peopleRow">
                    {Object.entries(document.assignedUsersInfo).map(
                      ([key, value]) => (
                        <>
                          <Link to={`/chat/${key}`}>
                            <div className="userLink">
                              <Avatar src={value[1]} />
                              <span>{value[0]}</span>
                            </div>
                          </Link>
                        </>
                      )
                    )}
                  </div>
                </InfoCard>
              </div>
              <div style={{ marginTop: '10px' }}>
                <button className="btn" onClick={handleDelete}>
                  Delete project
                </button>
              </div>
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
          {visualization == 'documents' && (
            <div className="inlineInfo">
              <img src={WarningIcon} alt="Warning icon" />
              <p>This section is currently being implemented.</p>
              <p>
                It will allow users to upload, save and share documents related
                to the project.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
