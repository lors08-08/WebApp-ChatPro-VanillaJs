import icon from "@components/Icon/Icon.tmp";
import Templator from "@utils/classes/Templator";
import styles from "@components/Icon/Icon.module.scss";
import Block from "@utils/classes/Block/Block";
import { IEvent } from "@common/types/types";

interface IIcon {
  className?: string;
  size?: string;
  color?: string;
  icon: any;
  event?: IEvent;
}

const tmp = new Templator(icon);

class IconComponent extends Block<IIcon> {
  render() {
    const { event, ...props } = this.props;

    return tmp.compile({ ...props }, styles, event);
  }
}

export default IconComponent;
