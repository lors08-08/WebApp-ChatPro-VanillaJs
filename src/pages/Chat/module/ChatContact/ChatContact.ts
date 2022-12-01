import ChatContact from "./ChatContact.tmp";
import * as styles from "./ChatContact.module.scss";
import Templator from "../../../../utils/classes/Templator";
import { Block } from "../../../../utils/classes/Block/Block";

interface IChatContact {
  avatar?: Block;
  name: string;
  lastMessage?: string;
  timestamp?: string;
  notifier?: Block;
  event?: {
    type: string;
    action(e: any): void;
  };
}

const tmp = new Templator(ChatContact);

class ChatEmptyComponent extends Block<IChatContact> {
  render() {
    const { event, ...props } = this.props;

    return tmp.compile({ ...props }, styles, event);
  }
}

export default ChatEmptyComponent;
