import ChatContact from "./ChatContact.tmp";
import styles from "./ChatContact.module.scss";
import Templator from "../../../../../../utils/Templator";
import { Block } from "../../../../../../utils/Block";

interface IChatContact {
  avatar: string;
  name: string;
  lastMessage: string;
  timestamp: string;
  notifier: string;
}

const tmp = new Templator(ChatContact);

class ChatEmptyComponent extends Block {
  constructor(props: IChatContact) {
    super(props);
  }

  render(): ChildNode {
    return tmp.compile({ ...this.props }, styles);
  }
}

export default ChatEmptyComponent;
