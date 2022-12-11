import BaseApi from "@api/BaseApi";
import { IUpdateProfileRequestDto } from "@api/types/user/request/IUpdateProfileRequestDto";
import { IUpdatePasswordRequestDto } from "@api/types/user/request/IUpdatePasswordRequestDto";
import { IUpdateProfileResponseDto } from "@api/types/user/response/IUpdateProfileResponseDto";
import { IUserSearchRequestDto } from "@api/types/user/request/IUserSearchRequestDto";

export class UserApi extends BaseApi {
  constructor() {
    super("/user");
  }

  updateAvatar(data: Blob) {
    const formData = new FormData();

    formData.append("avatar", data);

    return this.http
      .put("/profile/avatar", {
        data: formData,
      })
      .then((dataInfo) => {
        return JSON.parse(`${dataInfo}`);
      })
      .catch((error) => {
        throw new Error(error);
      }) as Promise<IUpdateProfileResponseDto>;
  }

  updateProfile(data: IUpdateProfileRequestDto) {
    return this.http
      .put("/profile", { data })
      .then((dataInfo) => {
        return JSON.parse(`${dataInfo}`);
      })
      .catch((error) => {
        throw new Error(error);
      }) as Promise<IUpdateProfileResponseDto>;
  }

  updatePassword(data: IUpdatePasswordRequestDto) {
    return this.http.put("/password", { data });
  }

  searchUser(data: IUserSearchRequestDto) {
    return this.http
      .post("/search", { data })
      .then((dataInfo) => {
        return JSON.parse(`${dataInfo}`);
      })
      .catch((error) => {
        throw new Error(error);
      }) as Promise<IUpdateProfileResponseDto[]>;
  }

  read(id: number) {
    return this.http
      .get(`/${id}`)
      .then((data) => {
        return JSON.parse(`${data}`);
      })
      .catch((error) => {
        throw new Error(error);
      }) as Promise<IUpdateProfileResponseDto>;
  }

  create = undefined;
  delete = undefined;
  update = undefined;
}

export default new UserApi();
