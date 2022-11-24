export default `
    <label for="{{ id }}" class="{{ styles.label}} {{&if size !== undefined}} {{ size }} {{&end}} w100 small{{&if className !== undefined}} {{ className }} {{&end}}">
        {{&if value !== undefined}} {{value}} {{&end}}
    </label>
`;
