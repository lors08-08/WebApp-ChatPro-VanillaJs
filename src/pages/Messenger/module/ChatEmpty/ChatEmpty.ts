import ChatEmpty from "@pages/Messenger/module/ChatEmpty/ChatEmpty.tmp";
import styles from "@pages/Messenger/module/ChatEmpty/ChatEmpty.module.scss";
import Templator from "@utils/classes/Templator";
import Block from "@utils/classes/Block/Block";

interface IChatEmpty {
  value: string;
}

const tmp = new Templator(ChatEmpty);

class ChatEmptyComponent extends Block<IChatEmpty> {
  render() {
    return tmp.compile({ ...this.props }, styles);
  }
}

export default ChatEmptyComponent;
