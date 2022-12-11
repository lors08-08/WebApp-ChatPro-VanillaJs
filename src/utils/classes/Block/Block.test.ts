import { assert } from "chai";

import Block from "@utils/classes/Block/Block";
import Templator from "@utils/classes/Templator";

const template = new Templator("<div>{{content}}</div>");

class TestBlock extends Block {
  constructor(props: Record<string, any>) {
    super(props);
  }

  render() {
    return template.compile(this.props, {});
  }
}

const testBlock = new TestBlock({ content: "Test message" });

describe("Block base component: render", () => {
  it("Should render correctly", () => {
    assert.equal(testBlock.getContent()?.innerHTML, "Test message");
  });
});

describe("Block base component: props", () => {
  beforeEach(() => {
    testBlock.setProps({
      content: "New message",
    });
  });

  it("Should render given props", () => {
    assert.equal(testBlock.getContent()?.innerHTML, "New message");
  });
});
