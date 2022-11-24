import Templator from "../../utils/classes/Templator";
import FormTemplate from "./Form.tmp";
import { TElement } from "../../utils/classes/Block/types/types";
import { Block } from "../../utils/classes/Block/Block";
import * as styles from "./Form.scss";

export interface IForm {
  id: string;
  content: TElement | TElement[];
}

const tmp = new Templator(FormTemplate);

class FormComponent<T extends IForm> extends Block<T> {
  protected _validate(value: string, regExp: RegExp) {
    return regExp.test(value);
  }

  public addEvents(form: HTMLFormElement): void {}

  protected restoreInput(form: HTMLFormElement): void {}

  render() {
    const res = tmp.compile({ ...this.props }, styles);

    const form = res.firstElementChild as HTMLFormElement | null;

    if (form) {
      this.addEvents(form);
      this.restoreInput(form);
    }

    return res;
  }
}

export default FormComponent;
