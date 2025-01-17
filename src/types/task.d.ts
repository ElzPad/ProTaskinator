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
  comments: CommentType[];
  peopleList: string[];
  tagsList: string[];
  status: 'ToDo' | 'In Progress' | 'Completed';
  requiredTime: string;
}

export interface CommentType {
  createdBy: {
    name: string;
    uid: string;
  };
  content: string;
}
