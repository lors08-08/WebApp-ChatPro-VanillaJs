import InputComponent, { IInput } from "@components/Input/Input";
import styles from "@pages/Messenger/components/SearchInput/SearchInput.module.scss";
import InputWrapper from "@module/InputWrapper/InputWrapper";

const SearchInput = (args: IInput) => {
  const { iconLeft, event, ...rest } = args;

  return new InputWrapper({
    iconLeft: iconLeft,
    wrapperClass: "styles.search-wrapper styles.ghost",
    input: new InputComponent<IInput>({
      className: "styles.wrapper medium styles.ghost",
      additionalStyles: styles,
      ...rest,
      event,
    }),
  });
};

export default SearchInput;
