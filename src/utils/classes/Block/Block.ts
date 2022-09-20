import { EventBus } from "../EventBus";
import { Events } from "./types/enum";
import { IBlockEventsArgs, TElement, TMeta } from "./types/types";
import isEqual from "../../funcs/isEqual";

export class Block<P extends {}> {
  static Events = Events;

  protected props = {} as P;
  private readonly eventBus: () => EventBus<typeof Events, IBlockEventsArgs>;

  _element: TElement = null;

  _meta: TMeta<P> = null;

  constructor(props: P) {
    const eventBus = new EventBus<typeof Events, IBlockEventsArgs>();

    this._meta = {
      props,
    };

    this.props = this._makeProxyProps(props);
    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);
    eventBus.emit(Block.Events.INIT);
  }

  private _registerEvents(eventBus: EventBus<typeof Events, IBlockEventsArgs>) {
    eventBus.on(Block.Events.INIT, this._init.bind(this));
    eventBus.on(Block.Events.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.Events.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.Events.FLOW_RENDER, this._render.bind(this));
  }

  private _createResources() {
    if (!this._meta) {
      return;
    }
  }

  private _init() {
    this._createResources();

    this.init();

    this.eventBus().emit(Block.Events.FLOW_RENDER);
  }

  protected init() {}

  private _componentDidMount() {
    this.componentDidMount();
  }

  componentDidMount(oldProps = null) {}

  public dispatchComponentDidMount() {
    this.eventBus().emit(Block.Events.FLOW_CDM);
  }

  private _componentDidUpdate(newProps: P, oldProps: P) {
    const response = this.componentDidUpdate(oldProps, newProps);

    if (!response) {
      this._render();
    }
  }

  protected componentDidUpdate(oldProps: P, newProps: P) {
    return isEqual(oldProps, newProps);
  }

  public setProps(nextProps: P) {
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

    const rootElement = block.firstElementChild as HTMLElement;

    if (this._element) {
      this._element.replaceWith(rootElement);
    }

    this._element = rootElement;
  }

  public render(): DocumentFragment {
    return new DocumentFragment();
  }

  public getContent() {
    return this.element;
  }

  private _makeProxyProps(props: P) {
    return new Proxy(props, {
      get: (target: any, prop: string) => {
        const value = target[prop];

        return typeof value === "function" ? value.bind(target) : value;
      },
      set: (target: P, prop: string, value) => {
        const oldTarget = { ...target };

        target[prop as keyof P] = value;

        this.eventBus().emit<any>(Block.Events.FLOW_CDU, oldTarget, target);

        return true;
      },
      deleteProperty() {
        throw new Error("You have no access");
      },
    });
  }

  public show() {
    const currentElement = this.getContent();

    if (currentElement) {
      currentElement.style.display = "block";
    }
  }
  public hide() {
    const currentElement = this.getContent();

    if (currentElement) {
      currentElement.style.display = "none";
    }
  }
}
