<template>
  <router-view></router-view>
</template>
<script>



export default {
  name: 'App',
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  background-image: linear-gradient(120deg, #f6d365 0%, #fda085 100%);
  color: white;
  font-family: "Poppins", sans-serif;
  min-height: 100vh;
}
</style>
