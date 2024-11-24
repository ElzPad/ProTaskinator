import { User } from 'firebase/auth';

export interface authState {
  user: User | null;
  authIsReady: boolean;
}

export interface authAction {
  type: string;
  payload: User | null;
}

export interface providerProps {
  children: React.ReactNode;
}
