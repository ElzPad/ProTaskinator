import { where } from 'firebase/firestore';
import TaskTable from '../../components/organisms/TaskTable/TaskTable';
import { useCollection } from '../../hooks/useCollection';
import { TaskType } from '../../types/task';
import './Home.css';
import { useAuthContext } from '../../hooks/useAuthContext';
import Select, { ActionMeta, SingleValue } from 'react-select';
import { useState } from 'react';
import TaskBoard from '../../components/organisms/TaskBoard/TaskBoard';
import { SelectOptionsType } from '../../types/global';

export default function Home() {
  const { user } = useAuthContext();
  const { documents, error, isLoading } = useCollection<TaskType>('tasks', [
    where('createdBy.uid', '==', user?.uid),
  ]);
  const [visualization, setVisualization] = useState<SelectOptionsType | null>(
    null
  );

  const handleChange = (
    newValue: SingleValue<SelectOptionsType>,
    _: ActionMeta<SelectOptionsType>
  ) => {
    setVisualization(newValue);
  };

  const visualizationOptions: SelectOptionsType[] = [
    { value: 'Table', label: 'Table' },
    { value: 'Board', label: 'Board' },
  ];

  return (
    <div>
      <h2 className="pageTitle">Dashboard</h2>
      {error && <div className="error">{error}</div>}
      {isLoading && <div>Loading...</div>}
      {documents && (
        <div>
          <label>
            Visualization:
            <Select
              value={visualization}
              options={visualizationOptions}
              onChange={handleChange}
            />
          </label>
          {(visualization == null || visualization?.value == 'Table') && (
            <TaskTable tasks={documents} />
          )}
          {visualization?.value == 'Board' && <TaskBoard tasks={documents} />}
        </div>
      )}
    </div>
  );
}
