// eslint-disable-next-line no-undef
const express = require("express");
const app = express();

app.use(express.json());

// get the port from env variable
// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 5000;

app.use(express.static("dist"));

app.get("/health", (req, res) => {
  res.send("ok");
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`server started on port ${PORT}`);
});
