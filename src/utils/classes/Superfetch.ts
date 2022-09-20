enum METHODS {
  GET = "GET",
  PUT = "PUT",
  POST = "POST",
  DELETE = "DELETE",
}
interface IOptions {
  data?: Record<string, string> | string;
  timeout?: number;
  headers?: Record<string, string>;
  method: METHODS;
}

function queryStringify(data: Record<string, string> | string | undefined) {
  if (!data) {
    return;
  }

  return Object.entries(data).reduce((a, [k, v], idx) => {
    return a + `${idx ? "&" : ""}${k}=${v}`;
  }, "?");
}

export class Superfetch {
  get = (url: string, options: Omit<IOptions, "method">) => {
    options.data = queryStringify(options.data);

    return this.request(
      url,
      { ...options, method: METHODS.GET },
      options.timeout,
    );
  };
  post = (url: string, options: IOptions) => {
    return this.request(
      url,
      { ...options, method: METHODS.POST },
      options.timeout,
    );
  };
  put = (url: string, options: IOptions) => {
    return this.request(
      url,
      { ...options, method: METHODS.PUT },
      options.timeout,
    );
  };
  delete = (url: string, options: IOptions) => {
    return this.request(
      url,
      { ...options, method: METHODS.DELETE },
      options.timeout,
    );
  };

  request = (url: string, options: IOptions, timeout = 5000) => {
    const { headers, data, method } = options;

    return new Promise((res, rej) => {
      const xhr = new XMLHttpRequest();

      if (method === METHODS.GET && data) {
        xhr.open(method, `${url}${data}`);
      } else {
        xhr.open(method, url);
      }
      xhr.timeout = timeout;

      xhr.setRequestHeader("Content-Type", "text/plain");

      if (headers) {
        Object.entries(headers).forEach(([key, value]) => {
          xhr.setRequestHeader(key, value);
        });
      }

      xhr.addEventListener("load", function () {
        res(xhr);
      });

      xhr.onerror = rej;
      xhr.addEventListener("abort", rej);
      xhr.ontimeout = rej;

      if (method === METHODS.GET || !data) {
        xhr.send();
      } else {
        xhr.send(data as any);
      }

      if (xhr.status === 200) {
        // eslint-disable-next-line no-console
        console.log(xhr.responseText);
      } else {
        // eslint-disable-next-line no-console
        console.log(`Ответ от сервера: ${xhr.status} | ${xhr.statusText}`);
      }
    });
  };
}
