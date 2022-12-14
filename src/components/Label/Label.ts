import Templator from "@utils/classes/Templator";
import styles from "@components/Label/Label.module.scss";
import Label from "@components/Label/Label.tmp";
import Block from "@utils/classes/Block/Block";

interface ILabel {
  id?: string;
  className?: string;
  value?: Block | string;
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
