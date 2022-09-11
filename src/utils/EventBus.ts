type EventHandler<T extends []> = (...args: T) => void;

// interface IEventBus {
//   listeners: Record<string, Array<EventHandler<[]>>>;
//   on(event: string, callback: () => void): void;
//   off(event: string, callback: () => void): void;
//   emit<T extends []>(event: string, ...args: T): void;
// }

export class EventBus {
  private readonly listeners: Record<string, Array<EventHandler<any>>>;

  constructor() {
    this.listeners = {};
  }

  on(event: string, callback: () => void) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event].push(callback);
  }

  off(event: string, callback: () => void) {
    if (!this.listeners[event]) {
      throw new Error(`There is no such event: ${event}!`);
    }

    this.listeners[event] = this.listeners[event].filter(
      (handler) => handler !== callback,
    );
  }

  emit<T extends []>(event: string, ...args: T) {
    if (!this.listeners[event]) {
      throw new Error(`There is no such event: ${event}!`);
    }

    this.listeners[event].forEach((handler) => {
      handler(...args);
    });
  }
}
