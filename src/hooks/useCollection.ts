import { useEffect, useState } from 'react';
import { projectFirestore } from '../firebase/config';
import {
  collection,
  CollectionReference,
  DocumentData,
  onSnapshot,
} from 'firebase/firestore';

export function useCollection<Type>(collectionId: string) {
  const [documents, setDocuments] = useState<Type[] | null>();
  const [isLoading, setIsLoading] = useState<boolean>();
  const [error, setError] = useState<string | null>();

  useEffect(() => {
    let ref: CollectionReference<DocumentData, DocumentData> = collection(
      projectFirestore,
      collectionId
    );
    setIsLoading(true);

    let unsubscribe = onSnapshot(
      ref,
      (snapshot) => {
        let results: Type[] = [];
        snapshot.docs.forEach((doc) => {
          let data = { ...doc.data(), id: doc.id } as Type;
          results.push(data);
        });

        setDocuments(results);
        setIsLoading(false);
        setError(null);
      },
      (error) => {
        setIsLoading(false);
        setError(error.message);
      }
    );

    return () => unsubscribe();
  }, [collection]);

  return { documents, isLoading, error };
}
