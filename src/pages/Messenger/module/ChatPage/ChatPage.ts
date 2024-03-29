import Block from "@utils/classes/Block/Block";
import Templator from "@utils/classes/Templator";
import ChatPage from "@pages/Messenger/module/ChatPage/ChatPage.tmp";
import styles from "@pages/Messenger/module/ChatPage/ChatPage.module.scss";
import Store, { StoreEvents } from "@utils/classes/Store";
import AvatarComponent from "@components/Avatar/Avatar";
import HeaderComponent from "@pages/Messenger/module/ChatPage/components/Header/Header";
import BottomComponent from "@pages/Messenger/module/ChatPage/components/Bottom/Bottom";
import IconComponent from "@components/Icon/Icon";
import ProfileComponent from "@pages/Messenger/components/Profile/Profile";
import AttachIcon from "@img/attach.svg";
import {
  MessageField,
  MessageInput,
} from "@pages/Messenger/components/MessageInput/MessageInput";
import SendButtonComponent from "@pages/Messenger/components/SendButton/SendButton";
import ArrowRightIcon from "@img/arrow-right.svg";
import ContentComponent from "@pages/Messenger/module/ChatPage/components/Content/Content";
import MessageController from "@controllers/MessageController";
import ChatEmptyComponent from "@pages/Messenger/module/ChatEmpty/ChatEmpty";
import LayoutComponent from "@components/Layout/Layout";
import ImageComponent from "@components/Image/Image";
import { resources } from "@common/constant";

interface IChat {
  header?: Block;
  content: Block;
  bottom?: Block;
}

const Profile = new ProfileComponent({
  avatar: new AvatarComponent({}),
  name: "No Name",
});

const Bottom = new BottomComponent({
  attachIcon: new IconComponent({
    icon: AttachIcon,
    size: "styles.medium",
  }),
  input: MessageField(),
  sendButton: new SendButtonComponent({
    icon: new IconComponent({
      icon: ArrowRightIcon,
      size: "styles.medium",
      className: "styles.clickable",
    }),
    event: {
      type: "click",
      action: () => {
        const chatId = Store.getState().chat_selected?.id;

        if (chatId) {
          MessageController.sendMessage(chatId, MessageInput.getValue());

          MessageInput.resetValue();
        }
      },
    },
  }),
});

const template = new Templator(ChatPage);

class ChatPageComponent extends Block<IChat> {
  setEmptyPage() {
    this.setProps({
      ...this.props,
      header: undefined,
      content: new LayoutComponent({
        content: new ChatEmptyComponent({
          value: "Выберите чат чтобы отправить сообщение",
        }),
      }),
      bottom: undefined,
    });
  }

  init() {
    Store.on(StoreEvents.UPDATED, async () => {
      const currentChat = Store.getState().chat_selected;

      if (currentChat) {
        Profile.setProps({
          ...Profile.props,
          name: currentChat.title,
          avatar: currentChat.avatar
            ? new ImageComponent({
                src: resources + currentChat.avatar,
              })
            : new AvatarComponent({
                size: "styles.small",
              }),
        });

        this.setProps({
          ...this.props,
          header: new HeaderComponent({
            profile: Profile,
            chatId: currentChat.id,
          }),
          content: new ContentComponent({ chatId: currentChat.id }),
          bottom: Bottom,
        });
      } else {
        this.setEmptyPage();
      }
    });
  }

  render() {
    return template.compile({ ...this.props }, styles);
  }
}

export default ChatPageComponent;
