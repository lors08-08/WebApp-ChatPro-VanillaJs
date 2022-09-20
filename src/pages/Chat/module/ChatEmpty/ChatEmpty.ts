import ChatEmpty from "./ChatEmpty.tmp";
import * as styles from "./ChatEmpty.module.scss";
import Templator from "../../../../utils/classes/Templator";
import LayoutComponent from "../../../../components/Layout/Layout";
import { Block } from "../../../../utils/classes/Block/Block";

interface IChatEmpty {
  value: string;
}

const tmp = new Templator(ChatEmpty);

class ChatEmptyComponent extends Block<IChatEmpty> {
  render() {
    return tmp.compile({ ...this.props }, styles);
  }
}

export default new LayoutComponent({
  content: new ChatEmptyComponent({
    value: "Выберите чат чтобы отправить сообщение",
  }).getContent(),
}).getContent();
