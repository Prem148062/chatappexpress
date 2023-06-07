const express = require("express");
const path = require("path");
const { EventEmitter } = require("events");

const app = express();
const chatEmiter = new EventEmitter();
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

app.get("/chat", (req, res) => {
  res.writeHead(200, {
    "Content-type": "text/event-stream",
    Connection: "keep-alive",
    "Cache-Control": "no-cache",
  });
  const onNewMessageHandler = (message) => {
    res.write(`data:${JSON.stringify({ message })}\n\n`);
  };
  chatEmiter.on("newMessage", onNewMessageHandler);
  req.on("close", () => chatEmiter.off("newMessage", onNewMessageHandler));
  // res.json({ chatMessage });
});

app.post("/chat", (req, res) => {
  chatMessage.push(req.body.message);
  chatEmiter.emit("newMessage", req.body.message);
  res.end();
});

app.listen(port, () => {
  console.log(`Express Starting at http://localhost:${port}`);
});
