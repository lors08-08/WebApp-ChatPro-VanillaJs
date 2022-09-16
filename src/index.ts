import LoginPage from "./pages/Login/index";
// import SignupPage from "./pages/Signup/index";
// import ChatPage from "./pages/Chat/index";
// import ProfilePage from "./pages/Profile/index";
// import Page404 from "./pages/Page404/index";
// import Page500 from "./pages/Page500/index";
import { TNullable } from "./common/types/types";
import Routing from "./pages/Routing/index";

const root: TNullable<HTMLDivElement> = document.querySelector(
  "#root",
) as HTMLDivElement;

const currentLocation = window.location.pathname;

switch (currentLocation) {
  case "/login": {
    if (LoginPage) {
      root.append(LoginPage);
    }
    break;
  }
  // case "/signup": {
  //   if (SignupPage) {
  //     root.append(SignupPage);
  //   }
  //
  //   break;
  // }
  // case "/chat": {
  //   if (ChatPage) {
  //     root.append(ChatPage);
  //   }
  //   break;
  // }
  // case "/profile": {
  //   if (ProfilePage) {
  //     root.append(ProfilePage);
  //   }
  //   break;
  // }
  // case "/404": {
  //   if (Page404) {
  //     root.append(Page404);
  //   }
  //   break;
  // }
  // case "/500": {
  //   if (Page500) {
  //     root.append(Page500);
  //   }
  //   break;
  // }
  default: {
    root.innerHTML = Routing;
  }
}
