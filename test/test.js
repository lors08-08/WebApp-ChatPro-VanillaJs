require.extensions[".scss"] = function () {
  return null;
};

const jsdom = require("jsdom");

const { JSDOM } = jsdom;

const { window } = new JSDOM('<div id="root"></div>', {
  url: "http://localhost",
});
const { document } = window;

global.window = window;
global.document = document;
