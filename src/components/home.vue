<template>
  <div>
    <div id="wrapper" class="wrapper">
      <canvas id="canvas-video" class="canvas-video"></canvas>
      <img id="static-home" class="background-home">
      <img id="load-home" class="background-home">
      <div id="quote1">
        <p class="quote-text">
          «Cотни четыре домов старинного села двумя ровными порядками сбегали с холма 
          вдоль неоглядной Печоры к ручью, за которым белели маковки собора»
        </p>
      </div>
      <div id="quote2">
        <p class="quote-text">
          «Печора, окаймленная синью бескрайнего леса, величественно катит свои воды к Ледовитому океану; 
          торопливо сбегают с Тимана и припадают к мати-Печоре супротив Усть-Цильмы изумрудно 
          чистые близнецы-сестрицы Пижма и Цильма»
        </p>
        <p class="quote-author">
          Лев Смоленцев «Печорские дали»
        </p>
      </div>
      <div class="rooms" id="rooms">
        <img id="room1" src="/static/img/homePage/room1.png">
        <img id="room2" src="/static/img/homePage/room2.png">
      </div>
    </div>
    <video id="video" class="display-none" muted>
      <source id="video-source" src="/static/video/home.mp4" type="video/mp4">
    </video>
    <audio id="audio">
      <source id="audio-source" src="/static/audio/home.mp3" type="audio/mp3">
    </audio>
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      video: {},
      audio: {},
      canvas: {},
      ctx: {},
      width: 0,
      height: 0,
      videos: [
        {
          start: 0,
          end: 6,
          onEnd: "loop"
        }
      ]
    };
  },

  mounted: function() {
    const self = this;
    this.video = document.getElementById("video");
    this.audio = document.getElementById("audio");
    this.canvas = document.getElementById("canvas-video");
    this.ctx = this.canvas.getContext("2d");
    this.width = document.documentElement.clientWidth;
    this.height = document.documentElement.clientHeight;
    this.resize();
    this.video.play();
    this.audio.play();

    self.video.addEventListener(
      "play",
      function() {
        var $this = this;
        self.canvas.width = self.width;
        self.canvas.height = self.height;
        (function loop() {
          if (!$this.paused && !$this.ended) {
            self.ctx.drawImage($this, 0, 0, self.width, self.height);
            setTimeout(loop, 1000 / 30);
          }
        })();
      },
      0
    );

    window.addEventListener("resize", function(event) {
      self.width = document.documentElement.clientWidth;
      self.height = document.documentElement.clientHeight;
      self.resize();
    });

    self.video.addEventListener(
      "timeupdate",
      function(e) {
        if (e.target.currentTime >= self.videos[0].end) {
          e.target.currentTime = self.videos[0].start;
        }
      },
      false
    );

    setTimeout(() => {
      this.init();
    }, 14000);
  },

  methods: {
    init: function() {
      document
        .getElementById("load-home")
        .setAttribute("src", "/static/img/homePage/load-home.gif");
      document.getElementById("load-home").className =
        "background-home load-home emergence-load-home";

      setTimeout(() => {
        document
          .getElementById("static-home")
          .setAttribute("src", "/static/img/homePage/static-home.png");
        document.getElementById("static-home").style.display = "block";

        setTimeout(() => {
          document.getElementById("room1").className = "emergence-room";
          document.getElementById("room2").className = "emergence-room";
          document.getElementById("quote1").className = "emergence-quote";
          document.getElementById("quote2").className = "emergence-quote";
          document.getElementById("load-home").style.display = "none";

          document
            .getElementById("room1")
            .addEventListener("mouseover", function(e) {
              e.target.setAttribute(
                "src",
                "/static/img/homePage/room1hover.png"
              );
            });

          document
            .getElementById("room1")
            .addEventListener("mouseleave", function(e) {
              e.target.setAttribute("src", "/static/img/homePage/room1.png");
            });

          document
            .getElementById("room2")
            .addEventListener("mouseover", function(e) {
              e.target.setAttribute(
                "src",
                "/static/img/homePage/room2hover.png"
              );
            });

          document
            .getElementById("room2")
            .addEventListener("mouseleave", function(e) {
              e.target.setAttribute("src", "/static/img/homePage/room2.png");
            });
        }, 1000);
      }, 17500);
    },

    resize: function() {
      var max_height;
      var max_width;
      var height_offset = 0;
      var width_offset = 0;

      this.canvas.width = this.width;
      this.canvas.height = this.height;

      if (this.width > 16 / 9 * this.height) {
        max_height = this.height;
        max_width = 16 / 9 * this.height;
        width_offset = 9 / 16 * this.width - this.height;
      } else {
        max_width = this.width;
        max_height = 9 / 16 * this.width;
      }

      document.getElementById("load-home").style.height =
        max_height * 960 / 1080 + "px";
      document.getElementById("static-home").style.height =
        max_height * 960 / 1080 + "px";

      document.getElementById("load-home").style.width =
        max_width * 1706 / 1920 + "px";
      document.getElementById("static-home").style.width =
        max_width * 1706 / 1920 + "px";

      document.getElementById("load-home").style.left =
        max_width * 107 / 1920 + width_offset + "px";
      document.getElementById("static-home").style.left =
        max_width * 107 / 1920 + width_offset + "px";

      document.getElementById("room1").style.height =
        max_height * 200 / 1080 + "px";
      document.getElementById("room2").style.height =
        max_height * 200 / 1080 + "px";

      document.getElementById("rooms").style.top =
        max_height * 860 / 1080 + "px";

      document.getElementById("quote1").style.top =
        max_height * 360 / 1080 + "px";
      document.getElementById("quote1").style.left =
        max_width * 100 / 1920 + width_offset + "px";
      document.getElementById("quote1").style.width =
        max_width * 380 / 1920 + "px";
      document.getElementById("quote1").style.fontSize =
        max_width * 22 / 1920 + "px";

      document.getElementById("quote2").style.top =
        max_height * 570 / 1080 + "px";
      document.getElementById("quote2").style.left =
        max_width * 1470 / 1920 + width_offset + "px";
      document.getElementById("quote2").style.width =
        max_width * 445 / 1920 + "px";
      document.getElementById("quote2").style.fontSize =
        max_width * 22 / 1920 + "px";
    }
  }
};
</script>

<style scoped>
.wrapper {
  position: absolute;
  width: 100%;
  height: 100%;
}

.wrapper canvas {
  position: absolute;
}

.background-home {
  position: absolute;
  left: 0px;
  top: 0px;
  max-width: 100%;
  object-fit: cover;
}

#load-home {
  opacity: 0;
}

#static-home {
  display: none;
}

.rooms {
  position: absolute;
  width: 100%;
  text-align: center;
}

.rooms img {
  margin: 0px 30px;
  cursor: pointer;
  opacity: 0;
}

#quote1,
#quote2 {
  position: absolute;
  opacity: 0;
}

.quote-text {
  color: #fff;
}

.quote-author {
  color: #fff;
  font-weight: bold;
}

.emergence-load-home {
  animation-name: emergence-opacity-essence;
  animation-duration: 1s;
  animation-timing-function: ease;
  animation-fill-mode: forwards;
}

.emergence-room {
  animation-name: emergence-opacity-essence;
  animation-duration: 3s;
  animation-timing-function: ease;
  animation-fill-mode: forwards;
}

.emergence-quote {
  animation-name: emergence-opacity-essence;
  animation-duration: 2s;
  animation-timing-function: ease;
  animation-fill-mode: forwards;
}
</style>
