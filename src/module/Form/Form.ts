import Templator from "../../utils/classes/Templator";
import FormTemplate from "./Form.tmp";
import { Block } from "../../utils/classes/Block/Block";
import * as styles from "./Form.scss";
import { IEvent } from "../../common/types/types";

export interface IForm {
  id: string;
  content: Block;
  event?: IEvent;
}

const tmp = new Templator(FormTemplate);

class FormComponent<T extends IForm> extends Block<T> {
  public _validate(value: string, regExp: RegExp) {
    return regExp.test(value);
  }

  public addEvents(form: HTMLFormElement): void {}

  protected restoreInput(e: Event, error: Block): void {}

  render() {
    const { event, ...props } = this.props;

    return tmp.compile({ ...props }, styles, event);
  }
}

export default FormComponent;
