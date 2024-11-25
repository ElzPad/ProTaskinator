import { timestamp } from '../firebase/config';

export interface Task {
  uid: string;
  email: string;
  dueDate: timestamp;
  notes: string;
  peopleList: string[];
  tags: string[];
}
