import Page404 from "./Page404.tmp";
import styles from "./Page404.module.scss";
import Templator from "../../utils/Templator";
import LayoutComponent from "../../components/Layout/Layout";
import ButtonComponent from "../../components/Button/Button";
import { Block } from "../../utils/Block";

interface IPage404 {
  button: HTMLElement;
}

const tmp = new Templator(Page404);

class Page404Component extends Block {
  constructor(props: IPage404) {
    super(props);
  }

  render(): ChildNode {
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
  }).getContent(),
}).getContent();
