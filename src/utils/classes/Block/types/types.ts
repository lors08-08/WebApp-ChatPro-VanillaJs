import { Events } from "./enum";

export interface IBlockEventsArgs {
  [Events.INIT]: [];
  [Events.FLOW_CDM]: [];
  [Events.FLOW_CDU]: [any, any];
  [Events.FLOW_RENDER]: [];
}

export interface IMetaProps<P> {
  props: P;
}

export type TMeta<P> = IMetaProps<P> | null;
export type TElement = HTMLElement | null;
