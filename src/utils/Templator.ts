import { nanoid } from "nanoid";

import getObjectData from "./getObjectData";
import { IContextData } from "../common/types/types";
import { IEvent } from "../components/Button/Button";

interface ITemplator {
  compile<T extends {}>(context: T, styles: Record<string, string>): string;
}

class Templator implements ITemplator {
  protected readonly _template: string;

  constructor(template: string) {
    this._template = template;
  }

  compile<T extends {}>(context: T, styles: Record<string, string>) {
    const { children, props } = this._getChildrenAndProps(context);

    const contextAndStubs = { ...props };

    const withIds = this._addIds(children);

    Object.values(withIds).forEach((data) => {
      contextAndStubs[data.name] = `<div data-id="${data.id}"></div>`;
    });

    const compiledHtml = this._compileTemplate<T>(contextAndStubs, styles);

    const temp = document.createDocumentFragment();

    temp.append(compiledHtml);

    Object.values(withIds).forEach((data) => {
      const stub = temp.querySelector(`[data-id="${data.id}"]`);

      if (!stub) {
        return;
      }

      if (Array.isArray(data.component)) {
        const fragment = document.createDocumentFragment();

        data.component.forEach((element) => {
          fragment.append(element);
        });

        stub.replaceWith(fragment);
      } else {
        stub.replaceWith(data.component);
      }
    });

    return temp;
  }

  private _addIds(elements: Record<string, any>) {
    return Object.entries(elements).map(([key, value]) => {
      return {
        id: nanoid(6),
        name: key,
        component: value,
      };
    });
  }

  private _getChildrenAndProps(childrenAndProps: Record<string, any>): {
    children: Record<string, any>;
    props: Record<string, string>;
  } {
    const children = {};
    const props = {};

    Object.entries(childrenAndProps).forEach(([key, value]) => {
      if (typeof value === "object" && !Array.isArray(value)) {
        children[key] = value;
      } else if (Array.isArray(value)) {
        children[key] = value;
      } else {
        props[key] = value;
      }
    });

    return {
      children,
      props,
    };
  }

  private _getAllVariables<T>(data: T, condition: string) {
    return !data || !Object.keys(data).length
      ? `const ${condition} = ${undefined}`
      : Object.entries(data).reduce((vars, [key, value]) => {
          if (vars.includes(condition)) {
            return vars;
          }
          if (!(condition in data)) {
            return vars + `\nconst ${condition} = ${undefined}`;
          }
          if (Array.isArray(value)) {
            return vars + `\nconst ${key} = ${JSON.stringify(value.join(" "))}`;
          }

          return typeof value === "string"
            ? vars + `\nconst ${key} = ${JSON.stringify(value)}`
            : vars + `\nconst ${key} = ${value}`;
        }, "");
  }

  private _funcConstructor<T>(data: T, condition: string) {
    return new Function(`
              ${this._getAllVariables(data, condition.split(" ")[0])}
              
              return ${condition}
            `);
  }

  private _htmlToElement(html): DocumentFragment {
    const template = document.createElement("template");

    html = html.trim();

    template.innerHTML = html;

    return template.content;
  }

  private _compileTemplate<T>(context: T, styles: Record<string, string>) {
    const TEMPLATE_REGEXP = /{{(.*?)}}/i;
    const TEMPLATE_CONDITIONAL_REGEXP = /{{&if (.*?)}}(.*?){{&end}}/i;

    let template = this._template;

    let key: RegExpExecArray | null = null;
    let condition: RegExpExecArray | null = null;

    while ((condition = TEMPLATE_CONDITIONAL_REGEXP.exec(template))) {
      if (condition[1]) {
        const check = this._funcConstructor(context, condition[1]);

        const hasAttribute = check();

        template = hasAttribute
          ? template.replace(new RegExp(condition[0], "gi"), condition[2])
          : template.replace(new RegExp(condition[0], "gi"), "");
      }
    }

    while ((key = TEMPLATE_REGEXP.exec(template))) {
      if (key && key[1]) {
        let tmpValue = key[1].trim();

        const data = getObjectData<T>({ data: context, path: tmpValue });

        const isCssModule =
          key[0].includes("styles.") || data?.includes("styles.");

        if (isCssModule && styles && !Array.isArray(data)) {
          const prop = data?.includes("styles.") ? data : key[0];

          const style = prop.replace(/styles.|{|}/g, "").trim();

          const allStyles = style.split(" ").reduce((acc, cur, i, items) => {
            const currentStyle = styles[cur] || cur;

            acc += currentStyle;

            if (i !== items.length - 1) {
              acc += " ";
            }

            return acc;
          }, "");

          template = template.replace(new RegExp(key[0], "gi"), allStyles);
        } else {
          const typedData = Array.isArray(data) ? data.join(" ") : data || "";

          template = template.replace(new RegExp(key[0], "gi"), typedData);
        }
      }
    }
    const htmlElements = this._htmlToElement(template) as HTMLElement;

    // console.log(htmlElements.querySelector("#my"));

    return htmlElements;
  }
}

export default Templator;
