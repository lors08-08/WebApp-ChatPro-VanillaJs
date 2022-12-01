import Api, { UserApi } from "../api/UserApi";
import { IUpdateProfileRequestDto } from "../api/types/user/request/IUpdateProfileRequestDto";
import Store from "../utils/classes/Store";
import { IUpdateProfileResponseDto } from "../api/types/user/response/IUpdateProfileResponseDto";
import { IUpdatePasswordRequestDto } from "../api/types/user/request/IUpdatePasswordRequestDto";
import { IUserSearchRequestDto } from "../api/types/user/request/IUserSearchRequestDto";

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

      throw new Error(reason);
    }
  }

  async update_password(data: IUpdatePasswordRequestDto) {
    try {
      await this.api.update_password(data);
    } catch (error) {
      const { reason } = error;

      throw new Error(reason);
    }
  }

  async search_user(data: IUserSearchRequestDto) {
    try {
      const userId = await this.api.search_user(data);

      return userId[0]?.id;
    } catch (error) {
      const { reason } = error;

      throw new Error(reason);
    }
  }

  async fetch_user(id: number) {
    try {
      const user = await this.api.read(id);

      Store.set("user", user);
    } catch (error) {
      const { reason } = error;

      throw new Error(reason);
    }
  }
}

export default new UserController();
