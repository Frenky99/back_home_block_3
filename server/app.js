const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

/**
 * Инициализация приложения
 */
const app = express();
/**
 * Инициализация приложения сервера socket на express
 */
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:8080",
  },
});

/**
 * Маршруты http
 */
app.get("/", async (req, res) => {
  return res.send(123);
});

app.listen(3000, async () => {
  console.log("Server started");
});

/**
 * Запуск socket-server
 */

io.on("connection", (socket) => {
  // здесь выполняется вся основная логика, вся основная работа внутри данного объекта
  socket.on("message", (data) => {

    // мы подписались на данный канал, чтобы прослушивать его изменения
    socket.join("room:" + data.room_id)
    // мы использовали to для отправки событий в необходимую комнату
    io.to("room:" + data.room_id).emit("message", data.message)
    // покидаем комнату ??????????????
    // socket.leave("room:" + data.room_id)
  });
});

/**
 * Каждые 10 секунд мы будем отправлять событие ping на каждого подключенного клиента и в этом объекте выводить серверное время
 */

// setInterval(() => {
//   io.emit("ping", {
//     ts: new Date(),
//   });
// }, 10000);

httpServer.listen(3001);
