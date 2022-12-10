import Block from "@utils/classes/Block/Block";
import Templator from "@utils/classes/Templator";
import Header from "@pages/Messenger/module/ChatPage/components/Header/Header.tmp";
import styles from "@pages/Messenger/module/ChatPage/components/Header/Header.module.scss";
import ModalComponent from "@pages/Messenger/module/ChatPage/components/Modal/Modal";
import EditModalComponent from "@module/Modal/Modal";
import IconComponent from "@components/Icon/Icon";
import OptionsIcon from "@img/options.svg";
import EditChat from "@pages/Messenger/module/ChatPage/components/EditChat/EditChat";
import AddIcon from "@img/add.svg";
import DeleteIcon from "@img/delete.svg";
import ButtonComponent from "@components/Button/Button";
import InputComponent from "@components/Input/Input";
import UserController from "@controllers/UserController";
import ChatController from "@controllers/ChatController";
import Store from "@utils/classes/Store";

interface IHeader {
  profile: Block;
  optionsIcon?: Block;
  modal?: Block;
  editModal?: Block;
  chatId: number;
}

const template = new Templator(Header);

const Input = new InputComponent({
  id: "edit-title",
  placeholder: "Укажите логин пользователя",
});

class HeaderComponent extends Block<IHeader> {
  private editMode: "add" | "delete" = "add";
  private modal = new ModalComponent({
    addUser: new EditChat({
      icon: new IconComponent({
        icon: AddIcon,
      }),
      value: "Добавить пользователя",
      event: {
        type: "click",
        action: () => {
          this.editMode = "add";
          this.openEditModal();
        },
      },
    }),
    deleteUser: new EditChat({
      icon: new IconComponent({
        icon: DeleteIcon,
      }),
      value: "Удалить пользователя",
      event: {
        type: "click",
        action: async () => {
          this.editMode = "delete";

          this.openEditModal();
        },
      },
    }),
    deleteChat: new EditChat({
      icon: new IconComponent({
        icon: DeleteIcon,
      }),
      value: "Удалить чат",
      event: {
        type: "click",
        action: async () => {
          Store.set("chat_selected", null);

          await ChatController.deleteChat({ chatId: this.props.chatId });

          await ChatController.fetchChats();
        },
      },
    }),
    event: {
      type: "click",
      action: (e: Event) => {
        e.stopPropagation();

        this.closeOptionModal();
      },
    },
  });
  private editModal = new EditModalComponent({
    id: "edit-modal",
    title:
      this.editMode === "add"
        ? "Добавить пользователя"
        : "Удалить пользователя",
    darkBack: "styles.dark-background ",
    input: Input,
    actionBtn: new ButtonComponent({
      value: "Подтвердить",
      event: {
        type: "click",
        action: async (e) => {
          e.preventDefault();

          if (!Input.getValue()) {
            this.editModal.setProps({
              ...this.editModal.props,
              error: "Укажите логин пользователя!",
            });

            return;
          }

          try {
            const userId = await UserController.searchUser({
              login: Input.getValue(),
            });

            await (this.editMode === "add"
              ? ChatController.addUser({
                  users: [userId!],
                  chatId: this.props.chatId,
                })
              : ChatController.deleteUser({
                  users: [userId!],
                  chatId: this.props.chatId,
                })
            ).then(() => {
              this.setStatusSuccess();
            });
          } catch (error) {
            this.editModal.setProps({
              ...this.editModal.props,
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

        this.closeEditModal();
      },
    },
  });

  closeOptionModal() {
    this.setProps({
      ...this.props,
      modal: undefined,
    });
  }

  openOptionModal() {
    this.setProps({
      ...this.props,
      modal: this.modal,
    });
  }

  openEditModal() {
    this.closeOptionModal();

    this.setProps({
      ...this.props,
      modal: this.editModal,
    });
  }

  closeEditModal() {
    this.setProps({
      ...this.props,
      editModal: undefined,
      modal: undefined,
    });

    this.editModal.setProps({
      ...this.editModal.props,
      title:
        this.editMode === "add"
          ? "Добавить пользователя"
          : "Удалить пользователя",
      className: undefined,
      closeBtn: undefined,
    });
  }

  setStatusSuccess() {
    const closeBtn = new ButtonComponent({
      value: "Закрыть",
      className: "styles.ghost",
      event: {
        type: "click",
        action: () => this.closeEditModal(),
      },
    });

    this.editModal.setProps({
      ...this.editModal.props,
      title: "Success",
      className: "styles.success",
      closeBtn: closeBtn,
    });
  }

  init() {
    this.setProps({
      ...this.props,
      optionsIcon: new IconComponent({
        icon: OptionsIcon,
        className: "styles.clickable",
        event: {
          type: "click",
          action: () => {
            this.openOptionModal();
          },
        },
      }),
    });
  }

  render() {
    return template.compile({ ...this.props }, styles);
  }
}

export default HeaderComponent;
