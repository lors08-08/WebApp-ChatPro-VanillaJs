// // eslint-disable-next-line unicorn/prefer-module
// require.extensions[".scss"] = function () {
//   return null;
// };

import jsdom from "jsdom";

const { JSDOM } = jsdom;

const { window } = new JSDOM('<div id="root"></div>', {
  url: "http://localhost",
});
const { document } = window;

global.window = window;
global.document = document;
