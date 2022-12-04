import InputComponent from "../../../components/Input/Input";
import { Block } from "../../../utils/classes/Block/Block";
import InputWrapperComponent from "../../../module/InputWrapper/InputWrapper";
import LabelComponent from "../../../components/Label/Label";

interface ILoginComponentProps {
  restoreInput(e: Event, error: Block): void;
  validate(value: string, regExp: RegExp): boolean;
  loginError: Block;
}

const ctxLabelLogin = {
  id: "login",
  value: "Логин",
};
const ctxLogin = {
  id: "login",
  name: "login",
  type: "text",
  placeholder: "Логин",
};

export default function LoginComponent({
  restoreInput,
  validate,
  loginError,
}: ILoginComponentProps) {
  return new InputWrapperComponent({
    label: new LabelComponent(ctxLabelLogin),
    wrapperClass: "flexColumn",
    error: loginError,
    input: new InputComponent({
      ...ctxLogin,
      event: [
        {
          type: "focus",
          action: (e: Event) => {
            restoreInput(e, loginError);
          },
        },
        {
          type: "focusout",
          action: (e: Event) => {
            const targetInput = e.target as HTMLInputElement;
            const valueLength = targetInput.value.length;

            const isValid =
              validate(targetInput.value, new RegExp(/^(?=.*[a-z])[\w-]*$/i)) &&
              valueLength >= 3 &&
              valueLength <= 20;

            if (!isValid) {
              targetInput.style.borderBottomColor = "red";
              targetInput.style.color = "red";

              loginError.setProps({
                value: `Логин - должен соответствовать следющим требования:
                 <p>- от 3 до 20 символов,</p>
                 <p>- без пробелов</p>
                 <p>- может содержать цифры, но не состоять из них</p>
                 <p>- нет спецсимволов (допустимы дефис и нижнее подчёркивание)</p>
              `,
              });
            }
          },
        },
      ],
    }),
  });
}
