<script setup>
// import HelloWorld from './components/HelloWorld.vue'
// import TheWelcome from './components/TheWelcome.vue'
import Weather from './components/practices/basic/Weather.vue'

</script>

<template>
  <div style = "padding: 20px">
    <Weather />
  </div>
</template>

<style setup>
* {
  box-sizing: border-box;
}
 
html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  min-height: 100vh;
}
 
#app {
  width: 100%;
  min-height: 100vh;
  max-width: none;
  margin: 0;
  padding: 0;
  text-align: left;
}
</style>

