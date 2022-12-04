import Route from "./Route";
import { TElement } from "../Block/types/types";
import AuthController from "../../../controllers/AuthController";
import { Pages } from "../../../common/enums/Pages";

class Router {
  private static __instance: Router;
  public routes: Route[] = [];
  private currentRoute: Route | null = null;
  private history: History = window.history;

  constructor(private readonly rootQuery: string) {
    if (Router.__instance) {
      return Router.__instance;
    }
    this.routes = [];

    Router.__instance = this;
  }

  public use(pathname: string, block: TElement) {
    const route = new Route(pathname, block, this.rootQuery);

    this.routes.push(route);

    return this;
  }

  public start() {
    window.onpopstate = (event: PopStateEvent) => {
      const target = event.currentTarget as Window;

      this._onRoute(target.location.pathname);
    };

    this._onRoute(window.location.pathname);
  }

  private _onRoute(pathname: string) {
    const route = this.getRoute(pathname);

    if (!route) {
      const notFound = this.getRoute(Pages.PAGE_404);

      notFound?.render();

      return;
    }

    if (this.currentRoute && this.currentRoute !== route) {
      this.currentRoute.leave();
    }

    this.currentRoute = route;

    route.render();
  }

  public async go(pathname: string) {
    this.history.pushState({}, "", pathname);

    if (pathname === Pages.SIGN_UP || pathname === Pages.SIGN_IN) {
      this._onRoute(pathname);
    } else {
      try {
        await AuthController.fetchUser();

        this._onRoute(pathname);
      } catch {
        this._onRoute(Pages.SIGN_IN);
      }
    }
  }

  public forward() {
    this.history.forward();
  }
  public back() {
    this.history.back();
  }

  private getRoute(pathname: string) {
    return this.routes.find((route) => route.match(pathname));
  }
}

export default new Router("#root");
