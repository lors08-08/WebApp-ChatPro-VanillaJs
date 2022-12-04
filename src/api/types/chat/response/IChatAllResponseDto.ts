interface IUser {
  first_name: string;
  second_name: string;
  avatar: string;
  email: string;
  login: string;
  phone: string;
}
interface IMessage {
  user: IUser;
  time: string;
  content: string;
}

export interface IChatAllResponseDto {
  id: number;
  title: string;
  avatar: string | null;
  unread_count: number;
  last_message: IMessage | null;
}
