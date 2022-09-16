import InputComponent, { IInput } from "../../../../components/Input/Input";
import styles from "./SearchInput.module.scss";
import InputWrapper from "../../../../modules/InputWrapper/InputWrapper";

const SearchInput = (args: IInput) =>
  new InputWrapper({
    wrapperClass: "styles.search-wrapper",
    input: new InputComponent<IInput>({
      className: "styles.wrapper medium styles.ghost",
      additionalStyles: styles,
      ...args,
    }).getContent(),
  }).getContent();

export default SearchInput;
