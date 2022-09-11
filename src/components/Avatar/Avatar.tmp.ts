//language=hbs
export default `
    <div class="{{ styles.wrapper }} flexCenter {{&if size !== undefined}} {{ size }} {{&end}} {{&if image !== undefined}} {{ image }} {{&end}}">
        {{&if icon !== undefined}} {{ icon }} {{&end}}
    </div>
`;
