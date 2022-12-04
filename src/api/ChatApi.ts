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

  fetchChats(query?: string) {
    return this.http
      .get(query)
      .then((dataInfo) => {
        return JSON.parse(`${dataInfo}`);
      })
      .catch((error) => {
        throw new Error(error);
      }) as Promise<IChatAllResponseDto[]>;
  }

  getUsers(id: number) {
    return this.http
      .get(`/${id}/users`)
      .then((dataInfo) => {
        return JSON.parse(`${dataInfo}`);
      })
      .catch((error) => {
        throw new Error(error);
      }) as Promise<IUpdateProfileResponseDto[]>;
  }

  addChat(data: IChatAddRequestDto) {
    return this.http.post("", { data });
  }

  addUser(data: IChatEditUserRequestDto) {
    return this.http.put("/users", { data });
  }

  deleteUser(data: IChatEditUserRequestDto) {
    return this.http.delete("/users", { data });
  }

  deleteChat(data: IChatDeleteRequest) {
    return this.http.delete("/", { data });
  }

  getToken(id: number) {
    return this.http
      .post(`/token/${id}`)
      .then((dataInfo) => {
        return JSON.parse(`${dataInfo}`);
      })
      .catch((error) => {
        throw new Error(error);
      }) as Promise<IChatTokenResponseDto>;
  }

  create = undefined;
  delete = undefined;
  update = undefined;
  read = undefined;
}

export default new ChatApi();
