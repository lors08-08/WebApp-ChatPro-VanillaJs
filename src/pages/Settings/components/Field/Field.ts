import Field from "@pages/Settings/components/Field/Field.tmp";
import styles from "@pages/Settings/components/Field/Fields.module.scss";
import Templator from "@utils/classes/Templator";
import Block from "@utils/classes/Block/Block";
import InputComponent from "@components/Input/Input";

interface IField {
  id?: string;
  key: Block | string;
  input?: InputComponent<{}>;
}

const tmp = new Templator(Field);

class FieldComponent extends Block<IField> {
  render() {
    return tmp.compile({ ...this.props }, styles);
  }
}

export default FieldComponent;
