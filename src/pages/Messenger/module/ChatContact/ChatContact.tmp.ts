export default `
    <div>
        <div class="{{ styles.border-top }}"></div>
        <div class="{{ styles.wrapper }} w100 flex">
            <div class="{{ styles.chat-content }} flex">
                <div class="{{styles.avatar-wrapper}}">
                  {{ avatar }}
                </div>
                <div class="{{ styles.chat-content }} flexColumn">
                    <div class="{{ styles.name}} medium">{{ name }}</div>
                    <div class="{{ styles.last-message }}">
                      {{ lastMessage }}
                    </div>
                </div>
            </div>
            <div class="{{ styles.message-info }} flexColumn">
                <div class="{{ styles.timestamp }} small">{{ timestamp }}</div>
                {{&if notifier !== undefined}} {{ notifier }} {{&end}}
            </div>
        </div>
    </div>
`;
