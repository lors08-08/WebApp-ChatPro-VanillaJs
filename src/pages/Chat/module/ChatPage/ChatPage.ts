import { Block } from "../../../../utils/classes/Block/Block";
import { TElement } from "../../../../utils/classes/Block/types/types";
import Templator from "../../../../utils/classes/Templator";
import ChatPage from "./ChatPage.tmp";
import * as styles from "./ChatPage.module.scss";
import HeaderComponent from "./components/Header/Header";
import ProfileComponent from "../../components/Profile/Profile";
import AvatarComponent from "../../../../components/Avatar/Avatar";
import IconComponent from "../../../../components/Icon/Icon";
import OptionsIcon from "../../../../../static/img/options";
import ArrowRightIcon from "../../../../../static/img/arrow-right";
import AttachIcon from "../../../../../static/img/attach";
import BottomComponent from "./components/Bottom/Bottom";
import MessageInput from "../../components/MessageInput/MessageInput";
import SendButtonComponent from "../../components/SendButton/SendButton";

interface IChat {
  header: TElement;
  bottom: TElement;
}

const ctxMessageInput = {
  id: "message",
  name: "message",
  type: "text",
  placeholder: "Сообщение",
};

const Profile = new ProfileComponent({
  avatar: new AvatarComponent({}).getContent(),
  name: "Джо",
}).getContent();

const Header = new HeaderComponent({
  profile: Profile,
  optionsIcon: new IconComponent({
    icon: OptionsIcon,
    className: "styles.clickable",
  }).getContent(),
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
      className: "styles.clickablea",
    }).getContent(),
  }).getContent(),
}).getContent();

const template = new Templator(ChatPage);

class ChatPageComponent extends Block<IChat> {
  render() {
    return template.compile({ ...this.props }, styles);
  }
}

export default new ChatPageComponent({
  header: Header,
  bottom: Bottom,
});
