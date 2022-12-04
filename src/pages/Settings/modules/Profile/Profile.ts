import Profile from "./../../Settings.tmp";
import Templator from "../../../../utils/classes/Templator";
import { Block } from "../../../../utils/classes/Block/Block";
import * as styles from "../../modules/Avatar/Avatar.module.scss";
import Store, { StoreEvents } from "../../../../utils/classes/Store";
import ButtonComponent from "../../../../components/Button/Button";
import FieldComponent from "../../components/Field/Field";
import AuthController from "../../../../controllers/AuthController";
import { IUpdateProfileRequestDto } from "../../../../api/types/user/request/IUpdateProfileRequestDto";
import InputComponent from "../../../../components/Input/Input";
import LabelComponent from "../../../../components/Label/Label";

interface ISettings {
  icon: Block;
  userAvatar: Block;
  userInfo?: Block[];
  buttons?: Block[] | Block;
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

export class ProfileComponent extends Block<ISettings> {
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
    const Fields = Object.entries(this.passwordInfoField).map(
      ([key, value]) =>
        new FieldComponent({
          id: key,
          key: value,
          input: new InputComponent({
            ...ctxProfilePasswordValue,
            id: key,
            name: key,
          }),
        }),
    );

    this.setProps({ ...this.props, userInfo: Fields });
  }

  setProfileInfoMode(disabled: boolean = true) {
    const user = Store.getState().user;

    if (user) {
      const Fields = Object.entries(this.profileInfoField).map(
        ([key, value]) =>
          new FieldComponent({
            id: key,
            key: value,
            input: new InputComponent({
              ...ctxProfileValue,
              id: key,
              value: user[key as keyof IUpdateProfileRequestDto] || "",
              disabled: disabled ? "disabled" : "",
              name: key,
            }),
          }),
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
    });
    const BackBtn = new ButtonComponent({
      value: "Назад",
      className: "styles.ghost",
      event: {
        type: "click",
        action: () => this.disableEditMode(),
      },
    });

    this.setProfileInfoMode(false);

    this.setProps({ ...this.props, buttons: [SaveBtn, BackBtn] });
  }

  disableEditMode() {
    this.setProfileInfoMode();

    this.props.actionStatus?.setProps({
      ...this.props.actionStatus?.props,
      value: undefined,
    });

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
        }),
        new FieldComponent({
          key: new ButtonComponent({
            value: "Изменить пароль",
            className: "styles.text",
            event: {
              type: "click",
              action: () => this.enablePasswordEditMode(),
            },
          }),
        }),
        new ButtonComponent({
          id: "logout-btn",
          value: "Выйти",
          className: "styles.text",
          color: "styles.red",
          event: {
            type: "click",
            action: () => AuthController.logout(),
          },
        }),
      ],
    });
  }

  async init() {
    Store.on(StoreEvents.UPDATED, () => {
      this.setProfileInfoMode();

      this.props.actionStatus?.setProps({
        ...this.props.actionStatus?.props,
        value: undefined,
      });
    });

    this.disableEditMode();

    await AuthController.fetchUser().catch(() => {
      return;
    });
  }

  render() {
    return tmp.compile({ ...this.props }, styles);
  }
}

export default ProfileComponent;
