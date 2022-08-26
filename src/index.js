import LoginPage from "./pages/Login/index"
import SignupPage from "./pages/Signup/index"
import ChatPage from "./pages/Chat/index"
import ProfilePage from "./pages/Profile/index"
import Page404 from "./pages/Page404/index"
import Page500 from "./pages/Page500/index"

import Routing from "./pages/Routing/index.js"

const root = document.querySelector('#root')

const currentLocation = window.location.pathname
if(currentLocation === "/login") {
  root.innerHTML = LoginPage
} else if(currentLocation === "/signup") {
  root.innerHTML = SignupPage
} else if(currentLocation === "/chat") {
  root.innerHTML = ChatPage
} else if(currentLocation === "/profile") {
  root.innerHTML = ProfilePage
} else if(currentLocation === "/404") {
  root.innerHTML = Page404
} else if(currentLocation === "/500") {
  root.innerHTML = Page500
} else {
  root.innerHTML = Routing
}
