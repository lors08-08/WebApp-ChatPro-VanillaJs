export default `
  <div class="{{ styles.auth-wrapper }} {{&if wrapperClass !== undefined}} {{ wrapperClass }} {{&end}} flexColumn">
      <div class="flexColumn flexCenter w100">
          <div class="{{ styles.title }} large">{{ title }}</div>
          <div class="{{ styles.fields-wrapper }} flexColumn w100{{&if fieldsClassName !== undefined}} {{ fieldsClassName }} {{&end}}">
              {{ content }}
          </div>  
      </div>
      
      <div class="{{ styles.action-buttons }} flexColumn flexCenter w100">{{ buttons }}</div>
  </div>
`;
