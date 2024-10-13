const express = require("express");
const app = express();

app.use(express.static("dist"));
app.get("/version", (req, res) => {
  res.send("1"); // change this string to ensure a new version deployed
});
app.get("/health", (req, res) => {
  // eslint-disable-next-line no-constant-condition

  res.send("ok");
});

module.exports = app;
