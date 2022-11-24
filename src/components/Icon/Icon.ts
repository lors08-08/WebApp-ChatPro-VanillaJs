import icon from "./Icon.tmp";
import Templator from "../../utils/classes/Templator";
import * as styles from "./Icon.module.scss";
import { Block } from "../../utils/classes/Block/Block";

interface IIcon {
  className?: string;
  size?: string;
  color?: string;
  icon: string;
  event?: {
    type: string;
    action(e: any): void;
  };
}

const tmp = new Templator(icon);

class IconComponent extends Block<IIcon> {
  render() {
    const { event, ...props } = this.props;

    return tmp.compile({ ...props }, styles, event);
  }
}

export default IconComponent;
