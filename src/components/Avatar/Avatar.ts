import Avatar from "@components/Avatar/Avatar.tmp";
import styles from "@components/Avatar/Avatar.module.scss";
import Templator from "@utils/classes/Templator";
import Block from "@utils/classes/Block/Block";

interface IAvatar {
  size?: string;
  image?: Block;
}

const tmp = new Templator(Avatar);

class AvatarComponent extends Block<IAvatar> {
  render() {
    return tmp.compile({ ...this.props }, styles);
  }
}

export default AvatarComponent;
