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
import { Pages } from "../../common/enums/Pages";
import ChatPageComponent from "./module/ChatPage/ChatPage";
import LayoutComponent from "../../components/Layout/Layout";
import ChatEmptyComponent from "./module/ChatEmpty/ChatEmpty";
import { withAuth } from "../../utils/hocs/withAuth";

interface IChat {
  sidebar: Block;
  main: Block;
}

const tmp = new Templator(Chat);

const ctxSearchInput = {
  id: "search",
  type: "text",
  inputVariant: "styles.ghost",
  placeholder: "Поиск",
  iconLeft: new IconComponent({
    icon: SearchIcon,
  }),
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

const protectedPage = withAuth(
  new ChatComponent({
    sidebar: new SidebarComponent({
      header: new HeaderComponent({
        button: new LinkComponent({
          id: "profile-link",
          to: Pages.SETTING,
          value: new ButtonComponent(profileBtnCtx),
        }),
        search: new LabelComponent({
          id: "search",
          value: SearchInput(ctxSearchInput),
        }),
      }),
      chatContacts: new LabelComponent({
        value: "Тут пусто, доабавьте что нибудь",
        className: "styles.medium center-text",
      }),
    }),
    main: new ChatPageComponent({
      content: new LayoutComponent({
        content: new ChatEmptyComponent({
          value: "Выберите чат чтобы отправить сообщение",
        }),
      }),
    }),
  }).getContent(),
);

export default protectedPage;
