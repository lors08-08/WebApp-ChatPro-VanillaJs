import Field from "./Field.tmp";
import * as styles from "./Fields.module.scss";
import Templator from "../../../../utils/classes/Templator";
import { Block } from "../../../../utils/classes/Block/Block";

interface IField {
  id?: string;
  key: Block | string;
  input?: Block;
}

const tmp = new Templator(Field);

class FieldComponent extends Block<IField> {
  render() {
    return tmp.compile({ ...this.props }, styles);
  }
}

export default FieldComponent;
