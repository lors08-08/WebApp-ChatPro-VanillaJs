import isEqual from "@utils/funcs/isEqual";
import renderDom from "@utils/funcs/renderDom";
import { TElement } from "@utils/classes/Block/types/types";

class Route {
  private block: TElement | null = null;

  constructor(
    private pathname: string,
    private readonly blockClass: TElement,
    private readonly query: string,
  ) {}

  leave() {
    this.block = null;
  }

  match(pathname: string) {
    return isEqual(pathname, this.pathname);
  }

  render() {
    if (!this.block) {
      this.block = this.blockClass;

      renderDom(this.query, this.blockClass);

      return;
    }
  }
}

export default Route;
