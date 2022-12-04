import Form, { IForm } from "../../../module/Form/Form";
import Profile from "./Profile/Profile";
import LabelComponent from "../../../components/Label/Label";
import UserController from "../../../controllers/UserController";
import Store from "../../../utils/classes/Store";
import isEqual from "../../../utils/funcs/isEqual";
import FieldComponent from "../components/Field/Field";

interface IFormProfile extends IForm {
  profile: Profile;
  actionStatus: LabelComponent;
}

class FormProfile extends Form<IFormProfile> {
  constructor(props: IFormProfile) {
    super(props);
  }

  init() {
    this.setProps({
      ...this.props,
      event: {
        type: "submit",
        action: async (e) => {
          e.preventDefault();

          const fieldValues: Record<string, string> = {};

          this.props.profile.props.userInfo?.forEach(
            (field: FieldComponent) => {
              if (field.props.id && field.props.input?.getValue()) {
                fieldValues[field.props.id] = field.props.input?.getValue();
              }
            },
          );

          const user = Store.getState().user;

          if (fieldValues.login) {
            const {
              email,
              login,
              first_name: name,
              second_name: surname,
              display_name: displayName,
              phone,
            } = fieldValues;

            try {
              const profileData = {
                id: user?.id,
                avatar: user?.avatar,
                email: email,
                login: login,
                first_name: name,
                second_name: surname,
                display_name: displayName,
                phone: phone,
              };

              if (!isEqual(profileData, user)) {
                await UserController.updateProfile(profileData);

                this.props.profile.disableEditMode();

                this.props.actionStatus.setProps({
                  value: "Successfully updated",
                  type: "success",
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
            const { oldPassword, newPassword } = fieldValues;

            try {
              await UserController.updatePassword({
                oldPassword: oldPassword,
                newPassword: newPassword,
              });

              this.props.actionStatus.setProps({
                value: "Successfully updated",
                type: "success",
              });
            } catch (error) {
              this.props.actionStatus.setProps({ value: error, type: "error" });
            }
          }
        },
      },
    });
  }
}

export default FormProfile;
