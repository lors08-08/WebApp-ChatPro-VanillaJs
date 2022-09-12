import Profile from "./Profile.tmp";
import IconComponent from "../../components/Icon/Icon";
import AvatarComponent from "../../components/Avatar/Avatar";
import ButtonComponent from "../../components/Button/Button";
import AvatarProfile from "./modules/Avatar/Avatar";
import FieldComponent from "./components/Field/Field";
import ArrowLeft from "../../../static/img/arrow-left";
import AvatarDefault from "../../../static/img/avatar-default";
import Templator from "../../utils/classes/Templator";
import { Block } from "../../utils/classes/Block/Block";
import styles from "./modules/Avatar/Avatar.module.scss";
import { TElement } from "../../utils/classes/Block/types/types";

interface IProfile {
  icon: TElement;
  userAvatar: TElement;
  userInfo: TElement | TElement[];
  buttons: TElement[] | TElement;
}

const userInfoFields = [
  {
    key: "Почта",
    value: "pochta@yandex.ru",
  },
  {
    key: "Логин",
    value: "Lors08",
  },
  {
    key: "Имя",
    value: "Лорс",
  },
  {
    key: "Фамилия",
    value: "Саидов",
  },
  {
    key: "Имя в чате",
    value: "Lors",
  },
  {
    key: "Телефон",
    value: "+7(999) 777-77-77",
  },
];

const Avatar = new AvatarComponent({
  size: "styles.large",
  icon: new IconComponent({
    icon: AvatarDefault,
    size: "styles.large",
  }).getContent(),
}).getContent();

const Fields = userInfoFields.map(({ key, value }) =>
  new FieldComponent({
    key,
    value,
  }).getContent(),
);

const tmp = new Templator(Profile);

class ProfileComponent extends Block {
  constructor(props: IProfile) {
    super(props);
  }

  render() {
    return tmp.compile({ ...this.props }, styles);
  }
}

export default new ProfileComponent({
  icon: new IconComponent({
    icon: ArrowLeft,
    color: "styles.white",
  }).getContent(),
  userAvatar: new AvatarProfile({
    avatarImg: Avatar,
    name: "Лорс",
  }).getContent(),
  userInfo: Fields,
  buttons: [
    new FieldComponent({
      key: new ButtonComponent({
        value: "Изменить данные",
        className: "styles.text",
      }).getContent(),
    }).getContent(),
    new FieldComponent({
      key: new ButtonComponent({
        value: "Изменить пароль",
        className: "styles.text",
      }).getContent(),
    }).getContent(),
    new ButtonComponent({
      value: "Выйти",
      className: "styles.text",
      color: "styles.red",
    }).getContent(),
  ],
}).getContent();
