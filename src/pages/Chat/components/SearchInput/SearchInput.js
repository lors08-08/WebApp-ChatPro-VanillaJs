import InputComponent from "../../../../components/Input/Input";
import styles from "./SearchInput.module.scss"

const SearchInput = (args) => InputComponent({
  className: "styles.wrapper medium",
  wrapperClass: "styles.search-wrapper",
  enhancedStyles: styles,
  ...args,
})

export default SearchInput
