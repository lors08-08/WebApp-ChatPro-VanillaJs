import Header from "./Header.tmp";
import styles from "./Header.module.scss";
import Templator from "../../../../../../utils/Templator";
import { Block } from "../../../../../../utils/Block";

interface ISidebarComponent {
  button: HTMLElement;
  search: HTMLElement;
}

const tmp = new Templator(Header);

class HeaderComponent extends Block {
  constructor(props: ISidebarComponent) {
    super(props);
  }

  render(): ChildNode {
    return tmp.compile({ ...this.props }, styles);
  }
}

export default HeaderComponent;
