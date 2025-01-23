import './Chat.css';

import { where } from 'firebase/firestore';
import ChatFrame from '../../components/organisms/ChatFrame/ChatFrame';
import { useCollection } from '../../hooks/useCollection';
import { useParams } from 'react-router-dom';
import { useDocument } from '../../hooks/useDocument';
import { MessageType } from '../../types/message';
import { UserType } from '../../types/user';
import { useEffect, useState } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';

const mergeMessages = (
  arr1: MessageType[],
  arr2: MessageType[]
): MessageType[] => {
  let mergedArray: MessageType[] = [];
  let i = 0;
  let j = 0;

  while (i < arr1.length && j < arr2.length) {
    if (arr1[i].createdAt < arr2[j].createdAt) {
      mergedArray.push(arr1[i]);
      i++;
    } else {
      mergedArray.push(arr2[j]);
      j++;
    }
  }

  while (i < arr1.length) {
    mergedArray.push(arr1[i]);
    i++;
  }
  while (j < arr2.length) {
    mergedArray.push(arr2[j]);
    j++;
  }

  return mergedArray;
};

export default function Chat() {
  const { id } = useParams();
  const { user } = useAuthContext();
  const {
    document: recipientUser,
    isLoading: recipientUserLoading,
    error: recipientUserError,
  } = useDocument<UserType>('users', id ? id : '');

  const {
    documents: sentMessages,
    isLoading: sentMessagesLoading,
    error: sentMessagesError,
  } = useCollection<MessageType>(
    'messages',
    [where('receiverUid', '==', id), where('senderUid', '==', user?.uid)],
    'createdAt',
    'asc'
  );
  const {
    documents: receivedMessages,
    isLoading: recMessagesLoading,
    error: recMessagesError,
  } = useCollection<MessageType>(
    'messages',
    [where('receiverUid', '==', user?.uid), where('senderUid', '==', id)],
    'createdAt',
    'asc'
  );
  const [allMessages, setAllMessages] = useState<MessageType[]>([]);

  useEffect(() => {
    if (sentMessages && receivedMessages) {
      setAllMessages(mergeMessages(sentMessages, receivedMessages));
    }
  }, [sentMessages, receivedMessages]);

  return (
    <>
      {recipientUser && (
        <ChatFrame
          chattingWith={recipientUser}
          messages={allMessages}
          isLoading={
            (recipientUserLoading != undefined && recipientUserLoading) ||
            (recMessagesLoading != undefined && recMessagesLoading) ||
            (sentMessagesLoading != undefined && sentMessagesLoading)
          }
          isError={
            recipientUserError != null ||
            recMessagesError != null ||
            sentMessagesError != null
          }
        />
      )}
    </>
  );
}
