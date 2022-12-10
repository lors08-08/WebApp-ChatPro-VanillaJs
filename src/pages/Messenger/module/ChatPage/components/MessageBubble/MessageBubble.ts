import MessageBubble from "@pages/Messenger/module/ChatPage/components/MessageBubble/MessageBubble.tmp";
import styles from "@pages/Messenger/module/ChatPage/components/MessageBubble/MessageBubble.module.scss";
import Templator from "@utils/classes/Templator";
import Block from "@utils/classes/Block/Block";
import { IMessage } from "@controllers/MessageController";

export interface IMessageBubble extends IMessage {
  className?: string;
  isFromUser?: boolean;
}

const tmp = new Templator(MessageBubble);

class MessageBubbleComponent extends Block<IMessageBubble> {
  render() {
    return tmp.compile(
      { ...this.props, className: this.props.isFromUser && "styles.from-user" },
      styles,
    );
  }
}

export default MessageBubbleComponent;
