import Avatar from "./Avatar.tmp";
import styles from "./Avatar.module.scss"
import Templator from "../../../../utils/Templator";

const tmp = new Templator(Avatar)

const renderedTemplate = (...args) => tmp.compile(...args, styles)

export default renderedTemplate
