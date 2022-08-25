import Page404 from "./Page404.tmp"
import styles from "./Page404.module.scss"
import Templator from "../../utils/Templator";
import LayoutComponent from "../../components/Layout/Layout"
import ButtonComponent from "../../components/Button/Button"

const tmp = new Templator(Page404)

const renderedTemplate = (...args) => tmp.compile(...args, styles)

const Button = ButtonComponent({
  value: "Назад к чатам",
  className: "styles.ghost"
})


export default LayoutComponent({
  className: "flexColumn",
  content: renderedTemplate({
    button: Button
  })
})
