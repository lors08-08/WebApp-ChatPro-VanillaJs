import Templator from "../../utils/classes/Templator";
import Auth from "./Auth.tmp";
import { Block } from "../../utils/classes/Block/Block";
import * as styles from "./Auth.module.scss";
import { TElement } from "../../utils/classes/Block/types/types";

interface IAuth {
  title: string;
  fieldsClassName?: string;
  wrapperClass?: string;
  content: TElement | TElement[];
  buttons: TElement | TElement[];
}

const tmp = new Templator(Auth);

class AuthCardComponent extends Block<IAuth> {
  render() {
    return tmp.compile({ ...this.props }, styles);
  }
}

export default AuthCardComponent;
