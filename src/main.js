import Vue from "vue";
import Vuex from "vuex";
import App from "./App";
import router from "./router";

Vue.config.productionTip = false;
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    volume_of_music: 1,
    visible_blackout: false,
    visible_full_screen_menu: false
  },
  mutations: {
    ch_volume_of_music(state, data) {
      state.volume_of_music = data;
    },
    ch_visible_blackout(state, data) {
      state.visible_blackout = data;
    },
    ch_visible_full_screen_menu(state, data) {
      state.visible_full_screen_menu = data;
    }
  }
});

new Vue({
  el: "#app",
  store,
  router,
  components: { App },
  template: "<App/>"
});
