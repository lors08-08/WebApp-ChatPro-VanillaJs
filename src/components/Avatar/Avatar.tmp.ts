export default `
    <div class="{{ styles.wrapper }} flexCenter {{&if size !== undefined}} {{ size }} {{&end}}">
        {{&if image !== undefined}} {{ image }} {{&end}}
    </div>
`;
