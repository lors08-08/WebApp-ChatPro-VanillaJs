import { Block } from "../../../../../../utils/classes/Block/Block";
import Templator from "../../../../../../utils/classes/Templator";
import Bottom from "./Bottom.tmp";
import * as styles from "./Bottom.module.scss";
import { TElement } from "../../../../../../utils/classes/Block/types/types";

interface IBottom {
  attachIcon: TElement;
  input: TElement;
  sendButton: TElement;
}

const template = new Templator(Bottom);

class BottomComponent extends Block<IBottom> {
  render(): DocumentFragment {
    return template.compile({ ...this.props }, styles);
  }
}

export default BottomComponent;
