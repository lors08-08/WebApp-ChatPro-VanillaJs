import { EVENTS } from "./enum";

export interface IBlockEventsArgs {
  [EVENTS.INIT]: [];
  [EVENTS.FLOW_CDM]: [];
  [EVENTS.FLOW_CDU]: [any, any];
  [EVENTS.FLOW_RENDER]: [];
}

export interface IMetaProps<P> {
  props: P;
}

export type TMeta<P> = IMetaProps<P> | null;
export type TElement = HTMLElement | null;
