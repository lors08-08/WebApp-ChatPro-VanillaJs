import ChatContact from "./ChatContact.tmp";
import styles from "./ChatContact.module.scss";
import Templator from "../../../../../../utils/classes/Templator";
import { Block } from "../../../../../../utils/classes/Block/Block";
import { TElement } from "../../../../../../utils/classes/Block/types/types";

interface IChatContact {
  avatar: TElement;
  name: string;
  lastMessage: string;
  timestamp: string;
  notifier?: string;
}

const tmp = new Templator(ChatContact);

class ChatEmptyComponent extends Block {
  constructor(props: IChatContact) {
    super(props);
  }

  render() {
    return tmp.compile({ ...this.props }, styles);
  }
}

export default ChatEmptyComponent;
