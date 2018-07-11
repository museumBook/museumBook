<template>
  <div>
    <main-menu></main-menu>
    <iframe src='/static/made_by_previous_man/Kolbasa_1.html'></iframe>
  </div>
</template>

<script>
import main_menu from "@/components/main_menu";

export default {
  name: "heritage",
  components: {
    "main-menu": main_menu
  },

  mounted: function() {
    let self = this;

    this.bindEvent(window, "message", function(e) {
      if (e.data == "go") {
        self.$router.push("heritage/hall/1");
      }
    });
  },

  methods: {
    bindEvent: function(element, eventName, eventHandler) {
      if (element.addEventListener) {
        element.addEventListener(eventName, eventHandler, false);
      } else if (element.attachEvent) {
        element.attachEvent("on" + eventName, eventHandler);
      }
    }
  }
};
</script>

<style scoped>
iframe {
  height: calc(100vh - 8px);
  width: -webkit-fill-available;
}
</style>
