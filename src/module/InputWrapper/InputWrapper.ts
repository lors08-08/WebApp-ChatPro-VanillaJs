import Templator from "../../utils/classes/Templator";
import InputWrapperTemplate from "./InputWrapper.tmp";
import { Block } from "../../utils/classes/Block/Block";
import * as styles from "./InputWrapper.module.scss";

export interface IInputWrapper {
  wrapperClass?: string;
  inputVariant?: string;
  label?: Block | null;
  input: Block;
  iconLeft?: Block;
  error?: Block;
  additionalStyles?: Record<string, string>;
  event?: {
    type: string;
    action(e: any): void;
  };
}

const template = new Templator(InputWrapperTemplate);

class InputWrapperComponent<T extends IInputWrapper> extends Block<T> {
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
