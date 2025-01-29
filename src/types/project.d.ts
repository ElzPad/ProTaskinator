import { timestamp } from '../firebase/config';

export interface ProjectType {
  id?: string;
  createdBy: {
    name: string;
    uid: string;
  };
  createtAt: Timestamp;
  title: string;
  briefDescription: string;
  description: string;
  startDate: timestamp;
  dueDate: Timestamp;
  assignedUsers: string[];
  assignedUsersInfo: { [key: string]: string[] };
  progress: {
    toDo: number;
    inProgress: number;
    completed: number;
  };
}
