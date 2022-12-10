import SendButton from "@pages/Messenger/components/SendButton/SendButton.tmp";
import styles from "@pages/Messenger/components/SendButton/SendButton.module.scss";
import Templator from "@utils/classes/Templator";
import Block from "@utils/classes/Block/Block";
import { IEvent } from "@common/types/types";

interface ISendButton {
  icon: Block;
  event?: IEvent;
}

const template = new Templator(SendButton);

class SendButtonComponent extends Block<ISendButton> {
  render(): DocumentFragment {
    const { event, ...props } = this.props;

    return template.compile({ ...props }, styles, event);
  }
}

export default SendButtonComponent;
