import Api, { ChatApi } from "../api/ChatApi";
import { IChatAllResponseDto } from "../api/types/chat/response/IChatAllResponseDto";
import Store from "../utils/classes/Store";
import { IChatAddRequestDto } from "../api/types/chat/request/IChatAddRequestDto";
import { IChatEditUserRequestDto } from "../api/types/chat/request/IChatEditUserRequestDto";
import { IChatTokenResponseDto } from "../api/types/chat/response/IChatTokenResponseDto";
import MessageController from "./MessageController";
import { IUpdateProfileResponseDto } from "../api/types/user/response/IUpdateProfileResponseDto";
import { IChatDeleteRequest } from "../api/types/chat/request/IChatDeleteRequest";

class ChatController {
  private readonly api: ChatApi;

  constructor() {
    this.api = Api;
  }

  async fetch_chats(query?: string) {
    try {
      const chats = (await this.api.fetch_chats(
        query,
      )) as IChatAllResponseDto[];

      chats.map(async (chat) => {
        const token = await this.get_token(chat.id);

        await MessageController.connect(chat.id, token);
      });

      Store.set("chat", chats);
    } catch (error) {
      const { reason } = error;

      throw new Error(reason);
    }
  }

  async get_users(id: number) {
    try {
      const users =
        ((await this.api.get_users(id)) as IUpdateProfileResponseDto[]) || [];

      return users.length > 1;
    } catch (error) {
      const { reason } = error;

      throw new Error(reason);
    }
  }

  async add_chat(data: IChatAddRequestDto) {
    try {
      await this.api.add_chat(data);

      const chats = await this.fetch_chats();

      Store.set("chat", chats);
    } catch (error) {
      const { reason } = error;

      throw new Error(reason);
    }
  }

  async add_user(data: IChatEditUserRequestDto) {
    try {
      await this.api.add_user(data);
    } catch (error) {
      const { reason } = error;

      throw new Error(reason);
    }
  }

  async delete_user(data: IChatEditUserRequestDto) {
    try {
      await this.api.delete_user(data);
    } catch (error) {
      const { reason } = error;

      throw new Error(reason);
    }
  }

  async delete_chat(data: IChatDeleteRequest) {
    try {
      await this.api.delete_chat(data);
    } catch (error) {
      const { reason } = error;

      throw new Error(reason);
    }
  }

  async get_token(chatId: number) {
    try {
      const { token } = (await this.api.get_token(
        chatId,
      )) as IChatTokenResponseDto;

      return token;
    } catch (error) {
      const { reason } = error;

      throw new Error(reason);
    }
  }
}

export default new ChatController();
