import { Block } from "../../utils/classes/Block/Block";
import Image from "./Image.tmp";
import Templator from "../../utils/classes/Templator";
import * as styles from "./Image.module.scss";

interface IImage {
  src: string;
}

const tmp = new Templator(Image);

class ImageComponent extends Block<IImage> {
  render() {
    return tmp.compile(this.props, styles);
  }
}

export default ImageComponent;
