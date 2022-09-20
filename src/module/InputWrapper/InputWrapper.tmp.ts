export default `
    <div class="flexCenter {{styles.input-wrapper}} 
        w100 {{&if wrapperClass !== undefined }} {{wrapperClass}} {{&end}} {{&if inputVariant !== undefined }} {{inputVariant}} {{&end}}">
        {{&if label !== undefined }} {{label}} {{&end}} 
        {{&if iconLeft !== undefined }}{{iconLeft}}{{&end}} 
        {{input}} 
        {{&if error !== undefined }} {{error}} {{&end}}
    </div>
`;
