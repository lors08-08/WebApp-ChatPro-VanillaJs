import Api, { ChatApi } from "../api/ChatApi";
import { IChatAllResponseDto } from "../api/types/chat/response/IChatAllResponseDto";
import Store from "../utils/classes/Store";
import { IChatAddRequestDto } from "../api/types/chat/request/IChatAddRequestDto";

class ChatController {
  private readonly api: ChatApi;

  constructor() {
    this.api = Api;
  }

  async get_chats(query?: string) {
    try {
      const chat = (await this.api.get_chats(query)) as IChatAllResponseDto[];

      Store.set("chat", chat);
    } catch (error) {
      const { reason } = error;

      console.log(reason);
      throw new Error(reason);
    }
  }

  async add_chat(data: IChatAddRequestDto) {
    try {
      await this.api.add_chat(data);

      const chats = await this.get_chats();

      Store.set("chat", chats);
    } catch (error) {
      const { reason } = error;

      console.log(reason);
    }
  }
}

export default new ChatController();
