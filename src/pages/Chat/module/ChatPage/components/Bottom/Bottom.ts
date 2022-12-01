import { Block } from "../../../../../../utils/classes/Block/Block";
import Templator from "../../../../../../utils/classes/Templator";
import Bottom from "./Bottom.tmp";
import * as styles from "./Bottom.module.scss";

interface IBottom {
  attachIcon: Block;
  input: Block;
  sendButton: Block;
}

const template = new Templator(Bottom);

class BottomComponent extends Block<IBottom> {
  render(): DocumentFragment {
    return template.compile({ ...this.props }, styles);
  }
}

export default BottomComponent;
