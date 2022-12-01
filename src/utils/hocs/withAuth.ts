import Router from "../classes/Routing/Router";
import { Pages } from "../../common/enums/Pages";
import AuthController from "../../controllers/AuthController";

export function withAuth(Component: any) {
  (async () => {
    try {
      await AuthController.fetchUser();
    } catch {
      await Router.go(Pages.SIGN_IN);
    }
  })();

  return Component;
}
