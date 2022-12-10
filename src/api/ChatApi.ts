import BaseApi from "@api/BaseApi";
import { IChatAllResponseDto } from "@api/types/chat/response/IChatAllResponseDto";
import { IChatAddRequestDto } from "@api/types/chat/request/IChatAddRequestDto";
import { IChatEditUserRequestDto } from "@api/types/chat/request/IChatEditUserRequestDto";
import { IChatTokenResponseDto } from "@api/types/chat/response/IChatTokenResponseDto";
import { IUpdateProfileResponseDto } from "@api/types/user/response/IUpdateProfileResponseDto";
import { IChatDeleteRequest } from "@api/types/chat/request/IChatDeleteRequest";

export class ChatApi extends BaseApi {
  constructor() {
    super("/chats");
  }

  fetchChats(query: string) {
    return this.http
      .get(query)
      .then((dataInfo) => {
        return JSON.parse(`${dataInfo}`);
      })
      .catch(() => {
        return;
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
