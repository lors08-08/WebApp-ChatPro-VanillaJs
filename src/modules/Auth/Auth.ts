import Templator from "../../utils/Templator";
import Auth from "./Auth.tmp";
import { Block } from "../../utils/Block";
import styles from "../../components/Button/Button.module.scss";

interface IAuth {
  title: string;
  fieldsClassName?: string;
  content: HTMLElement | HTMLElement[];
  buttons: HTMLElement | HTMLElement[];
}

const tmp = new Templator(Auth);

class AuthCardComponent extends Block {
  constructor(props: IAuth) {
    super(props);
  }

  render(): ChildNode {
    return tmp.compile({ ...this.props }, styles);
  }
}

export default AuthCardComponent;
