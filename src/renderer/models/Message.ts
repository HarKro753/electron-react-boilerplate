import { FileReference } from './FileReference';

export enum SenderEnum {
  User = 'user',
  Assistant = 'assistant',
}

export type Message = {
  id: number;
  text: string;
  sender: SenderEnum;
  thought?: string;
  fileReference?: FileReference;
};
