var express = require("express");
var app = express();
var http = require("http").createServer(app);
var io = require("socket.io")(http);

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});

// EVENTO DE CONEXÃO, "socket" = cliente
io.on("connection", (socket) => {
  socket.on("disconnect", () => {
    console.log("x desconectou: " + socket.id);
  });

  socket.on("msg", (data) => {
    io.emit("showmsg", data);
    console.log(data);
  });
});

http.listen(3000, () => {
  console.log("app rodando");
});
