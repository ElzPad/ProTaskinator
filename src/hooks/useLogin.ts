import { useEffect, useState } from 'react';
import { projectAuth, projectFirestore } from '../firebase/config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useAuthContext } from './useAuthContext';
import { collection, doc, updateDoc } from 'firebase/firestore';

export const useLogin = () => {
  const [isCancelled, setIsCancelled] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { dispatch, user } = useAuthContext();

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await signInWithEmailAndPassword(
        projectAuth,
        email,
        password
      );

      const uid = res.user.uid;
      const collectionRef = collection(projectFirestore, 'users');
      const userRef = doc(collectionRef, uid);
      await updateDoc(userRef, { online: true });

      if (!res) throw new Error('Unable to complete login');

      dispatch({ type: 'LOGIN', payload: res.user });

      if (!isCancelled) {
        setIsLoading(false);
        setError(null);
      }
    } catch (err: any) {
      if (!isCancelled) {
        setIsLoading(false);
        setError(err.message);
      }
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { login, error, isLoading };
};
