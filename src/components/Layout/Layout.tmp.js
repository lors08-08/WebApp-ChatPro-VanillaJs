//language=hbs
export default `
  <div class="{{ styles.container }} {{&if className !== undefined}} {{ className }} {{&end}}">
      {{ content }}
  </div>
`
