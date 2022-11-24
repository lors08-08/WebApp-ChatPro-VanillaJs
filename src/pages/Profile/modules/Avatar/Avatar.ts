import Avatar from "./Avatar.tmp";
import * as styles from "./Avatar.module.scss";
import AvatarElement from "../../../../components/Avatar/Avatar";
import Templator from "../../../../utils/classes/Templator";
import { Block } from "../../../../utils/classes/Block/Block";
import { TElement } from "../../../../utils/classes/Block/types/types";
import Modal from "../../../../module/Modal/Modal";
import ButtonComponent from "../../../../components/Button/Button";
import FileLoader from "../../../../module/FileLoader/FileLoader";
import UserController from "../../../../controllers/UserController";
import Store, { StoreEvents } from "../../../../utils/classes/Store";
import ImageComponent from "../../../../components/Image/Image";

interface IAvatar {
  id?: string;
  avatarImg?: TElement;
  avatar: AvatarElement;
  name: string;
  modal?: TElement;
}

const tmp = new Templator(Avatar);

class AvatarComponent extends Block<IAvatar> {
  file: Blob | null = null;
  modal = new Modal({
    id: "modal-background",
    title: "Загрузите файл",
    darkBack: "styles.dark-background ",
    input: new FileLoader({}).getContent(),
    actionBtn: new ButtonComponent({
      value: "Сохранить",
      event: {
        type: "click",
        action: async (e) => {
          e.preventDefault();

          if (!this.file) {
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

            await UserController.update_avatar(this.file);

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
      input: new FileLoader({}).getContent(),
      title: "Загрузите файл",
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
    Store.on(StoreEvents.UPDATED, () => {
      const user = Store.getState().user;

      if (user?.avatar) {
        const image = new ImageComponent({
          src: "https://ya-praktikum.tech/api/v2/resources" + user?.avatar,
        }).getContent();

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
            avatarImg: this.props.avatar?.getContent(),
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

    const compiled = tmp.compile({ ...this.props }, styles, event);

    compiled.querySelector("#file")?.addEventListener("change", (e) => {
      const currentTarget = e.target as HTMLInputElement;
      const file = currentTarget.files && currentTarget.files[0];

      if (file) {
        this.file = file;

        this.modal.setProps({ ...this.modal.props, input: file.name });
      }
    });

    return compiled;
  }
}

export default AvatarComponent;
