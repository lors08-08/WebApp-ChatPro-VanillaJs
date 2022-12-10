import { IEvent } from "@common/types/types";
import Block from "@utils/classes/Block/Block";
import Templator from "@utils/classes/Templator";
import styles from "@components/Link/Link.module.scss";
import Link from "@components/Link/Link.tmp";
import { PropsWithRouter, withRouter } from "@utils/hocs/withRouter";

interface ILink extends PropsWithRouter {
  id: string;
  to: string;
  value: string | HTMLDivElement;
  event?: IEvent;
}

const tmp = new Templator(Link);

class LinkComponent extends Block<ILink> {
  constructor(props: ILink) {
    super({
      ...props,
      event: {
        type: "click",
        action: () => this.navigate(),
      },
    });
  }

  navigate() {
    this.props.router.go(this.props.to);
  }

  render() {
    return tmp.compile({ ...this.props }, styles, this.props.event);
  }
}

const LinkHoc = withRouter(LinkComponent) as typeof Block;

export default LinkHoc;
