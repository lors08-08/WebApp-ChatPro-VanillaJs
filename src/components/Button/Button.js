import ButtonTmp from "./Button.tmp"
import styles from "./Button.module.scss"
import Templator from "../../utils/Templator";

const tmp = new Templator(ButtonTmp)

const renderedTemplate = (...args) => tmp.compile(...args,styles)

export default renderedTemplate
