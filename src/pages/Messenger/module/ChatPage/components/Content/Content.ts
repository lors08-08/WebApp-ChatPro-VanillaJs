import Content from "@pages/Messenger/module/ChatPage/components/Content/Content.tmp";
import styles from "@pages/Messenger/module/ChatPage/components/Content/Content.module.scss";
import Templator from "@utils/classes/Templator";
import Block from "@utils/classes/Block/Block";
import MessageBubble from "@pages/Messenger/module/ChatPage/components/MessageBubble/MessageBubble";
import Store from "@utils/classes/Store";
import { IMessage } from "@controllers/MessageController";
import LayoutComponent from "@components/Layout/Layout";
import ChatEmptyComponent from "@pages/Messenger/module/ChatEmpty/ChatEmpty";
import convertTimestamp from "@utils/funcs/convertTimestamp";

interface IContent {
  chatId: number;
  messagesList?: Block[] | Block;
}

const tmp = new Templator(Content);

const ChatsEmpty = new LayoutComponent({
  content: new ChatEmptyComponent({
    value: "Не сообщений в данном чате",
  }),
});

class ContentComponent extends Block<IContent> {
  private createMessage(props: IMessage[]): Block[] {
    const userId = Store.getState().user?.id;

    return props?.map((data) => {
      return new MessageBubble({
        ...data,
        isFromUser: data.user_id === userId,
        time: convertTimestamp(data.time),
      });
    });
  }

  protected init() {
    const messages = Store.getState().messages;

    if (messages) {
      const content = this.createMessage(messages[this.props.chatId]);

      this.setProps({
        ...this.props,
        messagesList: content && content.length ? content : ChatsEmpty,
      });
    }
  }

  render() {
    return tmp.compile({ ...this.props }, styles);
  }
}

export default ContentComponent;
