/* eslint-disable no-console */
const express = require("express");
const path = require("path");
const app = express();

// get the port from env variable
const PORT = process.env.PORT || 5000;

app.use(express.static("dist"));

app.get("/version", (req, res) => {
  res.send("1.04");
});

app.get("/health", (req, res) => {
  // eslint-disable-next-line no-constant-condition
  if (true) throw "error...  ";
  res.send("ok");
});

// This should come last:
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "dist", "index.html"));
});

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
