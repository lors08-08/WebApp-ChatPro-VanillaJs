import Templator from "../../utils/Templator";
import styles from "./Label.module.scss"
import Label from './Label.tmp'

const tmpl = new Templator(Label)

const renderedTemplate = (...args) => tmpl.compile(...args,styles)

export default renderedTemplate
