import BaseApi from "./BaseApi";
import { ISignUpDataRequestDto } from "./types/auth/request/ISignUpDataRequestDto";
import { ISignInDataRequestDto } from "./types/auth/request/ISignInDataRequestDto";

// interface IUser {
//   id: number;
//   first_name: string;
//   second_name: string;
//   login: string;
//   email: string;
//   password: string;
//   phone: string;
//   avatar: string;
// }

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
    return this.http.get("/user").then((data) => {
      return JSON.parse(`${data}`);
    }) as Promise<ISignUpDataRequestDto>;
  }

  create = undefined;
  delete = undefined;
  update = undefined;
}

export default new AuthApi();
