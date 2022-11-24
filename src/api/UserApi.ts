import BaseApi from "./BaseApi";
import { IUpdateProfileRequestDto } from "./types/user/request/IUpdateProfileRequestDto";
import { IUpdatePasswordRequestDto } from "./types/user/request/IUpdatePasswordRequestDto";
import { IUpdateProfileResponseDto } from "./types/user/response/IUpdateProfileResponseDto";

export class UserApi extends BaseApi {
  constructor() {
    super("/user");
  }

  update_avatar(data: Blob) {
    const formData = new FormData();

    formData.append("avatar", data);

    return this.http
      .put("/profile/avatar", {
        data: formData,
      })
      .then((dataInfo) => {
        return JSON.parse(`${dataInfo}`);
      }) as Promise<IUpdateProfileResponseDto>;
  }

  update_profile(data: IUpdateProfileRequestDto) {
    return this.http.put("/profile", { data }).then((dataInfo) => {
      return JSON.parse(`${dataInfo}`);
    }) as Promise<IUpdateProfileResponseDto>;
  }

  update_password(data: IUpdatePasswordRequestDto) {
    return this.http.put("/password", { data });
  }

  read(id: number) {
    return this.http.get(`/${id}`).then((data) => {
      return JSON.parse(`${data}`);
    }) as Promise<IUpdateProfileResponseDto>;
  }

  create = undefined;
  delete = undefined;
  update = undefined;
}

export default new UserApi();
