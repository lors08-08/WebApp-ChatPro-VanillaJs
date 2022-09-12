import LayoutTmp from "./Layout.tmp";
import styles from "./Layout.module.scss";
import Templator from "../../utils/classes/Templator";
import { Block } from "../../utils/classes/Block/Block";
import { TElement } from "../../utils/classes/Block/types/types";

interface ILayout {
  content: TElement;
  className?: string;
}

const tmp = new Templator(LayoutTmp);

class Layout extends Block {
  constructor(props: ILayout) {
    super(props);
  }

  render() {
    return tmp.compile({ ...this.props }, styles);
  }
}

export default Layout;
