import Layout from "./Layout.tmp"
import styles from "./Layout.module.scss"
import Templator from "../../utils/Templator";

const tmp = new Templator(Layout)

const renderedTemplate = (...args) => tmp.compile(...args, styles)

export default renderedTemplate
