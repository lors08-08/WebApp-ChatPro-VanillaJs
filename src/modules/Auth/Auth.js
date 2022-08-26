import Templator from "../../utils/Templator";
import Auth from "./Auth.tmp"

const tmpl = new Templator(Auth)

const renderedTemplate = (...args) => tmpl.compile(...args)

export default renderedTemplate
