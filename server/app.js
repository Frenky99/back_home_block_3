const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');

/**
 * Инициализация приложения
 */
const app = express();
/**
 * Инициализация приложения на express из документации
 */
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:8080"
    }
});

/**
 * Маршруты http
 */
app.get('/', async (req, res) => {
    return res.send(123);
});

app.listen(3000, async () => {
    console.log('Server started');
});

/**
 * Запуск socket-server
 */

io.on('connection', (socket) => {
  // здесь выполняется вся основная логика, вся основная работа внутри данного объекта
    console.log(`Подключен клиент`, socket);
});

httpServer.listen(3001);
