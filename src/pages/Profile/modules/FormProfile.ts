import Form, { IForm } from "../../../module/Form/Form";
import Profile from "./Profile/Profile";
import LabelComponent from "../../../components/Label/Label";
import UserController from "../../../controllers/UserController";
import Store from "../../../utils/classes/Store";
import isEqual from "../../../utils/funcs/isEqual";

interface IFormProfile extends IForm {
  profile: Profile;
  actionStatus: LabelComponent;
}

interface IFormElements extends HTMLCollection {
  email: HTMLInputElement;
  login: HTMLInputElement;
  first_name: HTMLInputElement;
  second_name: HTMLInputElement;
  display_name: HTMLInputElement;
  phone: HTMLInputElement;
  oldPassword: HTMLInputElement;
  newPassword: HTMLInputElement;
  newPasswordAgain: HTMLInputElement;
}

class FormProfile extends Form<IFormProfile> {
  constructor(props: IFormProfile) {
    super(props);
  }

  addEvents(form: HTMLFormElement) {
    const formElements = form.elements as IFormElements;

    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const user = Store.getState().user;

      if (formElements.login) {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        const { email, login, first_name, second_name, display_name, phone } =
          formElements;

        try {
          const profileData = {
            id: user?.id,
            avatar: user?.avatar,
            email: email.value,
            login: login.value,
            first_name: first_name.value,
            second_name: second_name.value,
            display_name: display_name.value,
            phone: phone.value,
          };

          if (!isEqual(profileData, user)) {
            await UserController.update_profile(profileData);

            this.props.profile.disableEditMode();

            this.props.actionStatus.setProps({
              value: "Successfully updated",
              type: "success",
            });

            console.log({
              email: email.value,
              login: login.value,
              first_name: first_name.value,
              second_name: second_name.value,
              display_name: display_name.value,
              phone: phone.value,
            });
          } else {
            this.props.actionStatus.setProps({
              value: "Nothing has changed",
              type: "error",
            });
          }
        } catch (error) {
          this.props.actionStatus.setProps({ value: error, type: "error" });
        }
      } else {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        const { oldPassword, newPassword } = formElements;

        console.log({
          oldPassword,
          newPassword,
        });
        try {
          await UserController.update_password({
            oldPassword: oldPassword.value,
            newPassword: newPassword.value,
          });

          this.props.actionStatus.setProps({
            value: "Successfully updated",
            type: "success",
          });
        } catch (error) {
          this.props.actionStatus.setProps({ value: error, type: "error" });
        }
      }
    });
  }
}

export default FormProfile;
