import ChatContact from "./ChatContact.tmp";
import * as styles from "./ChatContact.module.scss";
import Templator from "../../../../utils/classes/Templator";
import { Block } from "../../../../utils/classes/Block/Block";
import { IEvent } from "../../../../common/types/types";

interface IChatContact {
  avatar?: Block;
  name: string;
  lastMessage?: string;
  timestamp?: string;
  notifier?: Block;
  event?: IEvent;
}

const tmp = new Templator(ChatContact);

class ChatEmptyComponent extends Block<IChatContact> {
  render() {
    const { event, ...props } = this.props;

    return tmp.compile({ ...props }, styles, event);
  }
}

export default ChatEmptyComponent;
