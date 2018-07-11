<template>
    <div id="full_screen_menu" v-bind:class="{'active': $store.state.visible_full_screen_menu, 'full_screen_menu': true}">
      <canvas id="full_screen_menu-canvas_video" class="canvas_video"></canvas>
      <div v-on:click="toggle_menu" class="toggle_menu">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div v-bind:class="{'active': $store.state.visible_full_screen_menu, 'full_screen_menu-grid': true}">
          <div class="grid_item">
            <img v-on:click="ch_volume_of_music" src="/static/img/menu/equalizer.gif">
          </div>
          <div class="grid_item" v-on:click="toggle_menu(); $router.push('/')">
            <img class="logo" src="/static/img/menu/marfa_ust_cilma.png">
          </div>
          <div class="grid_item">
            <!-- <img class="close" src="/static//icon/close.svg"> -->
          </div>
          <div class="grid_item" v-on:click="toggle_menu(); $router.push('/ust-cilma')">
            Усть-Цильма<br>
            заповедная  
          </div>
          <div class="grid_item" v-on:click="toggle_menu(); $router.push('/')">
            Главная
          </div>
          <div class="grid_item" v-on:click="toggle_menu(); $router.push('/heritage')">
            Рукописное наследние<br>
            Русского Севера
          </div>
          <div class="grid_item" v-on:click="toggle_menu(); $router.push('/ust-cilma/hall/1')">
            Виртуальная<br>
            экспозиция<br>
            "Усть-Цильма"
          </div>
          <div class="grid_item">
            <div class="grid_iten-content">
              О проекте
            </div>
          </div>
          <div class="grid_item"  v-on:click="toggle_menu(); $router.push('/heritage/hall/1')">
            Виртуальная<br>
            экспозиция<br>
            "Старообрядческий<br>
            сборник"
          </div>
      </div> 
      <video id="video" class="display-none" muted>
        <source id="video-source" src="/static/video/home.mp4" type="video/mp4">
      </video>
    </div>

</template>

<script>
export default {
  name: "menu",
  data() {
    return {};
  },
  methods: {
    ch_volume_of_music: function() {
      let audio = document.getElementById("audio");

      if (this.$store.state.volume_of_music == 1) {
        this.$store.commit("ch_volume_of_music", 0);
      } else {
        this.$store.commit("ch_volume_of_music", 1);
      }
      if (audio) {
        audio.volume = this.$store.state.volume_of_music;
      }
    },
    toggle_menu: function() {
      let toggle = document.getElementsByClassName("toggle_menu")[0];
      if (toggle.className == "toggle_menu") {
        toggle.className = "toggle_menu open";
        this.$store.commit("ch_visible_blackout", true);
        this.$store.commit("ch_visible_full_screen_menu", true);
      } else {
        toggle.className = "toggle_menu";
        this.$store.commit("ch_visible_blackout", false);
        this.$store.commit("ch_visible_full_screen_menu", false);
      }
    }
  }
};
</script>

<style scoped>
.full_screen_menu {
  position: relative;
  height: 0px;
}

.full_screen_menu.active {
  overflow: hidden;
  z-index: 101;
  width: 100vw;
  height: 100vh;
}

.full_screen_menu canvas {
  position: absolute;
}

.toggle_menu {
  position: fixed;
  cursor: pointer;
  z-index: 1000;
  width: 30px;
  height: 20px;
  margin-left: auto;
  top: 30px;
  right: 30px;
}

.toggle_menu span {
  display: block;
  position: absolute;
  height: 2px;
  width: 100%;
  background: #aaa;
  border-radius: 1px;
  opacity: 1;
  left: 0;
  -webkit-transform: rotate(0deg);
  -moz-transform: rotate(0deg);
  -o-transform: rotate(0deg);
  transform: rotate(0deg);
  -webkit-transition: 0.25s ease-in-out;
  -moz-transition: 0.25s ease-in-out;
  -o-transition: 0.25s ease-in-out;
  transition: 0.25s ease-in-out;
}

.toggle_menu span:nth-child(1) {
  top: 0px;
}

.toggle_menu span:nth-child(2) {
  top: 8px;
}

.toggle_menu span:nth-child(3) {
  top: 8px;
}

.toggle_menu span:nth-child(4) {
  top: 16px;
}

.toggle_menu.open span:nth-child(1) {
  top: 8px;
  width: 0%;
  left: 50%;
}

.toggle_menu.open span:nth-child(2) {
  -webkit-transform: rotate(-45deg);
  -moz-transform: rotate(-45deg);
  -o-transform: rotate(-45deg);
  transform: rotate(-45deg);
}

.toggle_menu.open span:nth-child(3) {
  -webkit-transform: rotate(45deg);
  -moz-transform: rotate(45deg);
  -o-transform: rotate(45deg);
  transform: rotate(45deg);
}

.toggle_menu.open span:nth-child(4) {
  top: 8px;
  width: 0%;
  left: 50%;
}

.full_screen_menu-grid {
  position: fixed;
  z-index: -1;
  top: 0px;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 33% 34% 33%;
  grid-template-rows: 33% 34% 33%;
  transition: 0.3s;
  opacity: 0;
}

.full_screen_menu-grid.active {
  opacity: 1;
}

.full_screen_menu-grid .grid_item {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.8s;
  font-family: Romulc;
  font-size: 20px;
  color: #939393;
}

.full_screen_menu-grid .grid_item::after {
  content: "";
  opacity: 0;
  position: absolute;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  transition: 0.4s;
  background-position: center;
  z-index: -1;
}

.full_screen_menu-grid .grid_item:nth-child(4)::after {
  background-image: url("/static/img/menu/ust_cilma_zapovednaya.gif");
}

.full_screen_menu-grid .grid_item:nth-child(5)::after {
  background-image: url("/static/img/menu/home.gif");
}

.full_screen_menu-grid .grid_item:nth-child(6)::after {
  background-image: url("/static/img/menu/rukopisnoe-nasledie.gif");
}

.full_screen_menu-grid .grid_item:nth-child(7)::after {
  background-image: url("/static/img/menu/virt_museum_ust_cilma.gif");
}

.full_screen_menu-grid .grid_item:nth-child(8)::after {
  background-image: url("/static/img/menu/about_project.gif");
}

.full_screen_menu-grid .grid_item:nth-child(9)::after {
  background-image: url("/static/img/menu/virt_museum_star_sborn.gif");
}

.full_screen_menu-grid .grid_item:hover::after {
  opacity: 0.9;
}

.full_screen_menu-grid .grid_item:hover {
  cursor: pointer;
  transition: 0.3s;
  color: #ccc;
}

.full_screen_menu-grid img {
  transition: 0.3s;
  opacity: 0.7;
}

.full_screen_menu-grid img:hover {
  opacity: 1;
}

.full_screen_menu-grid .logo {
  width: 25%;
}

.full_screen_menu-grid .close {
  width: 5%;
}
</style>
