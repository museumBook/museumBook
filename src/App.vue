<template>
  <div id="app">
    <router-view/>
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
  font-family: Quote;
  src: url(assets/fonts/Quote.ttf);
}

@font-face {
  font-family: authorQuote;
  src: url(assets/fonts/authorQuote.ttf);
}
</style>
