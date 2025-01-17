import { signOut } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { projectAuth, projectFirestore } from '../firebase/config';
import { useAuthContext } from './useAuthContext';
import { collection, doc, updateDoc } from 'firebase/firestore';

export const useLogout = () => {
  const [isCancelled, setIsCancelled] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { dispatch, user } = useAuthContext();

  const logout = async () => {
    setIsLoading(false);
    setError(null);

    try {
      const uid = user?.uid;
      const collectionRef = collection(projectFirestore, 'users');
      const userRef = doc(collectionRef, uid);
      await updateDoc(userRef, { online: false });

      const res = signOut(projectAuth);

      if (!res) throw new Error('Unable to complete logout');

      dispatch({ type: 'LOGOUT', payload: null });

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

  return { logout, error, isLoading };
};
