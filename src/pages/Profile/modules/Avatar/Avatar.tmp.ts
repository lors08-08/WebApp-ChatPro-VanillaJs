export default `
  <div class="{{ styles.wrapper }} flexColumn flexCenter">
      <div class="{{ styles.avatar-wrapper }}">
        {{ avatarImg }}
      </div>
      <div class="regular">
        {{ name }}  
      </div>
      {{&if modal !== undefined}} {{ modal }} {{&end}}
  </div>
`;
