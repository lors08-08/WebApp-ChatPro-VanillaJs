import Block from "@utils/classes/Block/Block";
import InputComponent from "@components/Input/Input";
import InputWrapper from "@module/InputWrapper/InputWrapper";
import LabelComponent from "@components/Label/Label";

interface ISurnameComponentProps {
  restoreInput(e: Event, error: Block): void;
  validate(value: string, regExp: RegExp): boolean;
  surnameError: Block;
}

const ctxLabelSurname = {
  id: "surname",
  value: "Фамилия",
};
const ctxSurname = {
  id: "surname",
  name: "surname",
  type: "text",
  placeholder: "Фамилия",
};

export default function SurnameComponent({
  restoreInput,
  validate,
  surnameError,
}: ISurnameComponentProps) {
  return new InputWrapper({
    label: new LabelComponent(ctxLabelSurname),
    wrapperClass: "flexColumn",
    error: surnameError,
    input: new InputComponent({
      ...ctxSurname,
      event: [
        {
          type: "focus",
          action: (e: Event) => {
            restoreInput(e, surnameError);
          },
        },
        {
          type: "focusout",
          action: (e: Event) => {
            const targetInput = e.target as HTMLInputElement;

            const isValid = validate(
              targetInput.value,
              new RegExp(/^(?=.*[A-Za-z])^[A-Z][A-Za-z-]*$/),
            );

            if (!isValid) {
              targetInput.style.borderBottomColor = "red";
              targetInput.style.color = "red";

              surnameError.setProps({
                value: `Фамилия - должна соответствовать следющим требования:
                   <p>- первая буква должна быть заглавной</p>
                   <p>- без пробелов и без цифр</p>
                   <p>- нет спецсимволов (допустим только дефис)</p>
              `,
              });
            }
          },
        },
      ],
    }),
  });
}
