const express = require("express");
const app = express();
const path = require("path");

// get the port from env variable
const PORT = process.env.PORT || 5000;

app.use(express.static("dist"));

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});

app.get("/version", (req, res) => {
  res.send("1");
});

app.get("*", (req, res) => {
  const indexPath = path.join(__dirname, "../dist", "index.html");
  console.log(`Serving index.html from ${indexPath}`);
  res.sendFile(indexPath);
});