import LoginPage from "./pages/Login/index";
import SignupPage from "./pages/Signup/index";
import ChatPage from "./pages/Chat/index";
import ProfilePage from "./pages/Profile/index";
import Page404 from "./pages/Page404/index";
import Page500 from "./pages/Page500/index";
import Router from "./utils/classes/Routing/Router";
import { Pages } from "./common/enums/Pages";

window.addEventListener("DOMContentLoaded", () => {
  Router.use(Pages.MESSENGER, ChatPage).start();

  Router.use(Pages.SIGN_IN, LoginPage)
    .use(Pages.SIGN_UP, SignupPage)
    .use(Pages.MESSENGER, ChatPage)
    .use(Pages.SETTING, ProfilePage)
    .use(Pages.PAGE_404, Page404)
    .use(Pages.PAGE_500, Page500)
    .start();
});
