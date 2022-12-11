import Page404 from "@pages/Page404/Page404.tmp";
import styles from "@pages/Page404/Page404.module.scss";
import Templator from "@utils/classes/Templator";
import LayoutComponent from "@components/Layout/Layout";
import ButtonComponent from "@components/Button/Button";
import Block from "@utils/classes/Block/Block";
import { TElement } from "@utils/classes/Block/types/types";

interface IPage404 {
  button: TElement;
}

const tmp = new Templator(Page404);

class Page404Component extends Block<IPage404> {
  render() {
    return tmp.compile({ ...this.props }, styles);
  }
}

const Button = new ButtonComponent({
  value: "Назад к чатам",
  className: "styles.ghost",
}).getContent();

export default new LayoutComponent({
  className: "flexColumn",
  content: new Page404Component({
    button: Button,
  }),
}).getContent();
