import LoginPage from "./pages/Login/index";
import SignupPage from "./pages/Signup/index";
import Messenger from "./pages/Messenger/index";
import Settings from "./pages/Settings/index";
import Page404 from "./pages/Page404/index";
import Page500 from "./pages/Page500/index";
import Router from "./utils/classes/Routing/Router";
import { Pages } from "./common/enums/Pages";

window.addEventListener("DOMContentLoaded", () => {
  Router.use(Pages.SIGN_IN, LoginPage)
    .use(Pages.SIGN_UP, SignupPage)
    .use(Pages.MESSENGER, Messenger)
    .use(Pages.SETTING, Settings)
    .use(Pages.PAGE_404, Page404)
    .use(Pages.PAGE_500, Page500)
    .start();
});
