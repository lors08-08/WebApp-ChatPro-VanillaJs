export default `
  <div class="{{styles.wrapper}} {{&if className !== undefined}} {{ className }} {{&end}}">
    {{content}}
    <span class="{{styles.message-info}}">
       {{check}}
       {{time}}
    </span>
  </div>
`;
