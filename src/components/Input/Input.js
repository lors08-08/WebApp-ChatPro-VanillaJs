import InputTmp from "./Input.tmp"
import styles from "./Input.module.scss"
import Templator from "../../utils/Templator";

const tmpl = new Templator(InputTmp)

const renderedTemplate = (...args) => {
  const { enhancedStyles, ...rest } = args[0]

  const combinedStyles = {...styles, ...enhancedStyles}

  return tmpl.compile(rest, combinedStyles)
}

export default renderedTemplate
