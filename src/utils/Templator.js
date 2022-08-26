import getObj from "./getObjectData";

export const Templator = (function () {
  class Templator {
    constructor(template) {
      this._template = template
    }

    compile(ctx, styles, defaultValue) {
      return this._compileTemplate(ctx, styles, defaultValue)
    }

    _getAllVariables(data, cond) {

      if(!data || !Object.keys(data).length) {
        return `const ${cond} = ${undefined}`
      } else {
        return Object.entries(data).reduce((vars, [key, value]) => {

          if(vars.indexOf(cond) !== -1) {
            return vars
          }
          if(!(cond in data)) {

            return vars + `\nconst ${cond} = ${undefined}`
          }
          if(Array.isArray(value)) {
            return vars + `\nconst ${key} = ${JSON.stringify(value.join(' '))}`
          }
          if(typeof value === "string") {
            return vars + `\nconst ${key} = ${JSON.stringify(value)}`;
          } else {
            return vars + `\nconst ${key} = ${value}`;
          }
        },``)
      }
    }

    _funcConstructor(data,arg) {
      return new Function(`
              ${this._getAllVariables(data, arg.split(' ')[0])}
              
              return ${arg}
            `)
    }

    _compileTemplate(ctx, styles, defaultValue) {
      const TEMPLATE_REGEXP = /{{(.*?)}}/i;
      const TEMPLATE_CONDITIONAL_REGEXP = /{{&if (.*?)}}(.*?){{&end}}/i;

      let tmpl = this._template;

      let key = null;
      let condition = null


      while ((condition = TEMPLATE_CONDITIONAL_REGEXP.exec(tmpl))) {
        if(condition[1]) {
          const check = this._funcConstructor(ctx, condition[1])

          const hasAttribute = check()

          if(hasAttribute) {
            tmpl = tmpl.replace(new RegExp(condition[0], "gi"), condition[2]);
          } else {
            tmpl = tmpl.replace(new RegExp(condition[0], "gi"), '');
          }
        }
      }

      while ((key = TEMPLATE_REGEXP.exec(tmpl))) {
        if(key && key[1]) {
          let tmpValue = key[1].trim()
          const data = getObj(ctx, tmpValue, defaultValue)

          const isCssModule = key[0].includes("styles.") || data?.includes("styles.")

          if(isCssModule && styles) {
            const prop = data?.includes("styles.") ? data : key[0]

            const style = prop.replace(/styles.|{|}/g,"").trim()

            const allStyles = style.split(' ').reduce((acc, cur,i, items) => {
              const currentStyle = styles[cur] || cur
              acc += currentStyle

              if(i !== items.length-1) {
                acc += " "
              }

              return acc
            }, "")

            tmpl = tmpl.replace(new RegExp(key[0], "gi"), allStyles);
          } else {
            const typedData = Array.isArray(data) ? data.join(' ') : data

            tmpl = tmpl.replace(new RegExp(key[0], "gi"), typedData);
          }
        }
      }


      return tmpl
    }
  }

  return Templator
})()

export default Templator
