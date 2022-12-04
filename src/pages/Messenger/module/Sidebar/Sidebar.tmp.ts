export default `
  <div class="flexColumn h100">
      {{ header }}
      {{ addChatBtn }}
      <div class="{{styles.chat-list}} flexColumn">
        {{ chatContacts}}
      </div>
      {{&if modal !== undefined}} {{ modal }} {{&end}}
  </div>
`;
