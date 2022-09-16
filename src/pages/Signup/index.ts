import AuthCardComponent from "../../modules/Auth/Auth";
import ButtonComponent from "../../components/Button/Button";
import InputComponent from "../../components/Input/Input";
import LabelComponent from "../../components/Label/Label";
import Templator from "../../utils/classes/Templator";
import SignupTmp from "./Signup.tmp";
import { Block } from "../../utils/classes/Block/Block";
import styles from "../../components/Button/Button.module.scss";
import InputWrapper from "../../modules/InputWrapper/InputWrapper";

interface ISignUp {
  content: HTMLElement | null;
}

const ctxLabelMail = {
  id: "mail",
  value: "Почта",
};
const ctxLabelLogin = {
  id: "login",
  value: "Логин",
};
const ctxLabelName = {
  id: "name",
  value: "Имя",
};
const ctxLabelSurname = {
  id: "surname",
  value: "Фамилия",
};
const ctxLabelPhone = {
  id: "phone",
  value: "Телефон",
};
const ctxLabelPassword = {
  id: "password",
  value: "Пароль",
};
const ctxLabelPasswordAgain = {
  id: "passwordAgain",
  value: "Пароль (ещё раз)",
};

const ctxMail = {
  id: "mail",
  name: "mail",
  type: "text",
  placeholder: "Почта",
};
const ctxLogin = {
  id: "login",
  name: "login",
  type: "text",
  placeholder: "Логин",
};
const ctxName = {
  id: "name",
  name: "name",
  type: "text",
  placeholder: "Имя",
};
const ctxSurname = {
  id: "surname",
  name: "surname",
  type: "text",
  placeholder: "Фамилия",
};
const ctxPhone = {
  id: "phone",
  name: "phone",
  type: "number",
  placeholder: "Телефон",
};
const ctxPassword = {
  id: "password",
  name: "password",
  type: "password",
  placeholder: "Пароль",
};
const ctxPasswordAgain = {
  id: "passwordAgain",
  name: "passwordAgain",
  type: "password",
  placeholder: "Пароль еще раз",
};

const InputMail = new InputWrapper({
  label: new LabelComponent(ctxLabelMail).getContent(),
  wrapperClass: "flexColumn",
  input: new InputComponent(ctxMail).getContent(),
}).getContent();
const InputLogin = new InputWrapper({
  label: new LabelComponent(ctxLabelLogin).getContent(),
  wrapperClass: "flexColumn",
  input: new InputComponent(ctxLogin).getContent(),
}).getContent();
const InputName = new InputWrapper({
  label: new LabelComponent(ctxLabelName).getContent(),
  wrapperClass: "flexColumn",
  input: new InputComponent(ctxName).getContent(),
}).getContent();
const InputSurname = new InputWrapper({
  label: new LabelComponent(ctxLabelSurname).getContent(),
  wrapperClass: "flexColumn",
  input: new InputComponent(ctxSurname).getContent(),
}).getContent();
const InputPhone = new InputWrapper({
  label: new LabelComponent(ctxLabelPhone).getContent(),
  wrapperClass: "flexColumn",
  input: new InputComponent(ctxPhone).getContent(),
}).getContent();
const InputPassword = new InputWrapper({
  label: new LabelComponent(ctxLabelPassword).getContent(),
  wrapperClass: "flexColumn",
  input: new InputComponent(ctxPassword).getContent(),
}).getContent();
const InputPasswordAgain = new InputWrapper({
  label: new LabelComponent(ctxLabelPasswordAgain).getContent(),
  wrapperClass: "flexColumn",
  input: new InputComponent(ctxPasswordAgain).getContent(),
}).getContent();

const SignupBtn = new ButtonComponent({
  value: "Зарегистрироваться",
}).getContent();
const LoginBtn = new ButtonComponent({
  value: "Войти",
  className: "styles.ghost",
}).getContent();

const AuthCard = new AuthCardComponent({
  title: "Регистрация",
  content: [
    InputMail,
    InputLogin,
    InputName,
    InputSurname,
    InputPhone,
    InputPassword,
    InputPasswordAgain,
  ],
  buttons: [SignupBtn, LoginBtn],
  fieldsClassName: "input-fields",
}).getContent();

const tmp = new Templator(SignupTmp);

class SignUpComponent extends Block {
  constructor(props: ISignUp) {
    super(props);
  }

  render() {
    return tmp.compile({ ...this.props }, styles);
  }
}

export default new SignUpComponent({
  content: AuthCard,
}).getContent();
