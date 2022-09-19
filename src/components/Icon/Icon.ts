import icon from "./Icon.tmp";
import Templator from "../../utils/classes/Templator";
import styles from "./Icon.module.scss";
import { Block } from "../../utils/classes/Block/Block";

interface IIcon {
  className?: string;
  size?: string;
  color?: string;
  icon: string;
}

const tmp = new Templator(icon);

class IconComponent extends Block {
  constructor(props: IIcon) {
    super(props);
  }

  render() {
    return tmp.compile({ ...this.props }, styles);
  }
}

export default IconComponent;
