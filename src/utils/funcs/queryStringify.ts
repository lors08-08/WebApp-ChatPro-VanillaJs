type StringIndexed = Record<string, any>;

function queryStringify(data: StringIndexed, queryString = ""): string | never {
  if (typeof data !== "object") {
    throw new TypeError("Data must be object");
  }

  Object.entries(data).forEach(([k, v]) => {
    if (typeof v !== "object") {
      queryString += `&${k}=${v}`;
    } else if (Array.isArray(v)) {
      Object.entries(v).forEach((el) => {
        queryString += `&${k}[${el[0]}]=${el[1]}`;
      });
    } else if (typeof v === "object" && v !== null) {
      queryString += `&${k}`;

      const recurseObj = (obj: object) => {
        Object.entries(obj).forEach(([key, val]) => {
          if (typeof val !== "object" || val === null) {
            queryString += `[${key}]=${val}`;
          } else {
            queryString += `[${key}]`;
            recurseObj(val);
          }
        });
      };

      return recurseObj(v);
    } else {
      queryString += `&${k}=${JSON.stringify(v)}`;
    }
  });

  return queryString.slice(1);
}

export default queryStringify;
