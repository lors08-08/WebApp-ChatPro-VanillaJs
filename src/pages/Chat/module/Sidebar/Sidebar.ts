import Sidebar from "./Sidebar.tmp";
import * as styles from "./Sidebar.module.scss";
import Templator from "../../../../utils/classes/Templator";
import { Block } from "../../../../utils/classes/Block/Block";
import { TElement } from "../../../../utils/classes/Block/types/types";
import Store, { StoreEvents } from "../../../../utils/classes/Store";
import ChatController from "../../../../controllers/ChatController";
import ChatContactComponent from "../ChatContact/ChatContact";
import AvatarComponent from "../../../../components/Avatar/Avatar";
import LayoutComponent from "../../../../components/Layout/Layout";
import ChatEmptyComponent from "../ChatEmpty/ChatEmpty";
import NotifierComponent from "../../components/Notifier/Notifier";
import Modal from "../../../../module/Modal/Modal";
import ButtonComponent from "../../../../components/Button/Button";
import InputComponent from "../../../../components/Input/Input";

interface ISidebarComponent {
  modal?: TElement;
  header: TElement;
  chatContacts: TElement | TElement[];
  addChatBtn?: TElement;
}

const tmp = new Templator(Sidebar);

const ChatsEmpty = new LayoutComponent({
  content: new ChatEmptyComponent({
    value: "Тут пусто",
  }).getContent(),
}).getContent();

class SidebarComponent extends Block<ISidebarComponent> {
  title: string | undefined;
  modal = new Modal({
    id: "modal-background",
    title: "Название чата",
    darkBack: "styles.dark-background ",
    input: new InputComponent({ id: "chat-title" }).getContent(),
    actionBtn: new ButtonComponent({
      value: "Добавить",
      event: {
        type: "click",
        action: async (e) => {
          e.preventDefault();

          if (!this.title) {
            this.modal.setProps({
              ...this.modal.props,
              error: "Нужно выбрать файл",
            });

            return;
          }

          try {
            const closeBtn = new ButtonComponent({
              value: "Закрыть",
              className: "styles.ghost",
              event: {
                type: "click",
                action: () => this.closeModal(),
              },
            }).getContent();

            await ChatController.add_chat({ title: this.title });

            this.modal.setProps({
              ...this.modal.props,
              title: "Success",
              className: "styles.success",
              closeBtn: closeBtn,
            });
          } catch (error) {
            this.modal.setProps({
              ...this.modal.props,
              error: error,
            });
          }
        },
      },
    }).getContent(),
    event: {
      type: "click",
      action: (e: Event) => {
        e.stopPropagation();

        this.closeModal();
      },
    },
  });

  closeModal() {
    this.setProps({ ...this.props, modal: undefined });
    this.modal.setProps({
      ...this.modal.props,
      error: undefined,
      title: "Название чата",
      className: "styles.title",
      closeBtn: undefined,
    });
  }

  openModal() {
    this.setProps({
      ...this.props,
      modal: this.modal.getContent(),
    });
  }

  init() {
    ChatController.get_chats();

    this.setProps({
      ...this.props,
      addChatBtn: new ButtonComponent({
        value: "Добавить чат",
        className: "styles.ghost",
        event: {
          type: "click",
          action: () => {
            this.openModal();
          },
        },
      }).getContent(),
    });

    Store.on(StoreEvents.UPDATED, () => {
      const chats = Store.getState().chat;

      this.setProps({
        ...this.props,
        chatContacts:
          !chats || chats.length < 1
            ? ChatsEmpty
            : chats.map(({ id, avatar, title, last_message, unread_count }) => {
                return new ChatContactComponent({
                  avatar: new AvatarComponent({
                    size: "styles.small",
                  }).getContent(),
                  name: title,
                  lastMessage: last_message?.content || "*нет сообщений",
                  timestamp: last_message?.time,
                  notifier: !unread_count
                    ? undefined
                    : new NotifierComponent({
                        value: unread_count,
                      }).getContent(),
                  event: {
                    type: "click",
                    action: () => {
                      Store.set("chat_selected", {
                        id,
                        avatar,
                        title,
                        last_message,
                        unread_count,
                      });
                    },
                  },
                }).getContent();
              }),
      });
    });
  }

  render() {
    const event = {
      type: "click",
      action: () => this.openModal(),
    };

    const compiled = tmp.compile({ ...this.props }, styles, event);

    compiled.querySelector("#chat-title")?.addEventListener("change", (e) => {
      const currentTarget = e.target as HTMLInputElement;
      const title = currentTarget.value;

      if (title) {
        this.title = title;
      }
    });

    return tmp.compile({ ...this.props }, styles);
  }
}

export default SidebarComponent;
