import Field from "./Field.tmp";
import styles from "./Fields.module.scss";
import Templator from "../../../../utils/Templator";
import { Block } from "../../../../utils/Block";

interface IField {
  key: HTMLElement;
  value: string;
}

const tmp = new Templator(Field);

class FieldComponent extends Block {
  constructor(props: IField) {
    super(props);
  }

  render(): ChildNode {
    return tmp.compile({ ...this.props }, styles);
  }
}

export default FieldComponent;
