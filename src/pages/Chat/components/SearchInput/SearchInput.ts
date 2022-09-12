import InputComponent, { IInput } from "../../../../components/Input/Input";
import styles from "./SearchInput.module.scss";

const SearchInput = (args: IInput) =>
  new InputComponent<IInput>({
    className: "styles.wrapper medium styles.ghost",
    wrapperClass: "styles.search-wrapper",
    additionalStyles: styles,
    ...args,
  }).getContent();

export default SearchInput;
