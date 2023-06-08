const express = require("express");
const expressWs = require("express-ws");
const path = require("path");
const app = express();
const wsInstance = expressWs(app);
const port = 3000;
const rooms = {};

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "./views"));
app.use(express.static(path.join(__dirname, "./public")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res) => {
  res.render("index");
});
app.get("/chat/:room", (req, res) => {
  res.render("chat");
});
app.ws("/chat/:room", (ws, req) => {
  //let room = rooms[req.params.room];
  if (!rooms[req.params.room]) {
    rooms[req.params.room] = {};
  }
  const room = rooms[req.params.room];
  if (!room.users) {
    room.users = [];
  }
  if (!room.message) {
    room.message = [];
  }
  room.users.push(ws);
  ws.on("message", function (data) {
    room.message.push(data);
    for (const user of room.users) {
      user.send(data);
    }
  });
  ws.on("close", () => {
    room.users = room.users.filter((user) => {
      return user !== ws;
    });
  });
});

app.listen(port, () => {
  console.log(`Express Starting at http://localhost:${port}`);
});
