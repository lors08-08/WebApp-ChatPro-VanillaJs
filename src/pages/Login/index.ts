import AuthCardComponent from "../../module/Auth/Auth";
import LayoutComponent from "../../components/Layout/Layout";
import ButtonComponent from "../../components/Button/Button";
import InputComponent from "../../components/Input/Input";
import LabelComponent from "../../components/Label/Label";
import InputWrapperComponent from "../../module/InputWrapper/InputWrapper";
import FormLoginComponent from "./module/FormLogin";

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

const AskForAccountBtn = new ButtonComponent({
  value: "Нет аккаунта?",
  className: "styles.ghost",
}).getContent();

const AuthCard = new AuthCardComponent({
  title: "Вход",
  content: [InputLogin.getContent(), InputPassword.getContent()],
  buttons: [AuthorizeBtn, AskForAccountBtn],
}).getContent();

const Form = new FormLoginComponent({
  id: "login-form",
  input: AuthCard,
  loginError: LoginError,
  passwordError: PasswordError,
}).getContent();

export default new LayoutComponent({
  content: Form,
}).getContent();
