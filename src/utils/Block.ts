import { nanoid } from "nanoid";

import { EventBus } from "./EventBus";
import Templator from "./Templator";

enum EVENTS {
  INIT = "init",
  FLOW_CDM = "flow:component-did-mount",
  FLOW_CDU = "flow:component-did-update",
  FLOW_RENDER = "flow:render",
}

interface IMetaProps {
  props: any;
}

type TMeta = IMetaProps | null;
type TElement = DocumentFragment | null;

export class Block {
  static EVENTS = EVENTS;

  protected props: Record<string, unknown>;
  private readonly eventBus: () => EventBus;

  _element: TElement = null;
  _old_element: TElement = null;

  _meta: TMeta = null;

  constructor(props = {}) {
    const eventBus = new EventBus();

    this._meta = {
      props,
    };

    this.props = this._makeProxyProps(props);
    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  _registerEvents(eventBus) {
    eventBus.on(Block.EVENTS.INIT, this._init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  _createResources() {
    if (!this._meta) {
      return;
    }

    this._element = this._createDocumentElement();
  }

  _createDocumentElement() {
    return document.createDocumentFragment();
  }

  private _init() {
    this._createResources();

    this.init();

    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  protected init() {}

  private _componentDidMount() {
    this.componentDidMount();
  }

  componentDidMount(oldProps = null) {}

  public dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  private _componentDidUpdate(newProps, oldProps) {
    const response = this.componentDidUpdate(oldProps, newProps);

    if (response) {
      this._render();
    }
  }

  protected componentDidUpdate(oldProps, newProps) {
    return true;
  }

  public setProps(nextProps) {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  }

  get element() {
    return this._element;
  }

  private _render() {
    const block = this.render();

    this._element.append(block);
  }

  render(): ChildNode {
    return;
  }

  getContent() {
    return this.element;
  }

  _makeProxyProps(props) {
    return new Proxy(props, {
      get: (target, prop) => {
        const value = target[prop];

        return typeof value === "function" ? value.bind(target) : value;
      },
      set: (target, prop, value) => {
        const oldTarget = { ...target };

        target[prop] = value;

        this.eventBus().emit<any>(Block.EVENTS.FLOW_CDU, oldTarget, target);

        return true;
      },
      deleteProperty() {
        throw new Error("You have no access");
      },
    });
  }

  show() {
    const currentElement = this.getContent();

    // if (currentElement) {
    //   currentElement.style.display = "block";
    // }
  }
  hide() {
    const currentElement = this.getContent();

    // if (currentElement) {
    //   currentElement.style.display = "none";
    // }
  }
}
