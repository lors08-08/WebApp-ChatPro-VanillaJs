import styles from "@pages/Messenger/module/ChatPage/components/Modal/Modal.module.scss";
import Modal from "@pages/Messenger/module/ChatPage/components/Modal/Modal.tmp";
import Templator from "@utils/classes/Templator";
import Block from "@utils/classes/Block/Block";
import { IEvent } from "@common/types/types";

interface IModal {
  id?: string;
  addUser: Block;
  deleteUser: Block;
  deleteChat: Block;
  event?: IEvent;
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
