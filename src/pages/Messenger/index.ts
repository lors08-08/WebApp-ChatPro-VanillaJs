import Chat from "@pages/Messenger/Messenger.tmp";
import styles from "@pages/Messenger/Messenger.module.scss";
import Templator from "@utils/classes/Templator";
import SidebarComponent from "@pages/Messenger/module/Sidebar/Sidebar";
import HeaderComponent from "@pages/Messenger/module/Sidebar/module/Header/Header";
import ButtonComponent from "@components/Button/Button";
import LinkComponent from "@components/Link/Link";
import LabelComponent from "@components/Label/Label";
import IconComponent from "@components/Icon/Icon";
import SearchIcon from "@img/search.svg";
import ArrowRight from "@img/arrow-right-min.svg";
import Block from "@utils/classes/Block/Block";
import { Pages } from "@common/enums/Pages";
import ChatPageComponent from "@pages/Messenger/module/ChatPage/ChatPage";
import LayoutComponent from "@components/Layout/Layout";
import ChatEmptyComponent from "@pages/Messenger/module/ChatEmpty/ChatEmpty";
import { withAuth } from "@utils/hocs/withAuth";
import Store from "@utils/classes/Store";
import SearchInput from "@pages/Messenger/components/SearchInput/SearchInput";

interface IMessenger {
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
  event: {
    type: "input",
    action: (e: Event) => {
      const target = e.target as HTMLInputElement;

      Store.set("chat", Store.getState().chat);

      if (target.value) {
        target.focus();
      }
    },
  },
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

class ChatComponent extends Block<IMessenger> {
  render() {
    return tmp.compile({ ...this.props }, styles);
  }
}

const stub = SearchInput(ctxSearchInput);

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
          value: stub,
        }),
      }),
      chatContacts: new LabelComponent({
        value: "Тут пусто, доабавьте что нибудь",
        className: "styles.medium center-text",
      }),
      searchValue: stub.getValue(),
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
