import Profile from "./../../Profile.tmp";
import Templator from "../../../../utils/classes/Templator";
import { Block } from "../../../../utils/classes/Block/Block";
import * as styles from "../../modules/Avatar/Avatar.module.scss";
import { TElement } from "../../../../utils/classes/Block/types/types";
import Store, { StoreEvents } from "../../../../utils/classes/Store";
import ButtonComponent from "../../../../components/Button/Button";
import FieldComponent from "../../components/Field/Field";
import AuthController from "../../../../controllers/AuthController";
import { IUpdateProfileRequestDto } from "../../../../api/types/user/request/IUpdateProfileRequestDto";
import InputComponent from "../../../../components/Input/Input";
import LabelComponent from "../../../../components/Label/Label";

interface IProfile {
  icon: Block;
  userAvatar: Block;
  userInfo?: TElement[];
  buttons?: TElement[] | TElement;
  actionStatus?: Block;
}

const ctxProfileValue = {
  type: "text",
  placeholder: "value",
  className: "styles.ghost styles.transparent styles.transparent",
};

const ctxProfilePasswordValue = {
  type: "password",
  placeholder: "password",
  className: "styles.ghost styles.transparent styles.transparent",
};

const tmp = new Templator(Profile);

export class ProfileComponent extends Block<IProfile> {
  private profileInfoField: IUpdateProfileRequestDto = {
    email: "Почта",
    login: "Логин",
    first_name: "Имя",
    second_name: "Фамилия",
    display_name: "Имя в чате",
    phone: "Телефон",
  };

  private passwordInfoField = {
    oldPassword: "Старый пароль",
    newPassword: "Новый пароль",
    newPasswordAgain: "Повторите новый пароль",
  };

  public setActionStatus(text: string, type: "success" | "error" = "error") {
    this.props.actionStatus = new LabelComponent({
      id: "action-status",
      className: "styles.md",
      value: text,
      type,
    });
  }

  private setProfilePasswordMode() {
    const Fields = Object.entries(this.passwordInfoField).map(([key, value]) =>
      new FieldComponent({
        key: value,
        input: new InputComponent({
          ...ctxProfilePasswordValue,
          id: key,
          name: key,
        }),
      }).getContent(),
    );

    this.setProps({ ...this.props, userInfo: Fields });
  }

  setProfileInfoMode(disabled: boolean = true) {
    const user = Store.getState().user;

    if (user) {
      const Fields = Object.entries(this.profileInfoField).map(([key, value]) =>
        new FieldComponent({
          key: value,
          input: new InputComponent({
            ...ctxProfileValue,
            id: key,
            value: user[key as keyof IUpdateProfileRequestDto] || "",
            disabled: disabled ? "disabled" : "",
            name: key,
          }),
        }).getContent(),
      );

      this.setProps({ ...this.props, userInfo: Fields });
    }
  }

  enablePasswordEditMode() {
    this.enableEditMode();
    this.setProfilePasswordMode();
  }

  enableEditMode() {
    const SaveBtn = new ButtonComponent({
      value: "Сохранить",
      type: "submit",
    }).getContent();
    const BackBtn = new ButtonComponent({
      value: "Назад",
      className: "styles.ghost",
      event: {
        type: "click",
        action: () => this.disableEditMode(),
      },
    }).getContent();

    this.setProfileInfoMode(false);

    this.setProps({ ...this.props, buttons: [SaveBtn, BackBtn] });
  }

  disableEditMode() {
    this.setProfileInfoMode();

    this.setProps({
      ...this.props,
      buttons: [
        new FieldComponent({
          key: new ButtonComponent({
            id: "edit-profile",
            value: "Изменить данные",
            className: "styles.text",
            event: {
              type: "click",
              action: () => this.enableEditMode(),
            },
          }),
        }).getContent(),
        new FieldComponent({
          key: new ButtonComponent({
            value: "Изменить пароль",
            className: "styles.text",
            event: {
              type: "click",
              action: () => this.enablePasswordEditMode(),
            },
          }),
        }).getContent(),
        new ButtonComponent({
          id: "logout-btn",
          value: "Выйти",
          className: "styles.text",
          color: "styles.red",
          event: {
            type: "click",
            action: () => AuthController.logout(),
          },
        }).getContent(),
      ],
    });
  }

  init() {
    AuthController.fetchUser();

    this.disableEditMode();

    Store.on(StoreEvents.UPDATED, () => {
      this.setProfileInfoMode();
    });
  }

  render() {
    return tmp.compile({ ...this.props }, styles);
  }
}

export default ProfileComponent;
