import Form, { IForm } from "../../../module/Form/Form";
import LabelComponent from "../../../components/Label/Label";
import AuthController from "../../../controllers/AuthController";

interface IFormSignup extends IForm {
  emailError: LabelComponent;
  loginError: LabelComponent;
  nameError: LabelComponent;
  surnameError: LabelComponent;
  phoneError: LabelComponent;
  passwordError: LabelComponent;
  passwordAgainError: LabelComponent;
}
interface IFormElements extends HTMLCollection {
  email: HTMLInputElement;
  login: HTMLInputElement;
  name: HTMLInputElement;
  surname: HTMLInputElement;
  phone: HTMLInputElement;
  password: HTMLInputElement;
  passwordAgain: HTMLInputElement;
}

class FormSignup extends Form<IFormSignup> {
  private _validateLogin = new RegExp(/^(?=.*[a-z])[\w-]*$/i);
  private _validatePassword = new RegExp(/(?=.*\d)[A-Z]/);

  private _validateFullName = new RegExp(/^(?=.*[A-Za-z])^[A-Z][A-Za-z-]*$/);
  private _validateEmail = new RegExp(/\S+@\S+\.\S+/);
  private _validatePhone = new RegExp(/^[\s()+-]*(\d[\s()+-]*){10,15}$/);

  protected restoreInput(form: HTMLFormElement): void {
    const inputs = [
      "email",
      "login",
      "name",
      "surname",
      "phone",
      "password",
      "passwordAgain",
    ] as const;

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

    formElements.email?.addEventListener("focusout", (e) => {
      const targetInput = e.target as HTMLInputElement;

      const isValid = this._validate(targetInput.value, this._validateEmail);

      if (!isValid) {
        targetInput.style.borderBottomColor = "red";
        targetInput.style.color = "red";

        this.props.emailError.setProps({
          value: "Email - не валидный",
        });
      }
    });
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
    formElements.name?.addEventListener("focusout", (e) => {
      const targetInput = e.target as HTMLInputElement;

      const isValid = this._validate(targetInput.value, this._validateFullName);

      if (!isValid) {
        targetInput.style.borderBottomColor = "red";
        targetInput.style.color = "red";

        this.props.nameError.setProps({
          value: `Имя - должно соответствовать следющим требования:
           <p>- первая буква должна быть заглавной</p>
           <p>- без пробелов и без цифр</p>
           <p>- нет спецсимволов (допустим только дефис)</p>
          `,
        });
      }
    });
    formElements.surname?.addEventListener("focusout", (e) => {
      const targetInput = e.target as HTMLInputElement;

      const isValid = this._validate(targetInput.value, this._validateFullName);

      if (!isValid) {
        targetInput.style.borderBottomColor = "red";
        targetInput.style.color = "red";

        this.props.surnameError.setProps({
          value: `Фамилия - должна соответствовать следющим требования:
           <p>- первая буква должна быть заглавной</p>
           <p>- без пробелов и без цифр</p>
           <p>- нет спецсимволов (допустим только дефис)</p>
          `,
        });
      }
    });
    formElements.phone?.addEventListener("focusout", (e) => {
      const targetInput = e.target as HTMLInputElement;
      const valueLength = targetInput.value.length;

      const isValid =
        this._validate(targetInput.value, this._validatePhone) &&
        valueLength >= 3 &&
        valueLength <= 20;

      if (!isValid) {
        targetInput.style.borderBottomColor = "red";
        targetInput.style.color = "red";

        this.props.phoneError.setProps({
          value: "Номер - не валидный",
        });
      }
    });

    let passwordValue = "";
    let passwordAgainValue = "";

    formElements.password?.addEventListener("focusout", (e) => {
      const targetInput = e.target as HTMLInputElement;
      const valueLength = targetInput.value.length;

      const isValid =
        this._validate(targetInput.value, this._validatePassword) &&
        valueLength >= 8 &&
        valueLength <= 40;

      if (passwordValue !== passwordAgainValue) {
        targetInput.style.borderBottomColor = "red";
        targetInput.style.color = "red";
      }
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

      passwordValue = targetInput.value;
    });
    formElements.passwordAgain?.addEventListener("focusout", (e) => {
      const targetInput = e.target as HTMLInputElement;

      const isValid = targetInput.value === passwordValue;

      if (!isValid) {
        targetInput.style.borderBottomColor = "red";
        targetInput.style.color = "red";

        this.props.passwordAgainError.setProps({
          value: "Пароли не совпадают",
        });
        formElements.password.focus();
        formElements.password.blur();
      }

      passwordAgainValue = targetInput.value;
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const email = formElements.email.value;
      const login = formElements.login.value;
      const firstName = formElements.name.value;
      const surname = formElements.surname.value;
      const phone = formElements.phone.value;
      const password = formElements.password.value;
      const passwordAgain = formElements.passwordAgain.value;

      const validateAllFields = (): boolean => {
        return (
          this._validate(login, this._validateLogin) &&
          this._validate(password, this._validatePassword) &&
          this._validate(email, this._validateEmail) &&
          this._validate(firstName, this._validateFullName) &&
          this._validate(surname, this._validateFullName) &&
          this._validate(phone, this._validatePhone) &&
          passwordValue === passwordAgainValue
        );
      };

      if (validateAllFields()) {
        AuthController.signUp({
          first_name: firstName,
          second_name: surname,
          email,
          login,
          phone,
          password,
        });

        console.log({
          email,
          login,
          firstName,
          surname,
          phone,
          password,
          passwordAgain,
        });
      } else {
        [...formElements].forEach((element: HTMLInputElement) => {
          element.focus();
        });
      }
    });
  }
}

export default FormSignup;
