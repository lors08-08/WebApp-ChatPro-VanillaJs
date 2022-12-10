import Api, { ChatApi } from "@api/ChatApi";
import { IChatAllResponseDto } from "@api/types/chat/response/IChatAllResponseDto";
import Store from "@utils/classes/Store";
import { IChatAddRequestDto } from "@api/types/chat/request/IChatAddRequestDto";
import { IChatEditUserRequestDto } from "@api/types/chat/request/IChatEditUserRequestDto";
import { IChatTokenResponseDto } from "@api/types/chat/response/IChatTokenResponseDto";
import MessageController from "@controllers/MessageController";
import { IUpdateProfileResponseDto } from "@api/types/user/response/IUpdateProfileResponseDto";
import { IChatDeleteRequest } from "@api/types/chat/request/IChatDeleteRequest";

class ChatController {
  private readonly api: ChatApi;

  constructor() {
    this.api = Api;
  }

  async fetchChats(query: string = "") {
    const chats = (await this.api.fetchChats(query)) as IChatAllResponseDto[];

    chats?.map(async (chat) => {
      const token = await this.getToken(chat.id);

      if (token) {
        await MessageController.connect(chat.id, token);
      }
    });

    Store.set("chat", chats);
  }

  async getUsers(id: number) {
    try {
      const users =
        ((await this.api.getUsers(id)) as IUpdateProfileResponseDto[]) || [];

      return users.length > 1;
    } catch (error) {
      const { reason } = error;

      throw new Error(reason);
    }
  }

  async addChat(data: IChatAddRequestDto) {
    try {
      await this.api.addChat(data);

      const chats = await this.fetchChats();

      Store.set("chat", chats);
    } catch (error) {
      const { reason } = error;

      throw new Error(reason);
    }
  }

  async addUser(data: IChatEditUserRequestDto) {
    try {
      await this.api.addUser(data);
    } catch (error) {
      const { reason } = error;

      throw new Error(reason);
    }
  }

  async deleteUser(data: IChatEditUserRequestDto) {
    try {
      await this.api.deleteUser(data);
    } catch (error) {
      const { reason } = error;

      throw new Error(reason);
    }
  }

  async deleteChat(data: IChatDeleteRequest) {
    try {
      await this.api.deleteChat(data);
    } catch (error) {
      const { reason } = error;

      // eslint-disable-next-line no-console
      console.error(reason);
    }
  }

  async getToken(chatId: number) {
    try {
      const { token } = (await this.api.getToken(
        chatId,
      )) as IChatTokenResponseDto;

      return token;
    } catch (error) {
      const { reason } = error;

      // eslint-disable-next-line no-console
      console.error(reason);
    }
  }
}

export default new ChatController();
