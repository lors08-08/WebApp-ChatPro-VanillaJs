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

  async updateAvatar(data: Blob) {
    try {
      const { id } = (await this.api.updateAvatar(
        data,
      )) as IUpdateProfileResponseDto;

      await this.fetchUser(id);
    } catch (error) {
      const { reason } = error;

      throw new Error(reason);
    }
  }

  async updateProfile(data: IUpdateProfileRequestDto) {
    try {
      const { id } = (await this.api.updateProfile(
        data,
      )) as IUpdateProfileResponseDto;

      await this.fetchUser(id);
    } catch (error) {
      const { reason } = error;

      throw new Error(reason);
    }
  }

  async updatePassword(data: IUpdatePasswordRequestDto) {
    try {
      await this.api.updatePassword(data);
    } catch (error) {
      const { reason } = error;

      throw new Error(reason);
    }
  }

  async searchUser(data: IUserSearchRequestDto) {
    try {
      const userId = await this.api.searchUser(data);

      return userId[0]?.id;
    } catch (error) {
      const { reason } = error;

      console.error(reason);
    }
  }

  async fetchUser(id: number) {
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
