import Field from "./Field.tmp"
import styles from "./Fields.module.scss"
import Templator from "../../../../utils/Templator";

const tmp = new Templator(Field)

const renderedTemplate = (...args) => tmp.compile(...args, styles)

export default renderedTemplate

