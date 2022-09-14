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
}

interface IFormElements extends HTMLCollection {
  login: HTMLInputElement;
  password: HTMLInputElement;
}

const inputs = ["login", "password"];

const tmp = new Templator(FormTemplate);

class FormComponent extends Block {
  constructor(props: IForm) {
    super(props);
  }

  fields(form: HTMLFormElement) {
    const formElements = form.elements as IFormElements;

    formElements.login.addEventListener("focus", (e) => {
      const targetInput = e.target as HTMLInputElement;

      console.log("focus");
      this.props.login.setProps({
        label: "123",
      });
    });

    formElements.login.addEventListener("focusout", (e) => {
      const targetInput = e.target as HTMLInputElement;

      this.props.login.setProps({
        label: "123",
      });
      console.log("blur");
    });

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
