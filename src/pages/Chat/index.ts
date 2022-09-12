import Chat from "./Chat.tmp";
import styles from "./Chat.module.scss";
import Templator from "../../utils/classes/Templator";
import SidebarComponent from "./modules/Sidebar/Sidebar";
import MainComponent from "./modules/Main/modules/ChatEmpty/ChatEmpty";
import HeaderComponent from "./modules/Sidebar/modules/Header/Header";
import ChatContactComponent from "./modules/Sidebar/modules/ChatContact/ChatContact";
import AvatarComponent from "../../components/Avatar/Avatar";
import ButtonComponent from "../../components/Button/Button";
import SearchInput from "./components/SearchInput/SearchInput";
import LabelComponent from "../../components/Label/Label";
import IconComponent from "../../components/Icon/Icon";
import SearchIcon from "../../../static/img/search";
import ArrowRight from "../../../static/img/arrow-right-min";
import { Block } from "../../utils/classes/Block/Block";
import { TElement } from "../../utils/classes/Block/types/types";

interface IChat {
  sidebar: TElement;
  main: TElement;
}

const tmp = new Templator(Chat);

const chats = [
  {
    avatar: new AvatarComponent({}).getContent(),
    name: "Alex",
    lastMessage: "Where are u?",
    timestamp: "09:09",
  },
  {
    avatar: new AvatarComponent({}).getContent(),
    name: "John",
    lastMessage: "stfu",
    timestamp: "11:09",
  },
  {
    avatar: new AvatarComponent({}).getContent(),
    name: "Leon",
    lastMessage: "Wtf",
    timestamp: "19:00",
  },
  {
    avatar: new AvatarComponent({}).getContent(),
    name: "Penelopa",
    lastMessage: "Damn",
    timestamp: "12:09",
  },
];

const ctxSearchInput = {
  id: "search",
  type: "text",
  inputVariant: "styles.ghost",
  placeholder: "Поиск",
  iconLeft: new IconComponent({
    icon: SearchIcon,
  }).getContent(),
};

const profileBtnCtx = {
  value: "Профиль",
  type: "styles.text",
  color: "styles.grey",
  className: "styles.text",
  iconRight: new IconComponent({
    icon: ArrowRight,
    size: "styles.extra-small",
  }).getContent(),
};

class ChatComponent extends Block {
  constructor(props: IChat) {
    super(props);
  }

  render() {
    return tmp.compile({ ...this.props }, styles);
  }
}

export default new ChatComponent({
  sidebar: new SidebarComponent({
    header: new HeaderComponent({
      button: new ButtonComponent(profileBtnCtx).getContent(),
      search: new LabelComponent({
        id: "search",
        value: SearchInput(ctxSearchInput),
      }).getContent(),
    }).getContent(),
    chatContacts: chats.map(({ avatar, name, lastMessage, timestamp }) => {
      return new ChatContactComponent({
        avatar,
        name,
        lastMessage,
        timestamp,
      }).getContent();
    }),
  }).getContent(),
  main: MainComponent,
}).getContent();
