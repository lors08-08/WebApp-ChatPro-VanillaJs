import Templator from "../../utils/classes/Templator";
import Auth from "./Auth.tmp";
import { Block } from "../../utils/classes/Block/Block";
import * as styles from "./Auth.module.scss";

interface IAuth {
  title: string;
  fieldsClassName?: string;
  wrapperClass?: string;
  serverError?: Block;
  content: Block | Block[];
  buttons: Block | Block[];
}

const tmp = new Templator(Auth);

class AuthCardComponent extends Block<IAuth> {
  render() {
    return tmp.compile({ ...this.props }, styles);
  }
}

export default AuthCardComponent;
