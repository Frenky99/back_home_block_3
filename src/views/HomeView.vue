<template>
  <div class="home">
    <input v-model="message" class="home_input my-font" type="text" />
    <button @click="send" class="btn my-font">Отправить</button>
  </div>
</template>

<script>
const { io } = require("socket.io-client");
const socket = io("http://localhost:3001");

// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "HomeView",
  components: {
    HelloWorld,
  },
  data() {
    return {
      message: null,
    };
  },
  methods: {
    // отправляем событие, то что пользователь ввел, для дальнейшего отлавливания на сервере
    send() {
      socket.emit("message", this.message);
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
}

.btn {
  border-radius: 10px;
  background-color: darksalmon;
  margin-left: 10px;
  cursor: pointer;
  font-size: 14px;
}
</style>
