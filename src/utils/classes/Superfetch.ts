enum Methods {
  GET = "GET",
  PUT = "PUT",
  POST = "POST",
  DELETE = "DELETE",
}
interface IOptions {
  data?: unknown;
  timeout?: number;
  headers?: Record<string, string>;
  method: Methods;
}

type HTTPMethod = (
  url: string,
  options?: Omit<IOptions, "method">,
) => Promise<unknown>;

function queryStringify(data: unknown) {
  if (!data) {
    return;
  }

  return Object.entries(data).reduce((a, [k, v], idx) => {
    return a + `${idx ? "&" : ""}${k}=${v}`;
  }, "?");
}

export class Superfetch {
  static API_URL = "https://ya-praktikum.tech/api/v2";
  protected endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = `${Superfetch.API_URL}${endpoint}`;
  }

  get: HTTPMethod = (url: string = "/", options = {}) => {
    if (options?.data) {
      options.data = queryStringify(options.data);
    }

    return this.request(
      this.endpoint + url,
      { ...options, method: Methods.GET },
      options?.timeout,
    );
  };
  post: HTTPMethod = (url: string = "/", options = {}) => {
    return this.request(
      this.endpoint + url,
      { ...options, method: Methods.POST },
      options?.timeout,
    );
  };
  put: HTTPMethod = (url: string = "/", options = {}) => {
    return this.request(
      this.endpoint + url,
      { ...options, method: Methods.PUT },
      options?.timeout,
    );
  };
  delete: HTTPMethod = (url: string = "/", options = {}) => {
    return this.request(
      this.endpoint + url,
      { ...options, method: Methods.DELETE },
      options.timeout,
    );
  };

  request = (url: string, options: IOptions, timeout = 5000) => {
    const { headers, data, method } = options;

    return new Promise((res, rej) => {
      const xhr = new XMLHttpRequest();

      if (method === Methods.GET && data) {
        xhr.open(method, `${url}${data}`);
      } else {
        xhr.open(method, url);
      }
      xhr.timeout = timeout;

      xhr.withCredentials = true;

      if (headers) {
        Object.entries(headers).forEach(([key, value]) => {
          xhr.setRequestHeader(key, value);
        });
      }

      xhr.addEventListener("load", function () {
        res(xhr);
      });

      xhr.onreadystatechange = () => {
        if (
          xhr.readyState === XMLHttpRequest.DONE &&
          xhr.readyState === XMLHttpRequest.DONE
        ) {
          if (xhr.status < 300 && xhr.status >= 200) {
            res(xhr.response);
          } else {
            rej(JSON.parse(xhr.response));
          }
        }
      };

      xhr.onerror = rej;
      xhr.addEventListener("abort", rej);
      xhr.ontimeout = rej;

      if (method === Methods.GET || !data) {
        xhr.send();
      } else {
        if (data instanceof FormData) {
          xhr.send(data);
        } else {
          xhr.setRequestHeader("Content-Type", "application/json");

          xhr.send(JSON.stringify(data));
        }
      }
    });
  };
}
