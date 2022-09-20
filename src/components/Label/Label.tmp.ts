export default `
    <label for="{{ id }}" class="{{ styles.label}} w100 small{{&if className !== undefined}} {{ className }} {{&end}}">
        {{&if value !== undefined}} {{value}} {{&end}}
    </label>
`;
