export default `
    <div class="flex {{styles.wrapper}}">
        {{profile}}
        {{optionsIcon}}
        {{&if modal !== undefined}} {{ modal }} {{&end}}
        {{&if editModal !== undefined}} {{ editModal }} {{&end}}
    </div>
`;
