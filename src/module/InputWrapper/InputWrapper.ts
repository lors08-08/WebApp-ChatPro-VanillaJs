import Templator from "../../utils/classes/Templator";
import InputWrapperTemplate from "./InputWrapper.tmp";
import { Block } from "../../utils/classes/Block/Block";
import * as styles from "./InputWrapper.module.scss";
import { IEvent } from "../../common/types/types";

export interface IInputWrapper {
  wrapperClass?: string;
  inputVariant?: string;
  label?: Block | null;
  input: Block;
  iconLeft?: Block;
  error?: Block;
  additionalStyles?: Record<string, string>;
  event?: IEvent;
}

const template = new Templator(InputWrapperTemplate);

class InputWrapperComponent<T extends IInputWrapper> extends Block<T> {
  getValue() {
    return (this.props.input.getContent() as HTMLInputElement)?.value;
  }

  focus() {
    return (this.props.input.getContent() as HTMLInputElement)?.focus();
  }

  resetValue() {
    const input = this.props.input.getContent() as HTMLInputElement;

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

    return template.compile({ ...rest }, combinedStyles, event);
  }
}

export default InputWrapperComponent;
