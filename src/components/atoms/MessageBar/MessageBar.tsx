import './MessageBar.css';
import { MessageBarProps } from './MessageBar.types';
import { formatDistanceToNow } from 'date-fns';

export default function MessageBar(props: MessageBarProps) {
  const messageTypes = ['', 'notification', 'comment'];

  return (
    <div
      className={`messageBar ${props.isPopupNotification ? 'popup' : props.sent ? 'sent' : 'received'}`}
    >
      <div className={`messageContent ${messageTypes[props.message.type - 1]}`}>
        {props.message.isGroupChat && props.sent && (
          <div className="messageSender">{props.message.senderName}</div>
        )}
        <p>{props.message.content}</p>
        <p className="messageTimestamp">
          {formatDistanceToNow(props.message.createdAt.toDate(), {
            addSuffix: true,
          })}
        </p>
      </div>
    </div>
  );
}
