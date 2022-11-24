import Api, { UserApi } from "../api/UserApi";
import { IUpdateProfileRequestDto } from "../api/types/user/request/IUpdateProfileRequestDto";
import Store from "../utils/classes/Store";
import { IUpdateProfileResponseDto } from "../api/types/user/response/IUpdateProfileResponseDto";
import { IUpdatePasswordRequestDto } from "../api/types/user/request/IUpdatePasswordRequestDto";

class UserController {
  private readonly api: UserApi;

  constructor() {
    this.api = Api;
  }

  async update_avatar(data: Blob) {
    try {
      const { id } = (await this.api.update_avatar(
        data,
      )) as IUpdateProfileResponseDto;

      await this.fetch_user(id);
    } catch (error) {
      const { reason } = error;

      console.log(error);
      throw new Error(reason);
    }
  }

  async update_profile(data: IUpdateProfileRequestDto) {
    try {
      const { id } = (await this.api.update_profile(
        data,
      )) as IUpdateProfileResponseDto;

      await this.fetch_user(id);
    } catch (error) {
      const { reason } = error;

      console.log(reason);
      throw new Error(reason);
    }
  }

  async update_password(data: IUpdatePasswordRequestDto) {
    try {
      await this.api.update_password(data);
    } catch (error) {
      const { reason } = error;

      console.log(reason);
      throw new Error(reason);
    }
  }

  async fetch_user(id: number) {
    try {
      const user = await this.api.read(id);

      Store.set("user", user);
    } catch (error) {
      const { reason } = error;

      console.log(reason);
      throw new Error(reason);
    }
  }
}

export default new UserController();
