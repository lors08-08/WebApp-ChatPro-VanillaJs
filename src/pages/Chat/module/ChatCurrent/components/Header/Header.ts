import { Block } from "../../../../../../utils/classes/Block/Block";
import Templator from "../../../../../../utils/classes/Templator";
import Header from "./Header.tmp";
import * as styles from "./Header.module.scss";
import { TElement } from "../../../../../../utils/classes/Block/types/types";
import ModalComponent from "../modal/Modal";
import IconComponent from "../../../../../../components/Icon/Icon";
import OptionsIcon from "../../../../../../../static/img/options";
import EditUser from "../EditUser/EditUser";
import AddIcon from "../../../../../../../static/img/add";
import DeleteIcon from "../../../../../../../static/img/delete";

interface IHeader {
  profile: TElement;
  optionsIcon?: TElement;
  modal?: TElement;
}

const template = new Templator(Header);

class HeaderComponent extends Block<IHeader> {
  modal = new ModalComponent({
    addUser: new EditUser({
      icon: new IconComponent({
        icon: AddIcon,
      }).getContent(),
      value: "Добавить пользователя",
    }).getContent(),
    deleteUser: new EditUser({
      icon: new IconComponent({
        icon: DeleteIcon,
      }).getContent(),
      value: "Удалить пользователя",
    }).getContent(),
    event: {
      type: "click",
      action: (e: Event) => {
        e.stopPropagation();

        this.closeOptionModal();
      },
    },
  });

  closeOptionModal() {
    this.setProps({
      ...this.props,
      modal: undefined,
    });
  }

  openOptionModal() {
    this.setProps({
      ...this.props,
      modal: this.modal.getContent(),
    });
  }

  init() {
    this.setProps({
      ...this.props,
      optionsIcon: new IconComponent({
        icon: OptionsIcon,
        className: "styles.clickable",
        event: {
          type: "click",
          action: () => {
            this.openOptionModal();
          },
        },
      }).getContent(),
    });
  }

  render() {
    return template.compile({ ...this.props }, styles);
  }
}

export default HeaderComponent;
