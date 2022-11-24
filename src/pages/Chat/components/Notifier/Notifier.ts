import Notifier from "./Notifier.tmp";
import * as styles from "./Notifier.module.scss";
import Templator from "../../../../utils/classes/Templator";
import { Block } from "../../../../utils/classes/Block/Block";

interface INotifier {
  value: number;
}

const tmp = new Templator(Notifier);

class NotifierComponent extends Block<INotifier> {
  render() {
    return tmp.compile({ value: this.props.value.toString() }, styles);
  }
}

export default NotifierComponent;
