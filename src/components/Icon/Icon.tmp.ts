export default `
  <div class="{{ styles.small }} flex {{&if size !== undefined }} {{ size }} {{&end}}
      {{&if color !== undefined }} {{ color }} {{&end}} {{&if className !== undefined }} {{ className }} {{&end}}">
    {{ icon }}
  </div>
`;
