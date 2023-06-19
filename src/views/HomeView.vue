<template>
  <div class="home">
    <input class="home_input my-font" type="number" v-model="room_id" />
    <input v-model="message" class="home_input my-font" type="text" />
    <button @click="send" class="btn my-font">Отправить</button>
  </div>
</template>

<script>
const { io } = require("socket.io-client");
const socket = io("http://localhost:3001");

// мы прослушиваем наш message
socket.on("message", (data) => {
  console.log(data);
});

// мы прослушиваем наш else в случае ошибки
socket.on("connect_error", (data) => {
  console.error(data);
});

/**
 * Мы подписались на событие ping заданное в app.js
 */

// socket.on("ping", (data) => {
//  console.log(data);
// });

import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "HomeView",
  components: {
    HelloWorld,
  },
  data() {
    return {
      message: null,
      room_id: 1,
    };
  },
  methods: {
    // отправляем событие, то что пользователь ввел, для дальнейшего отлавливания на сервере
    send() {
      socket.emit("message", {
        message: this.message,
        room_id: this.room_id,
      });
      this.message = "";
    },
  },
};
</script>

<style>
@font-face {
  font-family: "Comic-Sans-MS";
  src: url(../fonts/Comic-Sans-MS.woff);
}

.my-font {
  font-family: Comic-Sans-MS;
}

.home_input {
  border-radius: 10px;
  padding: 5px;
  margin: 5px;
}

.btn {
  border-radius: 10px;
  background-color: darksalmon;
  margin-left: 10px;
  cursor: pointer;
  font-size: 14px;
}
</style>
