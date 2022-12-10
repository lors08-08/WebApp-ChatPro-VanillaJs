import EventBus from "@utils/classes/EventBus";

export enum WSTransportEvents {
  CONNECTED = "connected",
  CLOSE = "close",
  ERROR = "error",
  MESSAGE = "message",
}

export default class WsTransport extends EventBus {
  private socket: WebSocket | null = null;
  private pingInterval: ReturnType<typeof setInterval> | null;

  constructor(private url: string) {
    super();
  }

  public connect(): Promise<void> {
    this.socket = new WebSocket(this.url);

    this.subscribe(this.socket);

    this.setPing();

    return new Promise((resolve) => {
      this.on(WSTransportEvents.CONNECTED, () => {
        resolve();
      });
    });
  }

  public send(data: unknown) {
    if (!this.socket) {
      throw new Error("Socket is not connected!");
    }

    this.socket.send(JSON.stringify(data));
  }

  public close() {
    this.socket?.close();
  }

  public subscribe(socket: WebSocket) {
    socket.addEventListener("open", () => {
      this.emit(WSTransportEvents.CONNECTED);
    });

    socket.addEventListener("close", () => {
      this.emit(WSTransportEvents.CLOSE);
    });

    socket.addEventListener("error", (e) => {
      this.emit(WSTransportEvents.ERROR, e);
    });

    socket.addEventListener("message", (message) => {
      try {
        const data = JSON.parse(message.data);

        if (data.type && data.type === "pong") {
          return;
        }

        this.emit(WSTransportEvents.MESSAGE, data);
      } catch (error) {
        throw new Error(error);
      }
    });
  }

  private setPing() {
    this.pingInterval = setInterval(() => {
      this.send({ type: "ping" });
    }, 5000);

    this.on(WSTransportEvents.CLOSE, () => {
      if (this.pingInterval) {
        clearInterval(this.pingInterval);
      }

      this.pingInterval = null;
    });
  }
}
