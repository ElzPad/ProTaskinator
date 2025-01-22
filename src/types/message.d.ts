export interface MessageType {
  id?: string;
  senderUid: string;
  senderName: string;
  receiverUid: string;
  type: number;
  content: string;
  createdAt: timestamp;
  isGroupChat: boolean;
}
