import "./Auth.scss";

//language=hbs
export default `
  <div class="auth-wrapper flexColumn w100">
      <div class="flexColumn flexCenter w100">
          <div class="title large">{{ title }}</div>
          <div class="fields-wrapper flexColumn w100{{&if fieldsClassName !== undefined}} {{ fieldsClassName }} {{&end}}">
              {{ content }}
          </div>  
      </div>
      
      <div class="action-buttons flexColumn flexCenter w100">{{ buttons }}</div>
  </div>
`;
