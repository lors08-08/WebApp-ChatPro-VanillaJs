//language=hbs
export default `
    <button id="my" class="{{ styles.wrapper }} {{ styles.button }} {{&if className !== undefined}} {{ className }} {{&end}} 
        {{&if color !== undefined}} {{ color }} {{&end}}">
        {{ value }}
        {{&if iconRight !== undefined}} {{ iconRight }} {{&end}}
        {{&if event !== undefined}} {{ event }} {{&end}}
    </button>`;
