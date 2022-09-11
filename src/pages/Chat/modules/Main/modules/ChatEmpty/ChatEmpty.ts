import ChatEmpty from "./ChatEmpty.tmp";
import styles from "./ChatEmpty.module.scss";
import Templator from "../../../../../../utils/Templator";
import LayoutComponent from "../../../../../../components/Layout/Layout";
import { Block } from "../../../../../../utils/Block";

interface IChatEmpty {
  value: string;
}

const tmp = new Templator(ChatEmpty);

class ChatEmptyComponent extends Block {
  constructor(props: IChatEmpty) {
    super(props);
  }

  render(): ChildNode {
    return tmp.compile({ ...this.props }, styles);
  }
}

export default new LayoutComponent({
  content: new ChatEmptyComponent({
    value: "Выберите чат чтобы отправить сообщение",
  }).getContent(),
}).getContent();
