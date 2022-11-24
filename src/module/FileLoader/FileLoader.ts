import { Block } from "../../utils/classes/Block/Block";
import FileLoaderTmp from "./FileLoader.tmp";
import Templator from "../../utils/classes/Templator";
import * as styles from "./FileLoader.module.scss";

const tmp = new Templator(FileLoaderTmp);

class FileLoader extends Block {
  render() {
    return tmp.compile(this.props, styles);
  }
}

export default FileLoader;
