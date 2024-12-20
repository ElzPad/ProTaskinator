import { useEffect, useRef, useState } from 'react';
import { projectFirestore } from '../firebase/config';
import {
  collection,
  CollectionReference,
  DocumentData,
  onSnapshot,
  query as firestoreQuery,
  QueryConstraint,
} from 'firebase/firestore';

export function useCollection<Type>(
  collectionId: string,
  _query: QueryConstraint[]
) {
  const [documents, setDocuments] = useState<Type[] | null>();
  const [isLoading, setIsLoading] = useState<boolean>();
  const [error, setError] = useState<string | null>();

  const queryConstraints = useRef<QueryConstraint[]>(_query).current;

  useEffect(() => {
    let ref: CollectionReference<DocumentData, DocumentData> = collection(
      projectFirestore,
      collectionId
    );
    let q = firestoreQuery(ref, ...queryConstraints);
    setIsLoading(true);

    let unsubscribe = onSnapshot(
      q,
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
