import Templator from "../../utils/classes/Templator";
import FormTemplate from "./Form.tmp";
import { TElement } from "../../utils/classes/Block/types/types";
import { Block } from "../../utils/classes/Block/Block";
import styles from "./Form.scss";
import InputComponent from "../../components/Input/Input";
import LabelComponent from "../../components/Label/Label";

interface IForm {
  id: string;
  input: TElement | TElement[];
  login: InputComponent<{}>;
  password: InputComponent<{}>;
}

interface IFormElements extends HTMLCollection {
  login: HTMLInputElement;
  password: HTMLInputElement;
}

const inputs = ["login", "password"];

const tmp = new Templator(FormTemplate);

class FormComponent extends Block {
  validateFullName = new RegExp(/^(?=.*[A-Za-z])^[A-Z][A-Za-z-]*$/);
  validateLogin = new RegExp(/^(?=.*[a-z])[\w-]*$/i);
  validateEmail = new RegExp(/\S+@\S+\.\S+/);
  validatePassword = new RegExp(/(?=.*\d)[A-Z]/);
  validatePhone = new RegExp(/^[\s()+-]*(\d[\s()+-]*){10,15}$/);

  constructor(props: IForm) {
    super(props);
  }

  fields(form: HTMLFormElement) {
    const formElements = form.elements as IFormElements;

    formElements.login.addEventListener("focus", (e) => {
      const targetInput = e.target as HTMLInputElement;

      this.props.login.setProps({
        label: "0",
      });
      console.log("focus");
    });

    // formElements.login.addEventListener("focusout", (e) => {
    //   const targetInput = e.target as HTMLInputElement;
    //
    //   console.log(22);
    //   this.props.password.setProps({
    //     label: "12",
    //   });
    // });

    // formElements.password.addEventListener("focusout", (e) => {
    //   const targetInput = e.target as HTMLInputElement;
    //
    //   this.props.password.setProps({
    //     label: "asd",
    //   });
    //
    //   console.log("blur");
    // });

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const login = formElements.login;
      const password = formElements.password;

      console.log({
        login,
        password,
      });
    });
  }

  render() {
    const res = tmp.compile({ ...this.props }, styles);

    const form = res.firstElementChild as HTMLFormElement | null;

    if (form) {
      this.fields(form);
    }

    return res;
  }
}

export default FormComponent;
