import Chat from "./Chat.tmp";
import * as styles from "./Chat.module.scss";
import Templator from "../../utils/classes/Templator";
import SidebarComponent from "./module/Sidebar/Sidebar";
import HeaderComponent from "./module/Sidebar/module/Header/Header";
import ButtonComponent from "../../components/Button/Button";
import LinkComponent from "../../components/Link/Link";
import SearchInput from "./components/SearchInput/SearchInput";
import LabelComponent from "../../components/Label/Label";
import IconComponent from "../../components/Icon/Icon";
import SearchIcon from "../../../static/img/search";
import ArrowRight from "../../../static/img/arrow-right-min";
import { Block } from "../../utils/classes/Block/Block";
import { TElement } from "../../utils/classes/Block/types/types";
import { Pages } from "../../common/enums/Pages";
import MainComponent from "./module/ChatPage/ChatPage";

interface IChat {
  sidebar: TElement;
  main: TElement;
}

const tmp = new Templator(Chat);

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

class ChatComponent extends Block<IChat> {
  render() {
    return tmp.compile({ ...this.props }, styles);
  }
}

export default new ChatComponent({
  sidebar: new SidebarComponent({
    header: new HeaderComponent({
      button: new LinkComponent({
        id: "profile-link",
        to: Pages.SETTING,
        value: new ButtonComponent(profileBtnCtx).getContent(),
      }).getContent(),
      search: new LabelComponent({
        id: "search",
        value: SearchInput(ctxSearchInput),
      }).getContent(),
    }).getContent(),
    chatContacts: new LabelComponent({
      value: "Тут пусто, доабавьте что нибудь",
      className: "styles.medium center-text",
    }).getContent(),
  }).getContent(),
  main: new MainComponent({
    content: new LabelComponent({
      value: "Выберите чат чтобы отправить сообщение",
      className: "styles.medium",
    }).getContent(),
  }).getContent(),
}).getContent();
