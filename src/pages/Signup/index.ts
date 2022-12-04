import AuthCardComponent from "../../module/Auth/Auth";
import ButtonComponent from "../../components/Button/Button";
import LabelComponent from "../../components/Label/Label";
import LayoutComponent from "../../components/Layout/Layout";
import FormSignupComponent from "./module/FormSignup";
import LinkComponent from "../../components/Link/Link";
import { Pages } from "../../common/enums/Pages";

const ServerError = new LabelComponent({
  id: "server-error",
  className: "styles.error styles.md",
});
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
  buttons: [SignupBtn, LoginBtn],
  fieldsClassName: "styles.input-fields-sm",
  wrapperClass: "styles.max-height-signup",
});

const Form = new FormSignupComponent({
  id: "login-form",
  content: AuthCard,
  serverError: ServerError,
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
