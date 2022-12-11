import Avatar from "@pages/Settings/modules/Avatar/Avatar.tmp";
import styles from "@pages/Settings/modules/Avatar/Avatar.module.scss";
import AvatarElement from "@components/Avatar/Avatar";
import Templator from "@utils/classes/Templator";
import Block from "@utils/classes/Block/Block";
import Modal from "@module/Modal/Modal";
import ButtonComponent from "@components/Button/Button";
import FileLoader from "@module/FileLoader/FileLoader";
import UserController from "@controllers/UserController";
import Store, { StoreEvents } from "@utils/classes/Store";
import ImageComponent from "@components/Image/Image";
import { resources } from "@common/constant";

interface IAvatar {
  id?: string;
  avatarImg?: Block;
  avatar: AvatarElement;
  name: string;
  modal?: Block;
}

const tmp = new Templator(Avatar);

const fileLoader = new FileLoader({ value: "Выбрать файл на компьютере" });

class AvatarComponent extends Block<IAvatar> {
  modal = new Modal({
    id: "modal-background",
    title: "Загрузите файл",
    darkBack: "styles.dark-background ",
    input: fileLoader,
    actionBtn: new ButtonComponent({
      value: "Сохранить",
      event: {
        type: "click",
        action: async (e) => {
          e.preventDefault();

          const file = fileLoader.getFile();

          if (!file) {
            this.modal.setProps({
              ...this.modal.props,
              error: "Нужно выбрать файл",
            });

            return;
          }

          try {
            await UserController.updateAvatar(file);

            setTimeout(() => {
              this.closeModal();
            }, 1500);

            this.modal.setProps({
              ...this.modal.props,
              title: "Success",
              className: "styles.success",
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
    fileLoader.setProps({ value: "Выбрать файл на компьютере" });

    this.modal.setProps({
      ...this.modal.props,
      error: undefined,
      input: fileLoader,
      title: "Загрузите файл",
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

  init() {
    Store.on(StoreEvents.UPDATED, () => {
      const user = Store.getState().user;

      if (user?.avatar) {
        const image = new ImageComponent({
          src: resources + user?.avatar,
        });

        this.props.avatar?.setProps({
          ...this.props.avatar.props,
          image: image,
        });

        setTimeout(() => {
          this.setProps({
            ...this.props,
            avatarImg: image,
          });
        }, 100);
      } else {
        setTimeout(() => {
          this.setProps({
            ...this.props,
            avatarImg: this.props.avatar,
          });
        }, 100);
      }
    });
  }

  render() {
    const event = {
      type: "click",
      action: () => this.openModal(),
    };

    return tmp.compile({ ...this.props }, styles, event);
  }
}

export default AvatarComponent;
