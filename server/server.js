require("dotenv").config();
const express = require("express");
const fallback = require("express-history-api-fallback");

const app = express();
const path = require("path");

const root = path.join(__dirname, "..", "/dist");

const PORT = process.env.PORT || 3000;

app.use(express.static(root));
app.use(fallback("index.html", { root }));

app.listen(PORT, () => {
  console.log(`Web app is running on port: ${PORT}!`);
});
