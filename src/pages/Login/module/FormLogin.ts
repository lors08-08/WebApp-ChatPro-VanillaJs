import Form, { IForm } from "../../../module/Form/Form";
import LabelComponent from "../../../components/Label/Label";
import AuthController from "../../../controllers/AuthController";

interface IFormLogin extends IForm {
  loginError: LabelComponent;
  passwordError: LabelComponent;
  serverError: LabelComponent;
}
interface IFormElements extends HTMLCollection {
  login: HTMLInputElement;
  password: HTMLInputElement;
}

class FormLogin extends Form<IFormLogin> {
  constructor(props: IFormLogin) {
    super(props);
  }

  private _validateLogin = new RegExp(/^(?=.*[a-z])[\w-]*$/i);
  private _validatePassword = new RegExp(/(?=.*\d)[A-Z]/);

  protected restoreInput(form: HTMLFormElement) {
    const inputs = ["login", "password"] as const;

    type TInput = typeof inputs[number];

    const formElements = form.elements as IFormElements;

    inputs.forEach((name: TInput) => {
      formElements[name]?.addEventListener("focus", (e) => {
        const targetInput = e.target as HTMLInputElement;

        targetInput.style.borderBottomColor = "";
        targetInput.style.color = "";

        this.props[`${name}Error`].setProps({
          value: undefined,
        });
      });
    });
  }

  addEvents(form: HTMLFormElement): void {
    const formElements = form.elements as IFormElements;

    formElements.login?.addEventListener("focusout", (e) => {
      const targetInput = e.target as HTMLInputElement;
      const valueLength = targetInput.value.length;

      const isValid =
        this._validate(targetInput.value, this._validateLogin) &&
        valueLength >= 3 &&
        valueLength <= 20;

      if (!isValid) {
        targetInput.style.borderBottomColor = "red";
        targetInput.style.color = "red";

        this.props.loginError.setProps({
          value: `Логин - должен соответствовать следющим требования:
           <p>- от 3 до 20 символов,</p>
           <p>- без пробелов</p>
           <p>- может содержать цифры, но не состоять из них</p>
           <p>- нет спецсимволов (допустимы дефис и нижнее подчёркивание)</p>
          `,
        });
      }
    });

    formElements.password?.addEventListener("focusout", (e) => {
      const targetInput = e.target as HTMLInputElement;
      const valueLength = targetInput.value.length;

      const isValid =
        this._validate(targetInput.value, this._validatePassword) &&
        valueLength >= 8 &&
        valueLength <= 40;

      if (!isValid) {
        targetInput.style.borderBottomColor = "red";
        targetInput.style.color = "red";

        this.props.passwordError.setProps({
          value: `Пароль - должен соответствовать следющим требования:
           <p>- от 8 до 40 символов</p>
           <p>- обязательно хотя бы одна заглавная буква и цифра</p>
          `,
        });
      }
    });

    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const login = formElements.login.value;
      const password = formElements.password.value;

      if (
        this._validate(login, this._validateLogin) &&
        this._validate(password, this._validatePassword)
      ) {
        try {
          await AuthController.signIn({ login, password });
        } catch (error) {
          this.props.serverError.setProps({ value: error });
        }
      } else {
        [...formElements].forEach((element: HTMLInputElement) => {
          element.focus();
        });
      }
    });
  }
}

export default FormLogin;
