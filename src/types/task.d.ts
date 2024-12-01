import { timestamp } from '../firebase/config';

export interface Task {
  id: string;
  title: string;
  dueDate: timestamp;
  notes: string;
  peopleList: string[];
  tags: string[];
  status: string;
}
