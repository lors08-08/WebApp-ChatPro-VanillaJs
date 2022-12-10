import IconComponent from "@components/Icon/Icon";
import AvatarComponent from "@components/Avatar/Avatar";
import AvatarProfile from "@pages/Settings/modules/Avatar/Avatar";
import ArrowLeft from "@img/arrow-left.svg";
import AvatarDefault from "@img/avatar-default.svg";
import LinkComponent from "@components/Link/Link";
import { Pages } from "@common/enums/Pages";
import FormProfileComponent from "@pages/Settings/modules/FormProfile";
import LayoutComponent from "@components/Layout/Layout";
import Profile from "@pages/Settings/modules/Profile/Profile";
import LabelComponent from "@components/Label/Label";
import { withAuth } from "@utils/hocs/withAuth";

const ActionStatus = new LabelComponent({
  id: "action-status",
  className: "styles.md",
});

const Avatar = new AvatarComponent({
  size: "styles.large",
  image: new IconComponent({
    icon: AvatarDefault,
    size: "styles.large",
  }),
});

const profile = new Profile({
  icon: new LinkComponent({
    id: "profile-link",
    to: Pages.MESSENGER,
    value: new IconComponent({
      icon: ArrowLeft,
      color: "styles.white",
    }),
  }),
  userAvatar: new AvatarProfile({
    avatar: Avatar,
    name: "Лорс",
  }),
  actionStatus: ActionStatus,
});

const protectedPage = withAuth(
  new LayoutComponent({
    className: "styles.block",
    content: new FormProfileComponent({
      id: "profile-form",
      content: profile,
      profile: profile,
      actionStatus: ActionStatus,
    }),
  }).getContent(),
);

export default protectedPage;
