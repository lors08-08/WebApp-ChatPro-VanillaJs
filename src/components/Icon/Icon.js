import icon from "./Icon.tmp"
import Templator from "../../utils/Templator";
import styles from "./Icon.module.scss"

const tmp = new Templator(icon)

const renderedTemplate = (...args) => tmp.compile(...args, styles)

export default renderedTemplate
