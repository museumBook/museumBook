<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
body{
  padding: 0px;
  margin: 0px;
}

#app {
  position: absolute;
  right: 0px;
  top: 0px;
  width: auto;
  min-width:  100%;
  min-height: 100%;
  background-color: #1B1D1F;
}

@font-face {
  font-family: Romulc;
  src: url(assets/fonts/Romulc.otf);

}
</style>
