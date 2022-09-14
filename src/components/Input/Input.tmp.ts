//language=hbs
export default `
  <div class="flexCenter {{ styles.input-wrapper }} 
  w100{{&if wrapperClass !== undefined }} {{ wrapperClass }} {{&end}} {{&if inputVariant !== undefined }} {{ inputVariant }} {{&end}}">
      {{&if label !== undefined }} {{ label }} {{&end}}
      {{&if iconLeft !== undefined }} {{ iconLeft }} {{&end}}
      <Input
          {{&if id !== undefined }} id="{{ id }}" {{&end}}
          {{&if name !== undefined }} name="{{ name }}" {{&end}}
          {{&if type !== undefined }} type="{{ type }}" {{&end}}
          {{&if placeholder !== undefined }} placeholder="{{ placeholder }}"{{&end}}
          class="{{ styles.input }} {{&if className !== undefined }} {{ className }} {{&end}}" 
      />
      {{&if error !== undefined }} {{ error }} {{&end}}
  </div>
`;
