import Profile from "./Profile.tmp"

import IconComponent from "../../components/Icon/Icon"
import AvatarComponent from "../../components/Avatar/Avatar"
import ButtonComponent from "../../components/Button/Button"
import AvatarProfile from "./modules/Avatar/Avatar"
import FieldComponent from "./components/Field/Field"

import ArrowLeft from "../../../static/img/arrow-left"
import AvatarDefault from "../../../static/img/avatar-default"


import Templator from "../../utils/Templator";

const userInfoFields = [
  {
    key: "Почта",
    value: "pochta@yandex.ru"
  },
  {
    key: "Логин",
    value: "Lors08"
  },
  {
    key: "Имя",
    value: "Лорс"
  },
  {
    key: "Фамилия",
    value: "Саидов"
  },
  {
    key: "Имя в чате",
    value: "Lors"
  },
  {
    key: "Телефон",
    value: "+7(999) 777-77-77"
  },
]

//save button
const Button = `
  <div class="flexCenter">${ButtonComponent({value: "Сохранить"})}</div>
`
const Avatar = AvatarComponent({
  size: "styles.large",
  icon: IconComponent({
    icon: AvatarDefault,
    size: "styles.large"
  })
})

const Fields = userInfoFields.map(({key,value}) => FieldComponent({
  key,
  value
}))

const tmp = new Templator(Profile)

const renderedTemplate = (...args) => tmp.compile(...args)

export default renderedTemplate({
  icon: IconComponent({
    icon: ArrowLeft,
    color: "styles.white",
  }),
  userAvatar: AvatarProfile({
    avatarImg: Avatar,
    name: "Лорс"
  }),
  userInfo: Fields,
  buttons: [
    FieldComponent({ key: ButtonComponent({ value: "Изменить данные", className: "styles.text" }) }),
    FieldComponent({ key: ButtonComponent({ value: "Изменить пароль", className: "styles.text"}) }),
    ButtonComponent({ value: "Выйти", className: "styles.text", color: "styles.red"})
  ]
})
