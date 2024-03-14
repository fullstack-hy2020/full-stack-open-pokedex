/* eslint-disable no-undef */
const express = require("express");
const app = express();

// get the port from env variable
const PORT = process.env.PORT || 5001;

app.get("/version", (req, res) => {
  res.send("1");
});

app.get("/health", (req, res) => {
  console.log("terveytta kaikille");
  res.send("ok");
});

app.use(express.static("dist"));

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
