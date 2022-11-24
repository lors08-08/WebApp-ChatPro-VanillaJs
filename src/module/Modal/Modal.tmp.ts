export default `
  <div id="{{&if id !== undefined}}{{id}}{{&end}}" class="{{styles.background}}">
    <div class="{{&if background !== undefined}}{{background}}{{&end}}"></div>
    <div id="modal-avatar" class="{{styles.wrapper}}">
        <div class="{{styles.title}} {{&if className !== undefined}} {{ className }} {{&end}}">
          {{title}}
        </div>
        <div class="{{styles.input-wrapper}}">
          {{ input }}
        </div>
        <div class="{{styles.submit-btn}}">
          {{ actionBtn }}
          {{&if closeBtn !== undefined}} {{ closeBtn }} {{&end}}
        </div>
        <div class="{{styles.error}}">
          {{&if error !== undefined}} {{ error }} {{&end}}
        </div>
     </div>
  </div>
`;
