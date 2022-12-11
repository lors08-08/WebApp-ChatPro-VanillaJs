import Router from "@utils/classes/Routing/Router";
import { Pages } from "@common/enums/Pages";
import AuthController from "@controllers/AuthController";

export function withRedirect(Component: any) {
  (async () => {
    const currentPage = window.location.pathname;

    if (currentPage === Pages.SIGN_IN || currentPage === Pages.SIGN_UP) {
      try {
        await AuthController.fetchUser();

        await Router.go(Pages.MESSENGER);
      } catch {
        return;
      }
    }
  })();

  return Component;
}
