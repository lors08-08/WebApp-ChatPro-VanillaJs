import ButtonTmp from "./Button.tmp";
import * as styles from "./Button.module.scss";
import Templator from "../../utils/classes/Templator";
import { Block } from "../../utils/classes/Block/Block";
import { TElement } from "../../utils/classes/Block/types/types";

interface IButton {
  id?: string;
  value: string;
  className?: string;
  type?: string;
  color?: string;
  iconRight?: TElement;
  event?: {
    type: string;
    action(e: any): void;
  };
}

const tmp = new Templator(ButtonTmp);

class ButtonComponent extends Block<IButton> {
  render() {
    const { event, ...props } = this.props;

    return tmp.compile({ ...props }, styles, event);
  }
}

export default ButtonComponent;
