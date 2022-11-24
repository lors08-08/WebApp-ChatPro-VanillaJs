import * as styles from "./Modal.module.scss";
import Modal from "./Modal.tmp";
import { TElement } from "../../../../../../utils/classes/Block/types/types";
import Templator from "../../../../../../utils/classes/Templator";
import { Block } from "../../../../../../utils/classes/Block/Block";

interface IModal {
  id?: string;
  addUser: TElement;
  deleteUser: TElement;
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
      .querySelector("#modal-header")
      ?.addEventListener("click", (e) => e.stopPropagation());

    return compiled;
  }
}

export default ModalComponent;
