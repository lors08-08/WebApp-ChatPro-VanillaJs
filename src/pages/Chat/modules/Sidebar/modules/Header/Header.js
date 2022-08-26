import Header from "./Header.tmp"
import styles from "./Header.module.scss"
import Templator from "../../../../../../utils/Templator";

const tmp = new Templator(Header)

const renderedTemplate = (...args) => tmp.compile(...args, styles)

export default renderedTemplate
