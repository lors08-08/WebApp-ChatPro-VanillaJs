import Header from "@pages/Messenger/module/Sidebar/module/Header/Header.tmp";
import styles from "@pages/Messenger/module/Sidebar/module/Header/Header.module.scss";
import Templator from "@utils/classes/Templator";
import Block from "@utils/classes/Block/Block";

interface ISidebarComponent {
  button: Block;
  search?: Block;
}

const tmp = new Templator(Header);

class HeaderComponent extends Block<ISidebarComponent> {
  render() {
    return tmp.compile({ ...this.props }, styles);
  }
}

export default HeaderComponent;
