import Header from "./Header.tmp";
import * as styles from "./Header.module.scss";
import Templator from "../../../../../../utils/classes/Templator";
import { Block } from "../../../../../../utils/classes/Block/Block";
import { TElement } from "../../../../../../utils/classes/Block/types/types";

interface ISidebarComponent {
  button: TElement;
  search: TElement;
}

const tmp = new Templator(Header);

class HeaderComponent extends Block<ISidebarComponent> {
  render() {
    return tmp.compile({ ...this.props }, styles);
  }
}

export default HeaderComponent;
