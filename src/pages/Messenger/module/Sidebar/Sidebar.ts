import Sidebar from "./Sidebar.tmp";
import * as styles from "./Sidebar.module.scss";
import Templator from "../../../../utils/classes/Templator";
import { Block } from "../../../../utils/classes/Block/Block";
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
import convertTimestamp from "../../../../utils/funcs/convertTimestamp";
import removeDuplicates from "../../utils/removeDuplicates";
import ImageComponent from "../../../../components/Image/Image";
import { resources } from "../../../../common/constant";

interface ISidebarComponent {
  modal?: Block;
  header: Block;
  chatContacts: Block | Block[];
  addChatBtn?: Block;
}

const tmp = new Templator(Sidebar);

const ChatsEmpty = new LayoutComponent({
  content: new ChatEmptyComponent({
    value: "Тут пусто",
  }),
});

const ChatTitleInput = new InputComponent({
  id: "chat-title",
  placeholder: "Введите название",
});

class SidebarComponent extends Block<ISidebarComponent> {
  modal = new Modal({
    id: "modal-background",
    title: "Название чата",
    darkBack: "styles.dark-background ",
    input: ChatTitleInput,
    actionBtn: new ButtonComponent({
      value: "Добавить",
      event: {
        type: "click",
        action: async (e) => {
          e.preventDefault();

          const title = ChatTitleInput.getValue();

          if (!title) {
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
            });

            await ChatController.addChat({ title });

            await ChatController.fetchChats();

            ChatTitleInput.resetValue();

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
    }),
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
      modal: this.modal,
    });
  }

  async init() {
    await ChatController.fetchChats();

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
      }),
    });

    Store.on(StoreEvents.UPDATED, () => {
      const chats = Store.getState().chat;

      this.setProps({
        ...this.props,
        chatContacts:
          !chats || chats.length < 1
            ? ChatsEmpty
            : removeDuplicates(chats).map(
                ({ id, avatar, title, last_message, unread_count }) => {
                  return new ChatContactComponent({
                    avatar: avatar
                      ? new ImageComponent({
                          src: resources + avatar,
                        })
                      : new AvatarComponent({
                          size: "styles.small",
                        }),
                    name: title,
                    lastMessage: last_message?.content || "*нет сообщений",
                    timestamp: convertTimestamp(last_message?.time),
                    notifier: !unread_count
                      ? undefined
                      : new NotifierComponent({
                          value: unread_count,
                        }),
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
                  });
                },
              ),
      });
    });
  }

  render() {
    return tmp.compile({ ...this.props }, styles);
  }
}

export default SidebarComponent;
