import Avatar from "./Avatar.tmp";
import styles from "./Avatar.module.scss";
import Templator from "../../../../utils/Templator";
import { Block } from "../../../../utils/Block";

interface IAvatar {
  avatarImg: string;
  name: string;
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
