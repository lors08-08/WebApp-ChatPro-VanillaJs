import Profile from "./Profile.tmp";
import styles from "./Profile.module.scss";
import { Block } from "../../../../../../../../../../utils/classes/Block/Block";
import Templator from "../../../../../../../../../../utils/classes/Templator";
import { TElement } from "../../../../../../../../../../utils/classes/Block/types/types";

interface IProfile {
  avatar: TElement;
  name: string;
}

const template = new Templator(Profile);

class ProfileComponent extends Block {
  constructor(props: IProfile) {
    super(props);
  }

  render() {
    return template.compile({ ...this.props }, styles);
  }
}

export default ProfileComponent;
