import { Block } from "../../../../utils/classes/Block/Block";
import { TElement } from "../../../../utils/classes/Block/types/types";
import Templator from "../../../../utils/classes/Templator";
import ChatPage from "./ChatCurrent.tmp";
import * as styles from "./ChatCurrent.module.scss";

interface IChat {
  header: TElement;
  bottom: TElement;
}

const template = new Templator(ChatPage);

class ChatCurrentComponent extends Block<IChat> {
  render() {
    return template.compile({ ...this.props }, styles);
  }
}

export default ChatCurrentComponent;
