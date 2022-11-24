import AuthCardComponent from "../../module/Auth/Auth";
import LayoutComponent from "../../components/Layout/Layout";
import ButtonComponent from "../../components/Button/Button";
import InputComponent from "../../components/Input/Input";
import LabelComponent from "../../components/Label/Label";
import InputWrapperComponent from "../../module/InputWrapper/InputWrapper";
import FormLoginComponent from "./module/FormLogin";
import LinkComponent from "../../components/Link/Link";
import { Pages } from "../../common/enums/Pages";

const ctxLabelLogin = {
  id: "login",
  value: "Логин",
};
const ctxLabelPassword = {
  id: "password",
  value: "Пароль",
};

const ctxLogin = {
  id: "login",
  name: "login",
  type: "text",
  placeholder: "Логин",
};
const ctxPassword = {
  id: "password",
  name: "password",
  type: "password",
  placeholder: "Пароль",
};

const LoginError = new LabelComponent({
  id: "login",
  className: "styles.error",
});
const PasswordError = new LabelComponent({
  id: "password",
  className: "styles.error",
});
const ServerError = new LabelComponent({
  id: "server-error",
  className: "styles.error styles.md",
});

const InputLogin = new InputWrapperComponent({
  label: new LabelComponent(ctxLabelLogin).getContent(),
  wrapperClass: "flexColumn",
  error: LoginError.getContent(),
  input: new InputComponent({
    ...ctxLogin,
  }).getContent(),
});

const InputPassword = new InputWrapperComponent({
  label: new LabelComponent(ctxLabelPassword).getContent(),
  wrapperClass: "flexColumn",
  error: PasswordError.getContent(),
  input: new InputComponent({
    ...ctxPassword,
  }).getContent(),
});

const AuthorizeBtn = new ButtonComponent({
  value: "Авторизоваться",
  type: "submit",
}).getContent();

const AskForAccountBtn = new LinkComponent({
  id: "signup-link",
  to: Pages.SIGN_UP,
  value: new ButtonComponent({
    value: "Нет аккаунта?",
    className: "styles.ghost",
  }).getContent(),
}).getContent();

const AuthCard = new AuthCardComponent({
  title: "Вход",
  content: [InputLogin.getContent(), InputPassword.getContent()],
  serverError: ServerError.getContent(),
  buttons: [AuthorizeBtn, AskForAccountBtn],
}).getContent();

const Form = new FormLoginComponent({
  id: "login-form",
  content: AuthCard,
  loginError: LoginError,
  passwordError: PasswordError,
  serverError: ServerError,
}).getContent();

export default new LayoutComponent({
  content: Form,
}).getContent();
