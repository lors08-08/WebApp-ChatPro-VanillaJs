import AuthCardComponent from "../../module/Auth/Auth";
import ButtonComponent from "../../components/Button/Button";
import InputComponent from "../../components/Input/Input";
import LabelComponent from "../../components/Label/Label";
import InputWrapper from "../../module/InputWrapper/InputWrapper";
import LayoutComponent from "../../components/Layout/Layout";
import FormSignupComponent from "./module/FormSignup";
import LinkComponent from "../../components/Link/Link";
import { Pages } from "../../common/enums/Pages";

const ctxLabelMail = {
  id: "email",
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
  id: "email",
  name: "email",
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

const EmailError = new LabelComponent({
  id: "email",
  className: "styles.error",
});
const LoginError = new LabelComponent({
  id: "login",
  className: "styles.error",
});
const NameError = new LabelComponent({
  id: "name",
  className: "styles.error",
});
const SurnameError = new LabelComponent({
  id: "surname",
  className: "styles.error",
});
const PhoneError = new LabelComponent({
  id: "phone",
  className: "styles.error",
});
const PasswordError = new LabelComponent({
  id: "password",
  className: "styles.error",
});
const PasswordAgainError = new LabelComponent({
  id: "passwordAgain",
  className: "styles.error",
});

const InputMail = new InputWrapper({
  label: new LabelComponent(ctxLabelMail),
  wrapperClass: "flexColumn",
  error: EmailError,
  input: new InputComponent(ctxMail),
});
const InputLogin = new InputWrapper({
  label: new LabelComponent(ctxLabelLogin),
  wrapperClass: "flexColumn",
  error: LoginError,
  input: new InputComponent(ctxLogin),
});
const InputName = new InputWrapper({
  label: new LabelComponent(ctxLabelName),
  wrapperClass: "flexColumn",
  error: NameError,
  input: new InputComponent(ctxName),
});
const InputSurname = new InputWrapper({
  label: new LabelComponent(ctxLabelSurname),
  wrapperClass: "flexColumn",
  error: SurnameError,
  input: new InputComponent(ctxSurname),
});
const InputPhone = new InputWrapper({
  label: new LabelComponent(ctxLabelPhone),
  wrapperClass: "flexColumn",
  error: PhoneError,
  input: new InputComponent(ctxPhone),
});
const InputPassword = new InputWrapper({
  label: new LabelComponent(ctxLabelPassword),
  wrapperClass: "flexColumn",
  error: PasswordError,
  input: new InputComponent(ctxPassword),
});
const InputPasswordAgain = new InputWrapper({
  label: new LabelComponent(ctxLabelPasswordAgain),
  wrapperClass: "flexColumn",
  error: PasswordAgainError,
  input: new InputComponent(ctxPasswordAgain),
});

const SignupBtn = new ButtonComponent({
  value: "Зарегистрироваться",
});
const LoginBtn = new LinkComponent({
  id: "profile-link",
  to: Pages.SIGN_IN,
  value: new ButtonComponent({
    value: "Войти",
    className: "styles.ghost",
  }),
});

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
  fieldsClassName: "styles.input-fields-sm",
  wrapperClass: "styles.max-height-signup",
});

const Form = new FormSignupComponent({
  id: "login-form",
  content: AuthCard,
  emailError: EmailError,
  loginError: LoginError,
  nameError: NameError,
  surnameError: SurnameError,
  phoneError: PhoneError,
  passwordError: PasswordError,
  passwordAgainError: PasswordAgainError,
});

export default new LayoutComponent({
  content: Form,
}).getContent();
