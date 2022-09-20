import * as styles from "./MessageInput.module.scss";
import InputComponent, { IInput } from "../../../../components/Input/Input";
import InputWrapper from "../../../../module/InputWrapper/InputWrapper";

const MessageInput = (args: IInput) => {
  const { iconLeft, ...rest } = args;

  return new InputWrapper({
    iconLeft: iconLeft,
    wrapperClass: "styles.message-wrapper styles.ghost",
    additionalStyles: styles,
    input: new InputComponent<IInput>({
      className: "medium styles.ghost styles.message-input",
      additionalStyles: styles,
      event: [
        {
          type: "focus",
          action(e: FocusEvent) {
            const targetInput = e.target as HTMLInputElement;

            targetInput.style.borderColor = "";
            targetInput.style.borderWidth = "";
            targetInput.style.borderStyle = "";
          },
        },
        {
          type: "focusout",
          action(e: FocusEvent) {
            const targetInput = e.target as HTMLInputElement;

            if (!targetInput.value.length) {
              targetInput.style.borderColor = "#ff2f2f";
              targetInput.style.borderWidth = "1px";
              targetInput.style.borderStyle = "solid";
            }
          },
        },
      ],
      ...rest,
    }).getContent(),
  }).getContent();
};

export default MessageInput;
