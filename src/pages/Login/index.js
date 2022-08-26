import AuthCardComponent from "../../modules/Auth/Auth"

import LayoutComponent from "../../components/Layout/Layout"
import ButtonComponent from "../../components/Button/Button"
import InputComponent from "../../components/Input/Input"
import LabelComponent from "../../components/Label/Label";


const ctxLabelLogin = {
  id: "login",
  value: "Логин",
}
const ctxLabelPassword = {
  id: "password",
  value: "Пароль",
}

const ctxInput = {
  id: "login",
  name: "login",
  type: "text",
  placeholder: "Логин",
  label: LabelComponent(ctxLabelLogin),
  wrapperClass: "flexColumn"
}
const ctxPassword = {
  id: "password",
  name: "password",
  type: "password",
  placeholder: "Пароль",
  label: LabelComponent(ctxLabelPassword),
  wrapperClass: "flexColumn"
}


const InputLogin = InputComponent(ctxInput)
const InputPassword = InputComponent(ctxPassword)

const AuthorizeBtn = ButtonComponent({
  value: "Авторизоваться",
})
const askForAccountBtn = ButtonComponent({
  value: "Нет аккаунта?",
  className: "styles.ghost"
})

const AuthCard = AuthCardComponent({
  title: "Вход",
  content: [InputLogin, InputPassword],
  buttons: [AuthorizeBtn, askForAccountBtn]
})

export default LayoutComponent({
  content: AuthCard
})

