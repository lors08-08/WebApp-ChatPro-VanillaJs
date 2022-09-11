import Sidebar from "./Sidebar.tmp";
import styles from "./Sidebar.module.scss";
import Templator from "../../../../utils/Templator";
import { Block } from "../../../../utils/Block";

interface ISidebarComponent {
  header: HTMLElement;
  chatContacts: HTMLElement;
}

const tmp = new Templator(Sidebar);

class SidebarComponent extends Block {
  constructor(props: ISidebarComponent) {
    super(props);
  }

  render(): ChildNode {
    return tmp.compile({ ...this.props }, styles);
  }
}

export default SidebarComponent;
