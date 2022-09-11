//language=hbs
export default `
    <label for="{{ id }}" class="{{ styles.label}} w100 small{{&if className !== undefined}} {{ className }} {{&end}}">
        {{ value }}
    </label>
`;
