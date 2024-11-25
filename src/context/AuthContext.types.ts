import { User } from 'firebase/auth';

export interface AuthState {
  user: User | null;
  authIsReady: boolean;
}

export interface AuthAction {
  type: string;
  payload: User | null;
}
