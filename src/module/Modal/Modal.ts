import Templator from "../../utils/classes/Templator";
import * as styles from "./Modal.module.scss";
import Modal from "./Modal.tmp";
import { Block } from "../../utils/classes/Block/Block";
import { TElement } from "../../utils/classes/Block/types/types";

interface IModal {
  id?: string;
  title: string;
  input: TElement | string;
  className?: string;
  actionBtn: TElement;
  closeBtn?: TElement;
  error?: string;
  darkBack?: string;
  event?: {
    type: string;
    action(e: any): void;
  };
}

const tmp = new Templator(Modal);

class ModalComponent extends Block<IModal> {
  render() {
    const { event, ...props } = this.props;

    const compiled = tmp.compile({ ...props }, styles, event);

    compiled
      .querySelector("#modal-avatar")
      ?.addEventListener("click", (e) => e.stopPropagation());

    return compiled;
  }
}

export default ModalComponent;
