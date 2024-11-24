import { signOut } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { projectAuth } from '../firebase/config';

export const useLogout = () => {
  const [isCancelled, setIsCancelled] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const logout = () => {
    setIsLoading(false);
    setError(null);

    try {
      const res = signOut(projectAuth);

      if (!res) throw new Error('Unable to complete logout');

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
