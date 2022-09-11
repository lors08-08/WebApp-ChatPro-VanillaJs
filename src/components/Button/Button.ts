import ButtonTmp from "./Button.tmp";
import styles from "./Button.module.scss";
import Templator from "../../utils/Templator";
import { IContextData } from "../../common/types/types";
import { Block } from "../../utils/Block";

export interface IEvent {
  type: string;
  action(e?: HTMLElement): void;
}

interface IButton {
  value: string;
  className?: string;
  type?: string;
  color?: string;
  iconRight?: DocumentFragment;
}

const tmp = new Templator(ButtonTmp);

class ButtonComponent extends Block {
  constructor(props: IButton) {
    super(props);
  }

  render(): ChildNode {
    return tmp.compile({ ...this.props }, styles);
  }
}

export default ButtonComponent;
