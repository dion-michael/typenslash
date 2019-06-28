<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
    mounted (){ 
      this.$store.dispatch('fetchRooms')
    }
}
</script>


<style>
html {
  padding: 0;
  margin: 0;
}

html, body {margin: 0; height: 100%; overflow: hidden}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
