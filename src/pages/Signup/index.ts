import AuthCardComponent from "../../modules/Auth/Auth";
import ButtonComponent from "../../components/Button/Button";
import InputComponent from "../../components/Input/Input";
import LabelComponent from "../../components/Label/Label";
import Templator from "../../utils/classes/Templator";
import SignupTmp from "./Signup.tmp";
import { Block } from "../../utils/classes/Block/Block";
import styles from "../../components/Button/Button.module.scss";

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
  label: new LabelComponent(ctxLabelMail).getContent(),
  wrapperClass: "flexColumn",
};
const ctxInput = {
  id: "login",
  name: "login",
  type: "text",
  placeholder: "Логин",
  label: new LabelComponent(ctxLabelLogin).getContent(),
  wrapperClass: "flexColumn",
};
const ctxName = {
  id: "name",
  name: "name",
  type: "text",
  placeholder: "Имя",
  label: new LabelComponent(ctxLabelName).getContent(),
  wrapperClass: "flexColumn",
};
const ctxSurname = {
  id: "surname",
  name: "surname",
  type: "text",
  placeholder: "Фамилия",
  label: new LabelComponent(ctxLabelSurname).getContent(),
  wrapperClass: "flexColumn",
};
const ctxPhone = {
  id: "phone",
  name: "phone",
  type: "number",
  placeholder: "Телефон",
  label: new LabelComponent(ctxLabelPhone).getContent(),
  wrapperClass: "flexColumn",
};
const ctxPassword = {
  id: "password",
  name: "password",
  type: "password",
  placeholder: "Пароль",
  label: new LabelComponent(ctxLabelPassword).getContent(),
  wrapperClass: "flexColumn",
};
const ctxPasswordAgain = {
  id: "passwordAgain",
  name: "passwordAgain",
  type: "password",
  placeholder: "Пароль еще раз",
  label: new LabelComponent(ctxLabelPasswordAgain).getContent(),
  wrapperClass: "flexColumn",
};

const InputMail = new InputComponent(ctxMail).getContent();
const InputLogin = new InputComponent(ctxInput).getContent();
const InputName = new InputComponent(ctxName).getContent();
const InputSurname = new InputComponent(ctxSurname).getContent();
const InputPhone = new InputComponent(ctxPhone).getContent();
const InputPassword = new InputComponent(ctxPassword).getContent();
const InputPasswordAgain = new InputComponent(ctxPasswordAgain).getContent();

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
