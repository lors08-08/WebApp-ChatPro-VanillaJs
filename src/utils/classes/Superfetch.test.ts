import sinon, {
  SinonFakeXMLHttpRequest,
  SinonFakeXMLHttpRequestStatic,
} from "sinon";
import { expect } from "chai";

import { Superfetch } from "@utils/classes/Superfetch";

describe("HTTPTransport", () => {
  let xhr: SinonFakeXMLHttpRequestStatic;
  let instance: Superfetch;
  const requests: SinonFakeXMLHttpRequest[] = [];

  beforeEach(() => {
    xhr = sinon.useFakeXMLHttpRequest();

    // @ts-ignore
    global.XMLHttpRequest = xhr;

    xhr.onCreate = (request: SinonFakeXMLHttpRequest) => {
      requests.push(request);
    };

    instance = new Superfetch("/auth");
  });

  afterEach(() => {
    requests.length = 0;
  });

  it(".get() should send GET request", () => {
    instance.get("/user");

    const [request] = requests;

    expect(request.method).to.eq("GET");
  });
});
