import set from "@utils/funcs/set";
import EventBus from "@utils/classes/EventBus";
import { IBlockEventsArgs } from "@utils/classes/Block/types/types";
import { IUpdateProfileResponseDto } from "@api/types/user/response/IUpdateProfileResponseDto";
import { IChatAllResponseDto } from "@api/types/chat/response/IChatAllResponseDto";
import { IMessage } from "@controllers/MessageController";

interface IState {
  user: IUpdateProfileResponseDto | null;
  chat: IChatAllResponseDto[] | null;
  chat_selected: IChatAllResponseDto | null;
  messages: Record<number, IMessage[]> | null;
}

export enum StoreEvents {
  UPDATED = "updated",
}

interface IBlockEvents extends IBlockEventsArgs {
  [StoreEvents.UPDATED]: [];
}

class Store extends EventBus<typeof StoreEvents, IBlockEvents> {
  private state: IState = {
    user: null,
    chat: null,
    chat_selected: null,
    messages: null,
  };

  public set(keypath: string, data: unknown) {
    set(this.state, keypath, data);

    this.emit(StoreEvents.UPDATED);
  }

  public getState() {
    return this.state;
  }
}

export default new Store();
