import { Block } from "../../utils/classes/Block/Block";
import FileLoaderTmp from "./FileLoader.tmp";
import Templator from "../../utils/classes/Templator";
import * as styles from "./FileLoader.module.scss";

interface IFileLoader {
  value: string;
}

const tmp = new Templator(FileLoaderTmp);

class FileLoader extends Block<IFileLoader> {
  file: File | null = null;
  getFile() {
    return this.file;
  }

  render() {
    const event = {
      type: "change",
      action: (e: Event) => {
        const currentTarget = e.target as HTMLInputElement;
        const file = currentTarget.files && currentTarget.files[0];

        if (file) {
          this.file = file;

          this.setProps({ ...this.props, value: file.name });
        }
      },
    };

    return tmp.compile(this.props, styles, event);
  }
}

export default FileLoader;
