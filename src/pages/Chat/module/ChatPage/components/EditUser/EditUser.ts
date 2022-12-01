import AddUser from "./EditUser.tmp";
import * as styles from "./EditUser.module.scss";
import Templator from "../../../../../../utils/classes/Templator";
import { Block } from "../../../../../../utils/classes/Block/Block";

interface IEditUserComponent {
  icon: Block;
  value: string;
  event?: {
    type: string;
    action(e: any): void;
  };
}

const tmp = new Templator(AddUser);

class EditUserComponent extends Block<IEditUserComponent> {
  render() {
    const { event, ...props } = this.props;

    return tmp.compile({ ...props }, styles, event);
  }
}

export default EditUserComponent;
