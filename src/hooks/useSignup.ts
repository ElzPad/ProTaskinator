import { useEffect, useState } from 'react';
import { projectAuth } from '../firebase/config';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useAuthContext } from './useAuthContext';

export const useSignup = () => {
  const [isCancelled, setIsCancelled] = useState<boolean>(false);

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { dispatch } = useAuthContext();

  const signup = async (
    email: string,
    password: string,
    displayName: string
  ) => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await createUserWithEmailAndPassword(
        projectAuth,
        email,
        password
      );
      if (!res) throw new Error('Unable to complete signup');

      dispatch({ type: 'LOGIN', payload: res.user });

      if (projectAuth.currentUser)
        updateProfile(projectAuth.currentUser, { displayName });

      if (!isCancelled) {
        setError(null);
        setIsLoading(false);
      }
    } catch (err: any) {
      if (!isCancelled) {
        setError(err.message);
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { signup, error, isLoading };
};
