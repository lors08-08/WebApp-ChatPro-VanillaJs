import { Block } from "../../../utils/classes/Block/Block";
import InputComponent from "../../../components/Input/Input";
import InputWrapper from "../../../module/InputWrapper/InputWrapper";
import LabelComponent from "../../../components/Label/Label";

interface INameComponentProps {
  restoreInput(e: Event, error: Block): void;
  validate(value: string, regExp: RegExp): boolean;
  nameError: Block;
}

const ctxLabelName = {
  id: "name",
  value: "Имя",
};
const ctxName = {
  id: "name",
  name: "name",
  type: "text",
  placeholder: "Имя",
};

export default function NameComponent({
  restoreInput,
  validate,
  nameError,
}: INameComponentProps) {
  return new InputWrapper({
    label: new LabelComponent(ctxLabelName),
    wrapperClass: "flexColumn",
    error: nameError,
    input: new InputComponent({
      ...ctxName,
      event: [
        {
          type: "focus",
          action: (e: Event) => {
            restoreInput(e, nameError);
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

              nameError.setProps({
                value: `Имя - должно соответствовать следющим требования:
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
