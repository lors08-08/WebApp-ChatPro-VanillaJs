import AuthCardComponent from "../../modules/Auth/Auth";
import FormComponent from "../../modules/Form/Form";
import LayoutComponent from "../../components/Layout/Layout";
import ButtonComponent from "../../components/Button/Button";
import InputComponent from "../../components/Input/Input";
import LabelComponent from "../../components/Label/Label";
import InputWrapperComponent from "../../modules/InputWrapper/InputWrapper";

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

const InputLogin = new InputWrapperComponent({
  label: new LabelComponent(ctxLabelLogin).getContent(),
  wrapperClass: "flexColumn",
  input: new InputComponent({
    ...ctxLogin,
    event: {
      type: "focus",
      action: () => {
        console.log(document.activeElement);
        InputLogin.setProps({
          error: undefined,
        });

        console.log("focus");
      },
    },
  }).getContent(),
});
const InputPassword = new InputWrapperComponent({
  label: new LabelComponent(ctxLabelPassword).getContent(),
  wrapperClass: "flexColumn",
  input: new InputComponent({
    ...ctxPassword,
    event: {
      type: "focusout",
      action: () => {
        InputLogin.setProps({
          error: new LabelComponent({
            id: "password",
            className: "styles.error",
            value: "error",
          }).getContent(),
        });

        console.log("blur");
      },
    },
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
  content: [InputLogin.getContent()],
  buttons: [AuthorizeBtn, AskForAccountBtn],
}).getContent();

// const Form = new FormComponent({
//   id: "login-form",
//   input: AuthCard,
//   login: InputLogin,
//   password: InputPassword,
// }).getContent();

// setTimeout(() => {
//   InputLogin.setProps({ className: "styles.error" });
// }, 3000);

export default new LayoutComponent({
  content: AuthCard,
}).getContent();
