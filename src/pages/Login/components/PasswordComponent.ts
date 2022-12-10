import InputComponent from "@components/Input/Input";
import Block from "@utils/classes/Block/Block";
import InputWrapperComponent from "@module/InputWrapper/InputWrapper";
import LabelComponent from "@components/Label/Label";

interface ILoginComponentProps {
  restoreInput(e: Event, error: Block): void;
  validate(value: string, regExp: RegExp): boolean;
  passwordError: Block;
}

const ctxLabelPassword = {
  id: "password",
  value: "Пароль",
};
const ctxPassword = {
  id: "password",
  name: "password",
  type: "password",
  placeholder: "Пароль",
};

export default function PasswordComponent({
  restoreInput,
  validate,
  passwordError,
}: ILoginComponentProps) {
  return new InputWrapperComponent({
    label: new LabelComponent(ctxLabelPassword),
    wrapperClass: "flexColumn",
    error: passwordError,
    input: new InputComponent({
      ...ctxPassword,
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
            const valueLength = targetInput.value.length;

            const isValid =
              validate(targetInput.value, new RegExp(/(?=.*\d)[A-Z]/)) &&
              valueLength >= 8 &&
              valueLength <= 40;

            if (!isValid) {
              targetInput.style.borderBottomColor = "red";
              targetInput.style.color = "red";

              passwordError.setProps({
                value: `Пароль - должен соответствовать следющим требования:
                 <p>- от 8 до 40 символов</p>
                 <p>- обязательно хотя бы одна заглавная буква и цифра</p>
                `,
              });
            }
          },
        },
      ],
    }),
  });
}
