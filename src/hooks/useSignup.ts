import { useEffect, useState } from 'react';
import {
  projectAuth,
  projectFirestore,
  projectStorage,
} from '../firebase/config';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useAuthContext } from './useAuthContext';
import { doc, setDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

export const useSignup = () => {
  const [isCancelled, setIsCancelled] = useState<boolean>(false);

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { dispatch } = useAuthContext();

  const signup = async (
    email: string,
    password: string,
    displayName: string,
    thumbnail: File
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

      const uploadPath = `thumbnails/${res.user.uid}/${thumbnail.name}`;
      const fileRef = ref(projectStorage, uploadPath);
      await uploadBytes(fileRef, thumbnail);
      const imgUrl = await getDownloadURL(fileRef);
      await updateProfile(res.user, { displayName, photoURL: imgUrl });

      await setDoc(doc(projectFirestore, 'users', res.user.uid), {
        online: true,
        displayName,
        photoURL: imgUrl,
      });

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
