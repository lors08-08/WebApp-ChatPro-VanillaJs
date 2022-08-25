import AuthCardComponent from "../../modules/Auth/Auth";

import ButtonComponent from "../../components/Button/Button";
import InputComponent from "../../components/Input/Input";
import LabelComponent from "../../components/Label/Label";
import Templator from "../../utils/Templator";

import SignupTmp from "./Signup.tmp"


const ctxLabelMail = {
  id: "mail",
  value: "Почта",
}
const ctxLabelLogin = {
  id: "login",
  value: "Логин",
}
const ctxLabelName = {
  id: "name",
  value: "Имя",
}
const ctxLabelSurname = {
  id: "surname",
  value: "Фамилия",
}
const ctxLabelPhone = {
  id: "phone",
  value: "Телефон",
}
const ctxLabelPassword = {
  id: "password",
  value: "Пароль",
}
const ctxLabelPasswordAgain = {
  id: "passwordAgain",
  value: "Пароль (ещё раз)",
}

const ctxMail = {
  id: "mail",
  name: "mail",
  type: "text",
  placeholder: "Почта",
  label: LabelComponent(ctxLabelMail),
  wrapperClass: "flexColumn"
}
const ctxInput = {
  id: "login",
  name: "login",
  type: "text",
  placeholder: "Логин",
  label: LabelComponent(ctxLabelLogin),
  wrapperClass: "flexColumn"
}
const ctxName = {
  id: "name",
  name: "name",
  type: "text",
  placeholder: "Имя",
  label: LabelComponent(ctxLabelName),
  wrapperClass: "flexColumn"
}
const ctxSurname = {
  id: "surname",
  name: "surname",
  type: "text",
  placeholder: "Фамилия",
  label: LabelComponent(ctxLabelSurname),
  wrapperClass: "flexColumn"
}
const ctxPhone = {
  id: "phone",
  name: "phone",
  type: "number",
  placeholder: "Телефон",
  label: LabelComponent(ctxLabelPhone),
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
const ctxPasswordAgain = {
  id: "passwordAgain",
  name: "passwordAgain",
  type: "password",
  placeholder: "Пароль еще раз",
  label: LabelComponent(ctxLabelPasswordAgain),
  wrapperClass: "flexColumn"
}

const InputMail = InputComponent(ctxMail)
const InputLogin = InputComponent(ctxInput)
const InputName = InputComponent(ctxName)
const InputSurname = InputComponent(ctxSurname)
const InputPhone = InputComponent(ctxPhone)
const InputPassword = InputComponent(ctxPassword)
const InputPasswordAgain = InputComponent(ctxPasswordAgain)

const SignupBtn = ButtonComponent({
  value: "Зарегистрироваться"
})
const LoginBtn = ButtonComponent({
  value: "Войти",
  className: "styles.ghost"
})

const AuthCard = AuthCardComponent({
  title: "Регистрация",
  content: [InputMail, InputLogin, InputName, InputSurname, InputPhone, InputPassword, InputPasswordAgain],
  buttons: [SignupBtn, LoginBtn],
  fieldsClassName: "input-fields"
})

const tmp = new Templator(SignupTmp)

const renderedTemplate = (...args) => tmp.compile(...args)

export default renderedTemplate({
  content: AuthCard
})
