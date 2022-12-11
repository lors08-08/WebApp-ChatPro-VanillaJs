export default `
  <div id="{{&if id !== undefined}} {{id}} {{&end}}" class="{{styles.wrapper}} medium">
      {{ key }} {{&if input !== undefined}} <div class="{{styles.key}}">{{ input }}</div> {{&end}}
  </div>
`;
