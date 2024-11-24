import { createContext, useEffect, useReducer } from 'react';
import { authAction, authState, providerProps } from './types';
import { projectAuth } from '../firebase/config';

export const AuthContext = createContext<
  | (authState & {
      dispatch: React.Dispatch<authAction>;
    })
  | undefined
>(undefined);

export const authReducer = (
  state: authState,
  action: authAction
): authState => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: action.payload };
    case 'AUTH_IS_READY':
      return { user: action.payload, authIsReady: true };
    default:
      return state;
  }
};

export const AuthContextProvider: React.FC<providerProps> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    authIsReady: false,
  });

  useEffect(() => {
    const unsub = projectAuth.onAuthStateChanged((user) => {
      dispatch({ type: 'AUTH_IS_READY', payload: null });
      unsub();
    });
  }, []);

  return (
    <AuthContext.Provider value={{ dispatch, ...state }}>
      {children}
    </AuthContext.Provider>
  );
};
