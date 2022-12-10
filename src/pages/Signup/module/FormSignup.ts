import Form, { IForm } from "@module/Form/Form";
import LabelComponent from "@components/Label/Label";
import AuthController from "@controllers/AuthController";
import EmailComponent from "@pages/Signup/components/EmailComponent";
import Block from "@utils/classes/Block/Block";
import NameComponent from "@pages/Signup/components/NameComponent";
import SurnameComponent from "@pages/Signup/components/SurnameComponent";
import PhoneComponent from "@pages/Signup/components/PhoneComponent";
import PasswordAgainComponent from "@pages/Signup/components/PasswordAgainComponent";
import LoginComponent from "@pages/Login/components/LoginComponent";
import PasswordComponent from "@pages/Login/components/PasswordComponent";

interface IFormSignup extends IForm {
  emailError: LabelComponent;
  serverError: LabelComponent;
  loginError: LabelComponent;
  nameError: LabelComponent;
  surnameError: LabelComponent;
  phoneError: LabelComponent;
  passwordError: LabelComponent;
  passwordAgainError: LabelComponent;
}

class FormSignup extends Form<IFormSignup> {
  private _validateLogin = new RegExp(/^(?=.*[a-z])[\w-]*$/i);
  private _validatePassword = new RegExp(/(?=.*\d)[A-Z]/);

  private _validateFullName = new RegExp(/^(?=.*[A-Za-z])^[A-Z][A-Za-z-]*$/);
  private _validateEmail = new RegExp(/\S+@\S+\.\S+/);
  private _validatePhone = new RegExp(/^[\s()+-]*(\d[\s()+-]*){10,15}$/);

  protected restoreInput(e: Event, error: Block) {
    const targetInput = e.target as HTMLInputElement;

    targetInput.style.borderBottomColor = "";
    targetInput.style.color = "";

    error.setProps({
      value: undefined,
    });
  }

  init() {
    const InputEmail = EmailComponent({
      restoreInput: this.restoreInput,
      validate: this._validate,
      emailError: this.props.emailError,
    });
    const InputLogin = LoginComponent({
      restoreInput: this.restoreInput,
      validate: this._validate,
      loginError: this.props.loginError,
    });
    const InputPassword = PasswordComponent({
      restoreInput: this.restoreInput,
      validate: this._validate,
      passwordError: this.props.passwordError,
    });
    const InputPasswordAgain = PasswordAgainComponent({
      restoreInput: this.restoreInput,
      passwordError: this.props.passwordError,
      originPassword: InputPassword,
    });
    const InputName = NameComponent({
      restoreInput: this.restoreInput,
      validate: this._validate,
      nameError: this.props.nameError,
    });
    const InputSurname = SurnameComponent({
      restoreInput: this.restoreInput,
      validate: this._validate,
      surnameError: this.props.surnameError,
    });
    const InputPhone = PhoneComponent({
      restoreInput: this.restoreInput,
      validate: this._validate,
      phoneError: this.props.phoneError,
    });

    this.props.content.setProps({
      ...this.props.content.props,
      content: [
        InputEmail,
        InputLogin,
        InputName,
        InputSurname,
        InputPhone,
        InputPassword,
        InputPasswordAgain,
      ],
    });
    this.setProps({
      ...this.props,
      event: {
        type: "submit",
        action: async (e) => {
          e.preventDefault();

          const email = InputEmail.getValue();
          const login = InputLogin.getValue();
          const name = InputName.getValue();
          const surname = InputSurname.getValue();
          const phone = InputPhone.getValue();
          const password = InputPassword.getValue();
          const passwordAgain = InputPasswordAgain.getValue();

          const validateAllFields = (): boolean => {
            return (
              this._validate(login, this._validateLogin) &&
              this._validate(password, this._validatePassword) &&
              this._validate(email, this._validateEmail) &&
              this._validate(name, this._validateFullName) &&
              this._validate(surname, this._validateFullName) &&
              this._validate(phone, this._validatePhone) &&
              password === passwordAgain
            );
          };

          if (validateAllFields()) {
            try {
              await AuthController.signUp({
                first_name: name,
                second_name: surname,
                email,
                login,
                phone,
                password,
              });
            } catch (error) {
              this.props.serverError.setProps({ value: error });
            }
          } else {
            [
              InputEmail,
              InputLogin,
              InputPassword,
              InputPasswordAgain,
              InputName,
              InputSurname,
              InputPhone,
            ].forEach((element) => {
              element.focus();
            });
          }
        },
      },
    });
  }
}

export default FormSignup;
