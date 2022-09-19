import SendButton from "./SendButton.tmp";
import styles from "./SendButton.module.scss";
import Templator from "../../../../../../../../../../utils/classes/Templator";
import { Block } from "../../../../../../../../../../utils/classes/Block/Block";
import { TElement } from "../../../../../../../../../../utils/classes/Block/types/types";

interface ISendButton {
  icon: TElement;
}

const template = new Templator(SendButton);

class SendButtonComponent extends Block {
  constructor(props: ISendButton) {
    super(props);
  }

  render(): DocumentFragment {
    return template.compile({ ...this.props }, styles);
  }
}

export default SendButtonComponent;
