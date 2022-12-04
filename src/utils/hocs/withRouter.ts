import { Block } from "../classes/Block/Block";
import Router from "../classes/Routing/Router";

export function withRouter(Component: any) {
  type Props = typeof Component extends typeof Block ? {} : any;

  return class WithRouter extends Component {
    constructor(props: Props & PropsWithRouter) {
      super({ ...props, router: Router });
    }
  };
}

export interface PropsWithRouter {
  router: typeof Router;
}
