import ButtonTmp from "./Button.tmp";
import styles from "./Button.module.scss";
import Templator from "../../utils/classes/Templator";
import { Block } from "../../utils/classes/Block/Block";
import { TElement } from "../../utils/classes/Block/types/types";

export interface IEvent {
  type: string;
  action(e?: HTMLElement): void;
}

interface IButton {
  value: string;
  className?: string;
  type?: string;
  color?: string;
  iconRight?: TElement;
}

const tmp = new Templator(ButtonTmp);

class ButtonComponent extends Block {
  constructor(props: IButton) {
    super(props);
  }

  render() {
    return tmp.compile({ ...this.props }, styles);
  }
}

export default ButtonComponent;
