import { useEffect, useRef, useState } from 'react';
import './ChatFrame.css';
import { ChatFrameProps } from './ChatFrame.types';
import Avatar from '../../atoms/Avatar/Avatar';
import ProfileIcon from '../../../assets/profileIcon.svg';
import DownArrowIcon from '../../../assets/downArrowIcon.svg';
import SendMessageIcon from '../../../assets/sendIcon.svg';
import MessageBar from '../../atoms/MessageBar/MessageBar';
import { useAuthContext } from '../../../hooks/useAuthContext';
import { useFirestore } from '../../../hooks/useFirestore';
import { MessageType } from '../../../types/message';
import { timestamp } from '../../../firebase/config';

export default function ChatFrame(props: ChatFrameProps) {
  const { user } = useAuthContext();
  const scrollableRef = useRef<HTMLDivElement | null>(null);
  const [showScrollButton, setShowScrollButton] = useState<boolean>(false);
  const [newMessage, setNewMessage] = useState<string>('');
  const { addDocument, response } = useFirestore('messages');

  const scrollToBottom = () => {
    if (scrollableRef.current) {
      scrollableRef.current.scrollTop = scrollableRef.current.scrollHeight;
    }
  };

  const checkIfAtBottom = () => {
    setShowScrollButton(
      scrollableRef.current?.scrollTop != undefined &&
        scrollableRef.current?.scrollTop +
          scrollableRef.current?.clientHeight <=
          scrollableRef.current?.scrollHeight - 60
    );
  };

  useEffect(() => {
    const container = scrollableRef.current;
    container?.addEventListener('scroll', checkIfAtBottom);
    return () => {
      container?.removeEventListener('scroll', checkIfAtBottom);
    };
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [props.messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      console.log('User not loaded');
    } else {
      const message: MessageType = {
        senderUid: user.uid,
        receiverUid: props.chattingWith.id,
        content: newMessage,
        type: 1,
        createdAt: timestamp.fromDate(new Date()),
        senderName: user.displayName ? user.displayName : 'User',
        isGroupChat: false,
      };
      addDocument<MessageType>(message);
      if (!response.error) {
        setNewMessage('');
      }
      scrollToBottom();
    }
  };

  return (
    <div className="chatContainer">
      <div
        className="chatHeader"
        onClick={() =>
          console.log(
            scrollableRef.current?.scrollTop,
            scrollableRef.current?.clientHeight,
            scrollableRef.current?.scrollHeight
          )
        }
      >
        {props.isLoading || props.isError ? (
          <>
            <Avatar src={ProfileIcon} />
            <div>
              <h4>...</h4>
              <div>
                <span
                  className={
                    props.chattingWith?.online ? 'onlineUser' : 'offlineUser'
                  }
                ></span>
                <span>Loading...</span>
              </div>
            </div>
          </>
        ) : (
          props.chattingWith && (
            <>
              <Avatar src={props.chattingWith.photoURL} />
              <div>
                <h4>{props.chattingWith.displayName}</h4>
                <div>
                  <span
                    className={
                      props.chattingWith.online ? 'onlineUser' : 'offlineUser'
                    }
                  ></span>
                  <span>
                    {props.chattingWith.online ? 'Online' : 'Offline'}
                  </span>
                </div>
              </div>
            </>
          )
        )}
      </div>
      <div className="scrollableContainer" ref={scrollableRef}>
        <div className="messagesContainer">
          {props.isError && <p className="error">an error occurred.</p>}
          {props.messages.length > 0 &&
            props.messages?.map((mex) => (
              <MessageBar
                message={mex}
                sent={mex.senderUid == user?.uid}
                isPopupNotification={false}
                key={mex.id}
              />
            ))}
        </div>
        {showScrollButton ? (
          <div className="scrollToBottom" onClick={scrollToBottom}>
            <img src={DownArrowIcon} alt="Scroll to bottom button" />
          </div>
        ) : (
          <div></div>
        )}
      </div>
      <div className="inputBar">
        <form onSubmit={handleSendMessage}>
          <input
            value={newMessage}
            required
            type="text"
            onChange={(e) => {
              setNewMessage(e.target.value);
            }}
            placeholder={props.isLoading ? '...' : 'Type new message...'}
            disabled={props.isLoading || props.isError}
          />
          <button className="btn">
            <img src={SendMessageIcon} alt="Send message button" />
          </button>
        </form>
      </div>
    </div>
  );
}
