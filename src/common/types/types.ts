export type TNullable<T> = T | null;

export interface IContextData {
  [key: string]: IContextData | string | string[];
}

export interface IEvent {
  type: string;
  action(e?: any): void;
}
