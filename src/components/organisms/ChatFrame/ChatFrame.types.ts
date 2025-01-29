import { UserType } from '../../../types/user';
import { MessageType } from '../../../types/message';

export interface ChatFrameProps {
  chattingWith?: UserType;
  groupChat?: string;
  messages: MessageType[];
  isLoading: boolean;
  isError: boolean;
}
