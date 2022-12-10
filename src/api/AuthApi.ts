import BaseApi from "@api/BaseApi";
import { ISignUpDataRequestDto } from "@api/types/auth/request/ISignUpDataRequestDto";
import { ISignInDataRequestDto } from "@api/types/auth/request/ISignInDataRequestDto";

export class AuthApi extends BaseApi {
  constructor() {
    super("/auth");
  }

  signIn(data: ISignInDataRequestDto) {
    return this.http.post("/signin", { data });
  }

  signUp(data: ISignUpDataRequestDto) {
    return this.http.post("/signup", { data });
  }

  logout() {
    return this.http.post("/logout");
  }

  read() {
    return this.http
      .get("/user")
      .then((data) => {
        return JSON.parse(`${data}`);
      })
      .catch((error) => {
        throw new Error(error);
      }) as Promise<ISignUpDataRequestDto>;
  }

  create = undefined;
  delete = undefined;
  update = undefined;
}

export default new AuthApi();
