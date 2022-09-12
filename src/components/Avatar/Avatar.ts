import Avatar from "./Avatar.tmp";
import styles from "./Avatar.module.scss";
import Templator from "../../utils/classes/Templator";
import { Block } from "../../utils/classes/Block/Block";
import { TElement } from "../../utils/classes/Block/types/types";

interface IAvatar {
  size?: string;
  icon?: TElement;
  image?: string;
}

const tmp = new Templator(Avatar);

class AvatarComponent extends Block {
  constructor(props: IAvatar) {
    super(props);
  }

  render() {
    return tmp.compile({ ...this.props }, styles);
  }
}

export default AvatarComponent;
