import Page500 from "@pages/Page500/Page500.tmp";
import styles from "@pages/Page500/Page500.module.scss";
import Templator from "@utils/classes/Templator";
import LayoutComponent from "@components/Layout/Layout";
import ButtonComponent from "@components/Button/Button";
import Block from "@utils/classes/Block/Block";
import { TElement } from "@utils/classes/Block/types/types";

interface IPage500 {
  button: TElement;
}

const tmp = new Templator(Page500);

class Page500Component extends Block<IPage500> {
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
  content: new Page500Component({
    button: Button,
  }),
}).getContent();
