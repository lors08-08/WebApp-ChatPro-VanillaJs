import Sidebar from "./Sidebar.tmp"
import styles from "./Sidebar.module.scss"
import Templator from "../../../../utils/Templator";

const tmp = new Templator(Sidebar)

const renderedTemplate = (...args) => tmp.compile(...args, styles)

export default renderedTemplate
