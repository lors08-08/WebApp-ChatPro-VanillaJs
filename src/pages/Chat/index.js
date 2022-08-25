import Chat from "./Chat.tmp"
import styles from "./Chat.module.scss"
import Templator from "../../utils/Templator";

import SidebarComponent from "./modules/Sidebar/Sidebar"
import MainComponent from "./modules/Main/modules/ChatEmpty/ChatEmpty"


import HeaderComponent from "./modules/Sidebar/modules/Header/Header"
import ChatContactComponent from "./modules/Sidebar/modules/ChatContact/ChatContact"

import AvatarComponent from "../../components/Avatar/Avatar"
import ButtonComponent from "../../components/Button/Button"
import SearchInput from "./components/SearchInput/SearchInput";
import LabelComponent from "../../components/Label/Label"
import IconComponent from "../../components/Icon/Icon"


import SearchIcon from "../../../static/img/search"
import ArrowRight from "../../../static/img/arrow-right-min"


const tmp = new Templator(Chat)

const chats = [
  {
    avatar: AvatarComponent({}),
    name: "Alex",
    lastMessage: "Where are u?",
    timestamp: "09:09"
  },
  {
    avatar: AvatarComponent({}),
    name: "John",
    lastMessage: "stfu",
    timestamp: "11:09"
  },
  {
    avatar: AvatarComponent({}),
    name: "Leon",
    lastMessage: "Wtf",
    timestamp: "19:00"
  },
  {
    avatar: AvatarComponent({}),
    name: "Penelopa",
    lastMessage: "Damn",
    timestamp: "12:09"
  }
]

const ctxSearchInput = {
  id: "search",
  type: "text",
  inputVariant: "styles.ghost",
  placeholder: "Поиск",
  iconLeft: IconComponent({
    icon: SearchIcon,
  })
}

const profileBtnCtx = {
  value: "Профиль",
  type: "styles.text",
  color: "styles.grey",
  className: "styles.text",
  iconRight: IconComponent({
    icon: ArrowRight,
    size: "styles.extra-small",
  })
}

const renderedTemplate = (...args) => tmp.compile(...args, styles)

export default renderedTemplate({
  sidebar: SidebarComponent({
    header: HeaderComponent({
      button: ButtonComponent(profileBtnCtx),
      search: LabelComponent({ id:"search", value: SearchInput(ctxSearchInput)})
    }),
    chatContacts: chats.map(({ avatar, name, lastMessage, timestamp}) => {
      return ChatContactComponent({
        avatar,
        name,
        lastMessage,
        timestamp
      })
    })
  }),
  main: MainComponent
})
