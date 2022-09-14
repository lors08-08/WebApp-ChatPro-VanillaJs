import AuthCardComponent from "../../modules/Auth/Auth";
import FormComponent from "../../modules/Form/Form";
import LayoutComponent from "../../components/Layout/Layout";
import ButtonComponent from "../../components/Button/Button";
import InputComponent from "../../components/Input/Input";
import LabelComponent from "../../components/Label/Label";

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
  label: new LabelComponent(ctxLabelLogin).getContent(),
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

const InputLogin = new InputComponent(ctxLogin);
const InputPassword = new InputComponent(ctxPassword).getContent();

const AuthorizeBtn = new ButtonComponent({
  value: "Авторизоваться",
  type: "submit",
});

const AskForAccountBtn = new ButtonComponent({
  value: "Нет аккаунта?",
  className: "styles.ghost",
}).getContent();

const AuthCard = new AuthCardComponent({
  title: "Вход",
  content: [InputLogin.getContent(), InputPassword],
  buttons: [AuthorizeBtn.getContent(), AskForAccountBtn],
}).getContent();

const Form = new FormComponent({
  id: "login-form",
  input: AuthCard,
  login: InputLogin,
}).getContent();

// setTimeout(() => {
//   InputLogin.setProps({ className: "styles.error" });
// }, 3000);

export default new LayoutComponent({
  content: Form,
}).getContent();
