import Templator from "../../utils/classes/Templator";
import * as styles from "./Label.module.scss";
import Label from "./Label.tmp";
import { Block } from "../../utils/classes/Block/Block";
import { TElement } from "../../utils/classes/Block/types/types";

interface ILabel {
  id?: string;
  className?: string;
  value?: TElement | string;
  type?: "error" | "success";
}

const tmp = new Templator(Label);

class LabelComponent extends Block<ILabel> {
  render() {
    let status = "";

    if (this.props.type) {
      status =
        this.props.type === "success" ? "styles.success" : "styles.error";
    }

    return tmp.compile(
      { ...this.props, className: `${this.props.className} ${status}` },
      styles,
    );
  }
}

export default LabelComponent;
