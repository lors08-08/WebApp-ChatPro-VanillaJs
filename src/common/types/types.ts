export type TNullable<T> = T | null;

export interface IContextData {
  [key: string]: IContextData | string | string[];
}
