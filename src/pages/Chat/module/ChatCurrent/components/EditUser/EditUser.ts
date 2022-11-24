import AddUser from "./EditUser.tmp";
import * as styles from "./EditUser.module.scss";
import { TElement } from "../../../../../../utils/classes/Block/types/types";
import Templator from "../../../../../../utils/classes/Templator";
import { Block } from "../../../../../../utils/classes/Block/Block";

interface IEditUserComponent {
  icon: TElement;
  value: string;
  event?: {
    type: string;
    action(e: any): void;
  };
}

const tmp = new Templator(AddUser);

class EditUserComponent extends Block<IEditUserComponent> {
  render() {
    return tmp.compile({ ...this.props }, styles);
  }
}

export default EditUserComponent;
