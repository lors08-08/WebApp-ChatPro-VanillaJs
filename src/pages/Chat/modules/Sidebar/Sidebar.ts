import Sidebar from "./Sidebar.tmp";
import styles from "./Sidebar.module.scss";
import Templator from "../../../../utils/classes/Templator";
import { Block } from "../../../../utils/classes/Block/Block";
import { TElement } from "../../../../utils/classes/Block/types/types";

interface ISidebarComponent {
  header: TElement;
  chatContacts: TElement | TElement[];
}

const tmp = new Templator(Sidebar);

class SidebarComponent extends Block {
  constructor(props: ISidebarComponent) {
    super(props);
  }

  render() {
    return tmp.compile({ ...this.props }, styles);
  }
}

export default SidebarComponent;
