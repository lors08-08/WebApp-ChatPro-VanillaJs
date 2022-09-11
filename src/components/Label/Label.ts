import Templator from "../../utils/Templator";
import styles from "./Label.module.scss";
import Label from "./Label.tmp";
import { Block } from "../../utils/Block";

interface ILabel {
  id: string;
  className?: string;
  value: DocumentFragment;
}

const tmp = new Templator(Label);

class LabelComponent extends Block {
  constructor(props: ILabel) {
    super(props);
  }

  render(): ChildNode {
    return tmp.compile({ ...this.props }, styles);
  }
}

export default LabelComponent;
