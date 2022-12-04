import InputTmp from "./Input.tmp";
import * as styles from "./Input.module.scss";
import Templator from "../../utils/classes/Templator";
import { Block } from "../../utils/classes/Block/Block";
import { IEvent } from "../../common/types/types";

export interface IInput {
  inputVariant?: string;
  placeholder?: string;
  iconLeft?: Block;
  id?: string;
  name?: string;
  type?: string;
  value?: string;
  className?: string;
  additionalStyles?: Record<string, string>;
  event?: IEvent | IEvent[];
  disabled?: string;
}

const tmp = new Templator(InputTmp);

class InputComponent<T extends IInput> extends Block<T> {
  getValue() {
    return (this.getContent() as HTMLInputElement)?.value;
  }

  focus() {
    return (this.getContent() as HTMLInputElement)?.focus();
  }

  resetValue() {
    const input = this.getContent() as HTMLInputElement;

    if (input?.value) {
      input.value = "";
    }
  }

  render() {
    const { additionalStyles, event, ...rest } = this.props;

    const combinedStyles = {
      ...styles,
      ...(additionalStyles as Record<string, string>),
    };

    return tmp.compile({ ...rest }, combinedStyles, event);
  }
}

export default InputComponent;
