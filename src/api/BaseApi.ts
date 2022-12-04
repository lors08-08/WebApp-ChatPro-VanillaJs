import { Superfetch } from "../utils/classes/Superfetch";

export default abstract class BaseApi {
  protected http: Superfetch;

  protected constructor(endpoint: string) {
    this.http = new Superfetch(endpoint);
  }

  public abstract create?(data: unknown): Promise<unknown>;

  public abstract read?(id?: unknown): Promise<unknown>;

  public abstract update?(id: unknown): Promise<unknown>;

  public abstract delete?(id: unknown): Promise<unknown>;
}
