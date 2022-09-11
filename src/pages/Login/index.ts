import AuthCardComponent from "../../modules/Auth/Auth";
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

const ctxInput = {
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

const InputLogin = new InputComponent(ctxInput).getContent();
const InputPassword = new InputComponent(ctxPassword).getContent();

const AuthorizeBtn = new ButtonComponent({
  value: "Авторизоваться",
});

const AskForAccountBtn = new ButtonComponent({
  value: "Нет аккаунта?",
  className: "styles.ghost",
}).getContent();

const AuthCard = new AuthCardComponent({
  title: "Вход",
  content: [InputLogin, InputPassword],
  buttons: [AuthorizeBtn, AskForAccountBtn],
}).getContent();

const wrapper = new LayoutComponent({
  content: "content",
});

setTimeout(() => {
  wrapper.setProps({ content: "update" });
}, 1000);

export default wrapper.getContent();
