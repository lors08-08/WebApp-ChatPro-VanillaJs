import { TElement } from "../classes/Block/types/types";

function renderDom(query: string, block: TElement) {
  const root = document.querySelector(query);

  if (!root) {
    throw new Error(`There is no such node with this - ${query} selector`);
  }

  root.innerHTML = "";

  root.append(block!);

  return root;
}

export default renderDom;
