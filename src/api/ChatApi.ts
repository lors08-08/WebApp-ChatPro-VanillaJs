import BaseApi from "./BaseApi";
import { IChatAllResponseDto } from "./types/chat/response/IChatAllResponseDto";
import { IChatAddRequestDto } from "./types/chat/request/IChatAddRequestDto";
import { IChatEditUserRequestDto } from "./types/chat/request/IChatEditUserRequestDto";
import { IChatTokenResponseDto } from "./types/chat/response/IChatTokenResponseDto";
import { IUpdateProfileResponseDto } from "./types/user/response/IUpdateProfileResponseDto";
import { IChatDeleteRequest } from "./types/chat/request/IChatDeleteRequest";

export class ChatApi extends BaseApi {
  constructor() {
    super("/chats");
  }

  fetch_chats(query?: string) {
    return this.http.get(query).then((dataInfo) => {
      return JSON.parse(`${dataInfo}`);
    }) as Promise<IChatAllResponseDto[]>;
  }

  get_users(id: number) {
    return this.http.get(`/${id}/users`).then((dataInfo) => {
      return JSON.parse(`${dataInfo}`);
    }) as Promise<IUpdateProfileResponseDto[]>;
  }

  add_chat(data: IChatAddRequestDto) {
    return this.http.post("", { data });
  }

  add_user(data: IChatEditUserRequestDto) {
    return this.http.put("/users", { data });
  }

  delete_user(data: IChatEditUserRequestDto) {
    return this.http.delete("/users", { data });
  }

  delete_chat(data: IChatDeleteRequest) {
    return this.http.delete("/", { data });
  }

  get_token(id: number) {
    return this.http.post(`/token/${id}`).then((dataInfo) => {
      return JSON.parse(`${dataInfo}`);
    }) as Promise<IChatTokenResponseDto>;
  }

  create = undefined;
  delete = undefined;
  update = undefined;
  read = undefined;
}

export default new ChatApi();
