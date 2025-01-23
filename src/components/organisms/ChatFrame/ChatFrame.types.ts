import { UserType } from '../../../types/user';
import { MessageType } from '../../../types/message';

export interface ChatFrameProps {
  chattingWith: UserType;
  messages: MessageType[];
  isLoading: boolean;
  isError: boolean;
}
