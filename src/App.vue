<template>
  <div id="app">
    <router-view/>
    <div v-if="$store.state.visible_blackout" class="blackout"></div>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style>
body {
  padding: 0px;
  margin: 0px;
}

#app {
  position: absolute;
  right: 0px;
  top: 0px;
  width: auto;
  min-width: 100%;
  min-height: 100%;
  background-color: #1b1d1f;
}

.display-none {
  display: none;
}

.blackout {
  position: fixed;
  z-index: 100;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background: #000;
  opacity: 0.9;
}

@keyframes emergence-opacity-essence {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes hidden-opacity-essence {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

@font-face {
  font-family: Romulc;
  src: url(assets/fonts/Romulc.otf);
}

@font-face {
  font-family: Pfagorasanspro-italic;
  src: url(assets/fonts/Pfagorasanspro-italic.ttf);
}

@font-face {
  font-family: Pfagorasanspro-bold;
  src: url(assets/fonts/Pfagorasanspro-bold.ttf);
}
</style>
