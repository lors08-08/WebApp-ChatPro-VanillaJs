import Templator from "../../utils/classes/Templator";
import * as styles from "./Modal.module.scss";
import Modal from "./Modal.tmp";
import { Block } from "../../utils/classes/Block/Block";
import { IEvent } from "../../common/types/types";

interface IModal {
  id?: string;
  title: string;
  input: Block | string;
  className?: string;
  actionBtn: Block;
  closeBtn?: Block;
  error?: string;
  darkBack?: string;
  event?: IEvent;
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
