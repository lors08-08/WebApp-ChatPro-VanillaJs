import InputComponent from "@components/Input/Input";
import Block from "@utils/classes/Block/Block";
import InputWrapperComponent from "@module/InputWrapper/InputWrapper";
import LabelComponent from "@components/Label/Label";

interface IPasswordComponentProps {
  restoreInput(e: Event, error: Block): void;
  passwordError: Block;
  originPassword: InputComponent<{}>;
}

const ctxLabelPasswordAgain = {
  id: "passwordAgain",
  value: "Пароль (ещё раз)",
};
const ctxPasswordAgain = {
  id: "passwordAgain",
  name: "passwordAgain",
  type: "password",
  placeholder: "Пароль еще раз",
};

export default function PasswordAgainComponent({
  restoreInput,
  passwordError,
  originPassword,
}: IPasswordComponentProps) {
  return new InputWrapperComponent({
    label: new LabelComponent(ctxLabelPasswordAgain),
    wrapperClass: "flexColumn",
    error: passwordError,
    input: new InputComponent({
      ...ctxPasswordAgain,
      event: [
        {
          type: "focus",
          action: (e: Event) => {
            restoreInput(e, passwordError);
          },
        },
        {
          type: "focusout",
          action: (e: Event) => {
            const targetInput = e.target as HTMLInputElement;

            const isValid = targetInput.value === originPassword.getValue();

            if (!isValid) {
              targetInput.style.borderBottomColor = "red";
              targetInput.style.color = "red";

              passwordError.setProps({
                value: "Пароли не совпадают",
              });
            }
          },
        },
      ],
    }),
  });
}
