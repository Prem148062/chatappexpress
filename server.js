const express = require("express");
const expressWs = require("express-ws");
const path = require("path");

const app = express();
expressWs(app);
const port = 3000;
const chatMessage = [];

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "./views"));
app.use(express.static(path.join(__dirname, "./public")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/chat", (req, res) => {});

app.post("/chat", (req, res) => {
  chatMessage.push(req.body.message);
  res.end();
});

app.listen(port, () => {
  console.log(`Express Starting at http://localhost:${port}`);
});
