import icon from "./Icon.tmp";
import Templator from "../../utils/Templator";
import styles from "./Icon.module.scss";
import { Block } from "../../utils/Block";
import { IContextData } from "../../common/types/types";

interface IIcon {
  size?: string;
  color?: string;
  icon: string;
}

const tmp = new Templator(icon);

class IconComponent extends Block {
  constructor(props: IIcon) {
    super(props);
  }

  render(): ChildNode {
    return tmp.compile({ ...this.props }, styles);
  }
}

export default IconComponent;
