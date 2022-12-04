import "./Settings.scss";

export default `
  <div class="profile-container">
      <div class="back-icon-wrapper flexColumn flexCenter">
          <div class="back-icon">
              {{ icon }}
          </div>
      </div>
      <div class="profile-main-content flexColumn">
          <div class="profile-user-info flexColumn">
              <div class="user-avatar">
                  {{ userAvatar }}
              </div>
              <div class="user-info">
                  {{ userInfo }}
              </div>
          </div>
          <div class="{{ styles.action-status }}">{{&if actionStatus !== undefined}} {{ actionStatus }} {{&end}}</div>
          <div class="profile-actions flexColumn">
              {{ buttons }}
          </div>
      </div>
  </div>
`;
