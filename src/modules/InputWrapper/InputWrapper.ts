import Templator from "../../utils/classes/Templator";
import InputWrapperTemplate from "./InputWrapper.tmp";
import { TElement } from "../../utils/classes/Block/types/types";
import { Block } from "../../utils/classes/Block/Block";
import styles from "./InputWrapper.module.scss";

export interface IInputWrapper {
  wrapperClass?: string;
  label?: HTMLElement | null;
  input: TElement;
  iconLeft?: TElement;
  error?: TElement;
  additionalStyles?: Record<string, string>;
  event?: {
    type: string;
    action(e: any): void;
  };
}

const template = new Templator(InputWrapperTemplate);

class InputWrapperComponent<T extends IInputWrapper> extends Block {
  constructor(props: T) {
    super(props);
  }

  render(): DocumentFragment {
    return template.compile({ ...this.props }, styles, this.props.event);
  }
}

export default InputWrapperComponent;
