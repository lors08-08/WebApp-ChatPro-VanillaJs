import AddUser from "@pages/Messenger/module/ChatPage/components/EditChat/EditChat.tmp";
import styles from "@pages/Messenger/module/ChatPage/components/EditChat/EditChat.module.scss";
import Templator from "@utils/classes/Templator";
import Block from "@utils/classes/Block/Block";
import { IEvent } from "@common/types/types";

interface IEditChatComponent {
  icon: Block;
  value: string;
  event?: IEvent;
}

const tmp = new Templator(AddUser);

class EditChatComponent extends Block<IEditChatComponent> {
  render() {
    const { event, ...props } = this.props;

    return tmp.compile({ ...props }, styles, event);
  }
}

export default EditChatComponent;
