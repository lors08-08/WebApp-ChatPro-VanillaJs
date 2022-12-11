import Form, { IForm } from "@module/Form/Form";
import LabelComponent from "@components/Label/Label";
import AuthController from "@controllers/AuthController";
import Block from "@utils/classes/Block/Block";
import LoginComponent from "@pages/Login/components/LoginComponent";
import PasswordComponent from "@pages/Login/components/PasswordComponent";

interface IFormLogin extends IForm {
  loginError: LabelComponent;
  passwordError: LabelComponent;
  serverError: LabelComponent;
}

class FormLogin extends Form<IFormLogin> {
  constructor(props: IFormLogin) {
    super(props);
  }

  private _validateLogin = new RegExp(/^(?=.*[a-z])[\w-]*$/i);
  private _validatePassword = new RegExp(/(?=.*\d)[A-Z]/);

  protected restoreInput(e: Event, error: Block) {
    const targetInput = e.target as HTMLInputElement;

    targetInput.style.borderBottomColor = "";
    targetInput.style.color = "";

    error.setProps({
      value: undefined,
    });
  }

  init() {
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

    this.setProps({
      ...this.props,
      event: {
        type: "submit",
        action: async (e) => {
          e.preventDefault();

          const login = InputLogin.getValue();
          const password = InputPassword.getValue();

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
            [InputLogin, InputPassword].forEach((element) => {
              element.focus();
            });
          }
        },
      },
    });

    this.props.content.setProps({
      ...this.props.content.props,
      content: [InputLogin, InputPassword],
    });
  }
}

export default FormLogin;
