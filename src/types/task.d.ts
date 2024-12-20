import { timestamp } from '../firebase/config';

export interface TaskType {
  id?: string;
  createdBy: {
    name: string;
    uid: string;
  };
  title: string;
  dueDate: timestamp;
  notes: string;
  peopleList: string[];
  tagsList: string[];
  status: string;
  requiredTime: string;
}
