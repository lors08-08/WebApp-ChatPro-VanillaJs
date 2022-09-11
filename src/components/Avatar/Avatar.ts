import Avatar from "./Avatar.tmp";
import styles from "./Avatar.module.scss";
import Templator from "../../utils/Templator";
import { IContextData } from "../../common/types/types";
import { Block } from "../../utils/Block";

interface IAvatar {
  size?: string;
  icon?: Block;
  image?: string;
}

const tmp = new Templator(Avatar);

class AvatarComponent extends Block {
  constructor(props: IAvatar) {
    super(props);
  }

  render(): ChildNode {
    return tmp.compile({ ...this.props }, styles);
  }
}

export default AvatarComponent;
