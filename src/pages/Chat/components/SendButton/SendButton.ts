import SendButton from "./SendButton.tmp";
import * as styles from "./SendButton.module.scss";
import Templator from "../../../../utils/classes/Templator";
import { Block } from "../../../../utils/classes/Block/Block";

interface ISendButton {
  icon: Block;
  event?: {
    type: string;
    action(e: any): void;
  };
}

const template = new Templator(SendButton);

class SendButtonComponent extends Block<ISendButton> {
  render(): DocumentFragment {
    const { event, ...props } = this.props;

    return template.compile({ ...props }, styles, event);
  }
}

export default SendButtonComponent;
