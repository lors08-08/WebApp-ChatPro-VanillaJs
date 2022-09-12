type THandler<A extends any[] = unknown[]> = (...args: A) => void;
type TMapInterface<P> = P[keyof P];

export class EventBus<
  E extends Record<string, string>,
  A extends Record<TMapInterface<E>, any[]>,
> {
  private readonly listeners: { [K in TMapInterface<E>]?: THandler<A[K]>[] };

  constructor() {
    this.listeners = {};
  }

  on<Event extends TMapInterface<E>>(
    event: TMapInterface<E>,
    callback: THandler<A[Event]>,
  ) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event]!.push(callback);
  }

  off<Event extends TMapInterface<E>>(
    event: TMapInterface<E>,
    callback: THandler<A[Event]>,
  ) {
    if (!this.listeners[event]) {
      throw new Error(`There is no such event: ${event}!`);
    }

    this.listeners[event] = this.listeners[event]!.filter(
      (handler) => handler !== callback,
    );
  }

  emit<Event extends TMapInterface<E>>(event: Event, ...args: A[Event]) {
    if (!this.listeners[event]) {
      throw new Error(`There is no such event: ${event}!`);
    }

    this.listeners[event]!.forEach((handler) => {
      handler(...args);
    });
  }
}

// enum EVENTS {
//   INIT = "init",
//   FLOW_CDM = "flow:component-did-mount",
//   FLOW_CDU = "flow:component-did-update",
//   FLOW_RENDER = "flow:render",
// }
//
// interface IBlockEventsArgs {
//   [EVENTS.INIT]: [];
//   [EVENTS.FLOW_CDM]: [];
//   [EVENTS.FLOW_CDU]: [any, any];
//   [EVENTS.FLOW_RENDER]: [];
// }
//
// const eventer = new EventBus<typeof EVENTS, IBlockEventsArgs>();
//
// eventer.on(EVENTS.INIT, () => {});
