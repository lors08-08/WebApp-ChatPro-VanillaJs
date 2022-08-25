import ChatEmpty from "./ChatEmpty.tmp"
import styles from "./ChatEmpty.module.scss"
import Templator from "../../../../../../utils/Templator";

import LayoutComponent from "../../../../../../components/Layout/Layout";

const tmp = new Templator(ChatEmpty)

const renderedTemplate = (...args) => tmp.compile(...args, styles)

export default LayoutComponent({
  content: renderedTemplate({ value: "Выберите чат чтобы отправить сообщение" })
})
