import Page500 from "./Page500.tmp";
import styles from "./Page500.module.scss";
import Templator from "../../utils/Templator";
import LayoutComponent from "../../components/Layout/Layout";
import ButtonComponent from "../../components/Button/Button";
import { Block } from "../../utils/Block";

interface IPage500 {
  button: HTMLElement;
}

const tmp = new Templator(Page500);

class Page500Component extends Block {
  constructor(props: IPage500) {
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
  content: new Page500Component({
    button: Button,
  }).getContent(),
}).getContent();
