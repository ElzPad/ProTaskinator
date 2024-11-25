import { createContext, useEffect, useReducer } from 'react';
import { AuthAction, AuthState } from './AuthContext.types';
import { ChildrenProps } from '../types/global';
import { projectAuth } from '../firebase/config';

export const AuthContext = createContext<
  | (AuthState & {
      dispatch: React.Dispatch<AuthAction>;
    })
  | undefined
>(undefined);

export const authReducer = (
  state: AuthState,
  action: AuthAction
): AuthState => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: action.payload };
    case 'LOGOUT':
      return { ...state, user: null };
    case 'AUTH_IS_READY':
      return { user: action.payload, authIsReady: true };
    default:
      return state;
  }
};

export const AuthContextProvider: React.FC<ChildrenProps> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    authIsReady: false,
  });

  useEffect(() => {
    const unsub = projectAuth.onAuthStateChanged((user) => {
      dispatch({ type: 'AUTH_IS_READY', payload: user });
      unsub();
    });
  }, []);

  return (
    <AuthContext.Provider value={{ dispatch, ...state }}>
      {children}
    </AuthContext.Provider>
  );
};
