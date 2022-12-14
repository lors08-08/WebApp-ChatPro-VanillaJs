type THandler<A extends any[] = unknown[]> = (...args: A) => void;
type TMapInterface<P> = P[keyof P];

class EventBus<
  E extends Record<string, string> = Record<string, string>,
  A extends Record<TMapInterface<E>, any[]> = Record<TMapInterface<E>, any[]>,
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

export default EventBus;
