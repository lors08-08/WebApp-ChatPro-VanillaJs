import { Block } from "../../../../../../utils/classes/Block/Block";
import Templator from "../../../../../../utils/classes/Templator";
import Header from "./Header.tmp";
import * as styles from "./Header.module.scss";
import ModalComponent from "../Modal/Modal";
import EditModalComponent from "../../../../../../module/Modal/Modal";
import IconComponent from "../../../../../../components/Icon/Icon";
import OptionsIcon from "../../../../../../../static/img/options";
import EditUser from "../EditUser/EditUser";
import AddIcon from "../../../../../../../static/img/add";
import DeleteIcon from "../../../../../../../static/img/delete";
import ButtonComponent from "../../../../../../components/Button/Button";
import InputComponent from "../../../../../../components/Input/Input";
import Store from "../../../../../../utils/classes/Store";
import UserController from "../../../../../../controllers/UserController";
import ChatController from "../../../../../../controllers/ChatController";

interface IHeader {
  profile: Block;
  optionsIcon?: Block;
  modal?: Block;
  editModal?: Block;
  chatId: number;
  hasUsers: boolean;
}

const template = new Templator(Header);

const Input = new InputComponent({
  id: "edit-title",
  placeholder: "Укажите логин пользователя",
});

class HeaderComponent extends Block<IHeader> {
  private editMode: "add" | "delete" = "add";
  private modal = new ModalComponent({
    addUser: new EditUser({
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
    deleteUser: new EditUser({
      icon: new IconComponent({
        icon: DeleteIcon,
      }),
      value: this.props.hasUsers ? "Удалить пользователя" : "Удалить чат",
      event: {
        type: "click",
        action: async () => {
          this.editMode = "delete";

          if (this.props.hasUsers) {
            this.openEditModal();
          } else {
            await ChatController.delete_chat({ chatId: this.props.chatId });

            await ChatController.fetch_chats();
          }
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
            const chat = Store.getState().chat_selected;

            const userId = await UserController.search_user({
              login: Input.getValue(),
            });

            await (this.editMode === "add"
              ? ChatController.add_user({
                  users: [userId],
                  chatId: chat?.id,
                })
              : ChatController.delete_user({
                  users: [userId],
                  chatId: chat?.id,
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
