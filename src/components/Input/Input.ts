import InputTmp from "./Input.tmp";
import styles from "./Input.module.scss";
import Templator from "../../utils/classes/Templator";
import { Block } from "../../utils/classes/Block/Block";
import { TElement } from "../../utils/classes/Block/types/types";

export interface IInput {
  wrapperClass?: string;
  inputVariant?: string;
  label?: HTMLElement | null;
  placeholder?: string;
  iconLeft?: TElement;
  id?: string;
  name?: string;
  type?: string;
  className?: string;
  error?: string;
  additionalStyles?: Record<string, string>;
}

const tmp = new Templator(InputTmp);

class InputComponent<T extends IInput> extends Block {
  constructor(props: T) {
    super(props);
  }

  render() {
    const { additionalStyles, ...rest } = this.props;

    const combinedStyles = {
      ...styles,
      ...(additionalStyles as Record<string, string>),
    };

    return tmp.compile({ ...rest }, combinedStyles);
  }
}

export default InputComponent;
