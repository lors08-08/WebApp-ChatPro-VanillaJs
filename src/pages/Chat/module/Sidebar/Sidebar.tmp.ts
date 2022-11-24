export default `
  <div class="flexColumn">
      {{ header }}
      {{ addChatBtn }}
      {{ chatContacts}}
      {{&if modal !== undefined}} {{ modal }} {{&end}}
  </div>
`;
