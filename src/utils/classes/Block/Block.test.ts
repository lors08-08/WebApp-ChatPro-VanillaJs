import { assert } from "chai";

import { Block } from "./Block";
import Templator from "../Templator";

const mockTemplate = "<div id={{id}}>mock template</div>";

const tmp = new Templator(mockTemplate);

class MockComponent extends Block {
  render() {
    return tmp.compile({ ...this.props }, {});
  }
}

const component = new MockComponent({});

describe("Block", () => {
  before(() => {
    component.setProps({ prop: "testProp" });
  });

  it("Render вернул корректный результат", () => {
    assert.equal(component.getContent()?.innerHTML, "mock template");
  });

  it("Метод SetProps меняет пропсы компонента", () => {
    component.setProps({ id: "test" });
    assert.deepEqual(component.props, { id: "test", prop: "TestProp" });
  });
});
