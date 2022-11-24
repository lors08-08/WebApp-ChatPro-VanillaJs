import { Block } from "../../../../utils/classes/Block/Block";
import { TElement } from "../../../../utils/classes/Block/types/types";
import Templator from "../../../../utils/classes/Templator";
import ChatPage from "./ChatPage.tmp";
import * as styles from "./ChatPage.module.scss";
import Store, { StoreEvents } from "../../../../utils/classes/Store";
import ChatCurrent from "../ChatCurrent/ChatCurrent";
import ProfileComponent from "../../components/Profile/Profile";
import AvatarComponent from "../../../../components/Avatar/Avatar";
import HeaderComponent from "../ChatCurrent/components/Header/Header";
import IconComponent from "../../../../components/Icon/Icon";
import BottomComponent from "../ChatCurrent/components/Bottom/Bottom";
import AttachIcon from "../../../../../static/img/attach";
import MessageInput from "../../components/MessageInput/MessageInput";
import SendButtonComponent from "../../components/SendButton/SendButton";
import ArrowRightIcon from "../../../../../static/img/arrow-right";

interface IChat {
  content: TElement;
}

const ctxMessageInput = {
  id: "message",
  name: "message",
  type: "text",
  placeholder: "Сообщение",
};

const Profile = new ProfileComponent({
  avatar: new AvatarComponent({}).getContent(),
  name: "No Name",
});

const Header = new HeaderComponent({
  profile: Profile.getContent(),
}).getContent();
const Bottom = new BottomComponent({
  attachIcon: new IconComponent({
    icon: AttachIcon,
    size: "styles.medium",
  }).getContent(),
  input: MessageInput(ctxMessageInput),
  sendButton: new SendButtonComponent({
    icon: new IconComponent({
      icon: ArrowRightIcon,
      size: "styles.medium",
      className: "styles.clickable",
    }).getContent(),
  }).getContent(),
}).getContent();

const template = new Templator(ChatPage);

class ChatPageComponent extends Block<IChat> {
  init() {
    Store.on(StoreEvents.UPDATED, () => {
      const currentChat = Store.getState().chat_selected;

      if (currentChat) {
        Profile.setProps({
          ...Profile.props,
          name: currentChat.title,
        });

        this.setProps({
          ...this.props,
          content: new ChatCurrent({
            header: Header,
            bottom: Bottom,
          }).getContent(),
        });
      }
    });
  }

  render() {
    return template.compile({ ...this.props }, styles);
  }
}

export default ChatPageComponent;
