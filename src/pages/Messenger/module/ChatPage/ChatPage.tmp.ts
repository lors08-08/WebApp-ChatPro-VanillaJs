export default `
  <div class="h100 w100 {{styles.wrapper}}">
      {{&if header !== undefined}} {{ header }} {{&end}}
        {{content}}
      {{&if bottom !== undefined}} {{ bottom }} {{&end}}
  </div>
`;
