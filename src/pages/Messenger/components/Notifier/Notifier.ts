import Notifier from "@pages/Messenger/components/Notifier/Notifier.tmp";
import styles from "@pages/Messenger/components/Notifier/Notifier.module.scss";
import Templator from "@utils/classes/Templator";
import Block from "@utils/classes/Block/Block";

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
