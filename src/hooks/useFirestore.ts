import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  DocumentData,
  updateDoc,
  WithFieldValue,
} from 'firebase/firestore';
import { projectFirestore } from '../firebase/config';
import { useEffect, useReducer, useState } from 'react';

const initialState = {
  document: null,
  isPending: false,
  error: null,
  success: null,
};

const firestoreReducer = (
  state: any,
  action: { type: string; payload?: any }
) => {
  switch (action.type) {
    case 'IS_PENDING':
      return {
        document: null,
        isPending: true,
        error: null,
        success: false,
      };
    case 'ADDED_DOCUMENT':
      return {
        document: action.payload,
        isPending: false,
        error: null,
        success: true,
      };
    case 'UPDATED_DOCUMENT':
      return {
        isPending: false,
        document: action.payload,
        success: true,
        error: null,
      };
    case 'ERROR':
      return {
        document: null,
        isPending: false,
        error: action.payload,
        success: false,
      };
    default:
      return state;
  }
};

export const useFirestore = (collectionId: string) => {
  const [isCancelled, setIsCancelled] = useState<boolean>(false);
  const [response, dispatch] = useReducer(firestoreReducer, initialState);

  const ref = collection(projectFirestore, collectionId);

  const dispatchIfNotCancelled = (action: { type: string; payload?: any }) => {
    if (!isCancelled) {
      dispatch(action);
    }
  };

  const addDocument = async <Type>(doc: Type) => {
    dispatchIfNotCancelled({ type: 'IS_PENDING' });

    try {
      const addedDocument = await addDoc(ref, {
        ...doc,
      } as WithFieldValue<DocumentData>);
      dispatchIfNotCancelled({
        type: 'ADDED_DOCUMENT',
        payload: addedDocument,
      });
    } catch (err: any) {
      dispatchIfNotCancelled({ type: 'ERROR', payload: err.message });
    }
  };

  const deleteDocument = async (documentId: string) => {
    dispatch({ type: 'IS_PENDING' });

    try {
      const documentRef = doc(projectFirestore, collectionId, documentId);
      await deleteDoc(documentRef);
      dispatchIfNotCancelled({ type: 'DELETED_DOCUMENT' });
    } catch (err) {
      dispatchIfNotCancelled({ type: 'ERROR', payload: 'could not delete' });
    }
  };

  const updateDocument = async (
    documentId: string,
    updates: { [key: string]: any }
  ) => {
    dispatch({ type: 'IS_PENDING' });

    try {
      const documentRef = doc(projectFirestore, collectionId, documentId);
      const updatedDocument = await updateDoc(documentRef, updates);
      dispatchIfNotCancelled({
        type: 'UPDATED_DOCUMENT',
        payload: updatedDocument,
      });
    } catch (err) {
      dispatchIfNotCancelled({ type: 'ERROR', payload: 'could not update' });
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { addDocument, deleteDocument, updateDocument, response };
};
