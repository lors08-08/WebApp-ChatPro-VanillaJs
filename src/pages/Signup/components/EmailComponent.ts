import Block from "@utils/classes/Block/Block";
import InputComponent from "@components/Input/Input";
import InputWrapper from "@module/InputWrapper/InputWrapper";
import LabelComponent from "@components/Label/Label";

interface IEmailComponentProps {
  restoreInput(e: Event, error: Block): void;
  validate(value: string, regExp: RegExp): boolean;
  emailError: Block;
}

const ctxLabelMail = {
  id: "email",
  value: "Почта",
};
const ctxEmail = {
  id: "email",
  name: "email",
  type: "text",
  placeholder: "Почта",
};

export default function EmailComponent({
  restoreInput,
  validate,
  emailError,
}: IEmailComponentProps) {
  return new InputWrapper({
    label: new LabelComponent(ctxLabelMail),
    wrapperClass: "flexColumn",
    error: emailError,
    input: new InputComponent({
      ...ctxEmail,
      event: [
        {
          type: "focus",
          action: (e: Event) => {
            restoreInput(e, emailError);
          },
        },
        {
          type: "focusout",
          action: (e: Event) => {
            const targetInput = e.target as HTMLInputElement;

            const isValid = validate(
              targetInput.value,
              new RegExp(/\S+@\S+\.\S+/),
            );

            if (!isValid) {
              targetInput.style.borderBottomColor = "red";
              targetInput.style.color = "red";

              emailError.setProps({
                value: "Email - не валидный",
              });
            }
          },
        },
      ],
    }),
  });
}
