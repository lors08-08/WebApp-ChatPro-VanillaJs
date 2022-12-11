import Profile from "@pages/Messenger/components/Profile/Profile.tmp";
import styles from "@pages/Messenger/components/Profile/Profile.module.scss";
import Templator from "@utils/classes/Templator";
import Block from "@utils/classes/Block/Block";

interface IProfile {
  avatar: Block;
  name: string;
}

const template = new Templator(Profile);

class ProfileComponent extends Block<IProfile> {
  render() {
    return template.compile({ ...this.props }, styles);
  }
}

export default ProfileComponent;
