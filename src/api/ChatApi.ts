import BaseApi from "./BaseApi";
import { IChatAllResponseDto } from "./types/chat/response/IChatAllResponseDto";
import { IChatAddRequestDto } from "./types/chat/request/IChatAddRequestDto";

export class ChatApi extends BaseApi {
  constructor() {
    super("/chats");
  }

  get_chats(query?: string) {
    return this.http.get(query).then((dataInfo) => {
      return JSON.parse(`${dataInfo}`);
    }) as Promise<IChatAllResponseDto[]>;
  }

  add_chat(data: IChatAddRequestDto) {
    return this.http.post("", { data });
  }

  create = undefined;
  delete = undefined;
  update = undefined;
  read = undefined;
}

export default new ChatApi();
