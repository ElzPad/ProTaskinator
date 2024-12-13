import { useEffect, useState } from 'react';
import { projectFirestore } from '../firebase/config';
import {
  collection,
  CollectionReference,
  doc,
  DocumentData,
  onSnapshot,
} from 'firebase/firestore';

export function useDocument<Type>(collectionId: string, documentId: string) {
  const [document, setDocument] = useState<Type | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const collectionRef: CollectionReference<DocumentData, DocumentData> =
      collection(projectFirestore, collectionId);
    const ref = doc(collectionRef, documentId);

    setIsLoading(true);

    const unsubscribe = onSnapshot(
      ref,
      (snapshot) => {
        if (snapshot.data()) {
          let data = { ...snapshot.data(), id: snapshot.id } as Type;
          setDocument(data);
          setError(null);
        } else {
          setError('No such document exists');
        }
        setIsLoading(false);
      },
      (error) => {
        setIsLoading(false);
        setError(error.message);
      }
    );

    return () => unsubscribe();
  }, [collection, collectionId]);

  return { document, isLoading, error };
}
