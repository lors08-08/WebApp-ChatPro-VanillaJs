import Api, { AuthApi } from "../api/AuthApi";
import { ISignInDataRequestDto } from "../api/types/auth/request/ISignInDataRequestDto";
import { ISignUpDataRequestDto } from "../api/types/auth/request/ISignUpDataRequestDto";
import Store from "../utils/classes/Store";
import Router from "../utils/classes/Routing/Router";
import { Pages } from "../common/enums/Pages";

class AuthController {
  private readonly api: AuthApi;

  constructor() {
    this.api = Api;
  }

  async signIn(data: ISignInDataRequestDto) {
    try {
      await this.api.signIn(data);

      await this.fetchUser();

      Router.go(Pages.MESSENGER);
    } catch (error) {
      const { reason } = error;

      throw new Error(reason);
    }
  }
  async signUp(data: ISignUpDataRequestDto) {
    await this.api.signUp(data);

    await this.fetchUser();

    Router.go(Pages.MESSENGER);
  }
  async logout() {
    await this.api.logout();

    Router.go(Pages.SIGN_IN);
  }
  async fetchUser() {
    const user = await this.api.read();

    Store.set("user", user);
  }
}

export default new AuthController();
