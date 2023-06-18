<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav>
  <router-view/>
</template>

<script>
const {io} = require("socket.io-client")
const socket = io("http://localhost:3001")

socket.on("connected", (arg) => {
  console.log(arg);
});

export default {
  name: 'App'
}
</script>

<style>
@font-face {
  font-family: "Comic-Sans-MS";
  src: url(./fonts/Comic-Sans-MS.woff);
}

#app {
  font-family: Comic-Sans-MS;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
