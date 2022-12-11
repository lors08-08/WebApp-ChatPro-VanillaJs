import LayoutTmp from "@components/Layout/Layout.tmp";
import styles from "@components/Layout/Layout.module.scss";
import Templator from "@utils/classes/Templator";
import Block from "@utils/classes/Block/Block";

interface ILayout {
  content: Block;
  className?: string;
}

const tmp = new Templator(LayoutTmp);

class Layout extends Block<ILayout> {
  render() {
    return tmp.compile({ ...this.props }, styles);
  }
}

export default Layout;
