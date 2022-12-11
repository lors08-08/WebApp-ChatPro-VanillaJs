import Block from "@utils/classes/Block/Block";
import InputComponent from "@components/Input/Input";
import InputWrapper from "@module/InputWrapper/InputWrapper";
import LabelComponent from "@components/Label/Label";

interface IPhoneComponentProps {
  restoreInput(e: Event, error: Block): void;
  validate(value: string, regExp: RegExp): boolean;
  phoneError: Block;
}

const ctxLabelPhone = {
  id: "phone",
  value: "Телефон",
};
const ctxPhone = {
  id: "phone",
  name: "phone",
  type: "number",
  placeholder: "Телефон",
};

export default function PhoneComponent({
  restoreInput,
  validate,
  phoneError,
}: IPhoneComponentProps) {
  return new InputWrapper({
    label: new LabelComponent(ctxLabelPhone),
    wrapperClass: "flexColumn",
    error: phoneError,
    input: new InputComponent({
      ...ctxPhone,
      event: [
        {
          type: "focus",
          action: (e: Event) => {
            restoreInput(e, phoneError);
          },
        },
        {
          type: "focusout",
          action: (e: Event) => {
            const targetInput = e.target as HTMLInputElement;
            const valueLength = targetInput.value.length;

            const isValid =
              validate(
                targetInput.value,
                new RegExp(/^[\s()+-]*(\d[\s()+-]*){10,15}$/),
              ) &&
              valueLength >= 3 &&
              valueLength <= 20;

            if (!isValid) {
              targetInput.style.borderBottomColor = "red";
              targetInput.style.color = "red";

              phoneError.setProps({
                value: "Номер - не валидный",
              });
            }
          },
        },
      ],
    }),
  });
}
