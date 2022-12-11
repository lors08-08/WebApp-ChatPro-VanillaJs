export default `
  <div class="{{styles.profile-container}}">
      <div class="{{styles.back-icon-wrapper}} flexColumn flexCenter">
          <div class="{{styles.back-icon}}">
              {{ icon }}
          </div>
      </div>
      <div class="{{styles.profile-main-content}} flexColumn">
          <div class="{{styles.profile-user-info}} flexColumn">
              <div class="{{styles.user-avatar}}">
                  {{ userAvatar }}
              </div>
              <div class="{{styles.user-info}}">
                  {{ userInfo }}
              </div>
          </div>
          <div class="{{ styles.action-status }}">{{&if actionStatus !== undefined}} {{ actionStatus }} {{&end}}</div>
          <div class="{{styles.profile-actions}} flexColumn">
              {{ buttons }}
          </div>
      </div>
  </div>
`;
