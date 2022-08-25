//language=hbs
export default `
    <button class="{{ styles.wrapper }} {{ styles.button }} {{&if className !== undefined}} {{ className }} {{&end}} 
        {{&if color !== undefined}} {{ color }} {{&end}}">
        {{ value }}
        {{&if iconRight !== undefined}} {{ iconRight }} {{&end}}
    </button>`


