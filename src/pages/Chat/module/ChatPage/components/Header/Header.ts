import { Block } from "../../../../../../utils/classes/Block/Block";
import Templator from "../../../../../../utils/classes/Templator";
import Header from "./Header.tmp";
import * as styles from "./Header.module.scss";
import { TElement } from "../../../../../../utils/classes/Block/types/types";

interface IHeader {
  profile: TElement;
  optionsIcon: TElement;
}

const template = new Templator(Header);

class HeaderComponent extends Block<IHeader> {
  render() {
    return template.compile({ ...this.props }, styles);
  }
}

export default HeaderComponent;
