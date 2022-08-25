import ChatContact from "./ChatContact.tmp"
import styles from "./ChatContact.module.scss"
import Templator from "../../../../../../utils/Templator";

const tmp = new Templator(ChatContact)

const renderedTemplate = (...args) => tmp.compile(...args, styles)

export default renderedTemplate
