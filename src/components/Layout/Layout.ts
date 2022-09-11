import LayoutTmp from "./Layout.tmp";
import styles from "./Layout.module.scss";
import Templator from "../../utils/Templator";
import { Block } from "../../utils/Block";

interface ILayout {
  content: HTMLElement;
  className?: string;
}

const tmp = new Templator(LayoutTmp);

class Layout extends Block {
  constructor(props: ILayout) {
    super(props);
  }

  render(): string {
    return tmp.compile({ ...this.props }, styles);
  }
}

export default Layout;
