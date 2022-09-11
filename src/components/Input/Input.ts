import InputTmp from "./Input.tmp";
import styles from "./Input.module.scss";
import Templator from "../../utils/Templator";
import { Block } from "../../utils/Block";

interface IInput {
  wrapperClass?: string;
  inputVariant?: string;
  label?: HTMLElement;
  placeholder?: string;
  iconLeft?: string;
  id?: string;
  name?: string;
  type?: string;
  className?: string;
  error?: string;
  additionalStyles?: Record<string, string>;
}

const tmp = new Templator(InputTmp);

class InputComponent extends Block {
  constructor(props: IInput) {
    super(props);
  }

  render(): ChildNode {
    const { additionalStyles, ...rest } = this.props;

    const combinedStyles = {
      ...styles,
      ...(additionalStyles as Record<string, string>),
    };

    return tmp.compile({ ...rest }, combinedStyles);
  }
}

export default InputComponent;
