require.extensions[".scss"] = function () {
  return null;
};

const jsdom = require("jsdom");

const { JSDOM } = jsdom;

const { window } = new JSDOM('<main id="root" class="root"></main>', {
  url: "http://localhost:1234",
});
const { document } = window;
global.window = window;
XMLHttpRequest = window.XMLHttpRequest;
global.document = document;
