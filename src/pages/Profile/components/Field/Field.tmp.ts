export default `
  <div class="{{ styles.wrapper }} medium w100 flexCenter">
      {{ key }} {{&if value !== undefined}} <div class="{{ styles.key }}">{{ value }}</div> {{&end}}
  </div>
`;
