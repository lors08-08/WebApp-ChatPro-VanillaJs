import Templator from "../../utils/classes/Templator";
import styles from "./Label.module.scss";
import Label from "./Label.tmp";
import { Block } from "../../utils/classes/Block/Block";
import { TElement } from "../../utils/classes/Block/types/types";

interface ILabel {
  id: string;
  className?: string;
  value: TElement | string | null;
}

const tmp = new Templator(Label);

class LabelComponent extends Block {
  constructor(props: ILabel) {
    super(props);
  }

  render() {
    return tmp.compile({ ...this.props }, styles);
  }
}

export default LabelComponent;
