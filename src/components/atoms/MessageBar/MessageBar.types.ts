import { MessageType } from '../../../types/message';

export interface MessageBarProps {
  message: MessageType;
  sent: boolean;
  isPopupNotification: boolean;
}
