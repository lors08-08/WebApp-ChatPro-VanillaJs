//language=hbs
export default `
      <Input 
              id="{{&if id !== undefined }}{{ id }}{{&end}}"
              value="{{&if id !== undefined }}{{ value }}{{&end}}"
              name="{{&if name !== undefined }}{{ name }}{{&end}}"
              type="{{&if type !== undefined }}{{ type }}{{&end}}"
              placeholder="{{&if placeholder !== undefined }}{{ placeholder }}{{&end}}"
          class="{{ styles.input }} {{&if className !== undefined }} {{ className }} {{&end}}" 
      />
`;
