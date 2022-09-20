import Profile from "./Profile.tmp";
import * as styles from "./Profile.module.scss";
import { TElement } from "../../../../utils/classes/Block/types/types";
import Templator from "../../../../utils/classes/Templator";
import { Block } from "../../../../utils/classes/Block/Block";

interface IProfile {
  avatar: TElement;
  name: string;
}

const template = new Templator(Profile);

class ProfileComponent extends Block<IProfile> {
  render() {
    return template.compile({ ...this.props }, styles);
  }
}

export default ProfileComponent;
