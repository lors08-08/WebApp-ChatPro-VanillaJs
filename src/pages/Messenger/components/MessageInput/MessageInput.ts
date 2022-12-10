import styles from "@pages/Messenger/components/MessageInput/MessageInput.module.scss";
import InputComponent, { IInput } from "@components/Input/Input";
import InputWrapper from "@module/InputWrapper/InputWrapper";

const ctxMessageInput = {
  id: "message",
  name: "message",
  type: "text",
  placeholder: "Сообщение",
};

export const MessageInput = new InputComponent<IInput>({
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
  ...ctxMessageInput,
});

export const MessageField = () => {
  return new InputWrapper({
    wrapperClass: "styles.message-wrapper styles.ghost",
    additionalStyles: styles,
    input: MessageInput,
  });
};
