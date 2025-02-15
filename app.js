const express = require("express");
const app = express();

// get the port from env variable
const PORT = process.env.PORT || 5000;

app.use(express.static("dist"));

app.get("/health", (req, res) => {
  res.status(200).send();
});

app.get("/version", (req, res) => {
  res.status(200).json({ version: "4" });
});

app.listen(PORT, () => {
  /* eslint-disable no-console */
  console.log(`server started on port ${PORT}`);
});
