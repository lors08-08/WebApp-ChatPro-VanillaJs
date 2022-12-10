import WsTransport, { WSTransportEvents } from "@utils/classes/WsTransport";
import Store from "@utils/classes/Store";

export interface IMessage {
  chat_id: number;
  time: string;
  type: string;
  user_id: number;
  content: string;
  file?: {
    id: number;
    user_id: number;
    path: string;
    filename: string;
    content_type: string;
    content_size: number;
    upload_date: string;
  };
}

class MessageController {
  private sockets: Map<number, WsTransport> = new Map();

  async connect(chatId: number, token: string) {
    if (this.sockets.has(chatId)) {
      return;
    }

    const userId = Store.getState().user?.id;

    const wsTransport = new WsTransport(
      `wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${token}`,
    );

    this.sockets.set(chatId, wsTransport);

    await wsTransport.connect();

    this.subscribe(wsTransport, chatId);
    this.fetchOldMessages(chatId);
  }

  sendMessage(chatId: number, message: string) {
    const socket = this.sockets.get(chatId);

    if (!socket) {
      throw new Error(`Chat ${chatId} is not connected`);
    }

    socket.send({
      type: "message",
      content: message,
    });
  }

  fetchOldMessages(id: number) {
    const socket = this.sockets.get(id);

    if (!socket) {
      throw new Error(`There is no such connection with chat-ID - ${id}`);
    }

    socket.send({ type: "get old", content: "0" });
  }

  closeAll() {
    Array.from(this.sockets.values()).forEach((socket) => socket.close());
  }

  private onMessage(chatId: number, messages: IMessage | IMessage[]) {
    let newMessages: IMessage[] = [];

    if (Array.isArray(messages)) {
      newMessages = messages.reverse();
    } else {
      newMessages.push(messages);
    }

    const currentMessages = (Store.getState().messages || {})[chatId] || [];

    newMessages = [...currentMessages, ...newMessages];

    Store.set(`messages.${chatId}`, newMessages);
  }

  private onClose(chatId: number) {
    this.sockets.delete(chatId);
  }

  private subscribe(transport: WsTransport, id: number) {
    transport.on(WSTransportEvents.MESSAGE, (message) =>
      this.onMessage(id, message),
    );
    transport.on(WSTransportEvents.CLOSE, () => this.onClose(id));
  }
}

export default new MessageController();
