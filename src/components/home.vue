<template>
  <div>
    <fullScreenMenu></fullScreenMenu>
    <div id="home" class="home">
      <canvas id="home-canvas_video" class="home-canvas_video"></canvas>
      <div id="home-quote_1">
        <pre class="quote-text">
«Cотни четыре домов старинного села 
двумя ровными порядками сбегали с холма 
вдоль неоглядной Печоры к ручью, 
за которым белели маковки собора»
        </pre>
      </div>
      <div id="home-quote_2">
        <pre class="quote-text">
«Печора, окаймленная синью бескрайнего леса, 
величественно катит свои воды
к Ледовитому океану; торопливо сбегают
с Тимана и припадают к мати-Печоре
супротив Усть-Цильмы изумрудно чистые
близнецы-сестрицы Пижма и Цильма»</pre>
        <p class="home-quote_author">
          - Лев Смоленцев «Печорские дали»
        </p>
      </div>
      <div class="home-rooms">
        <img id="home-room_1" src="/static/img/homePage/room1.gif">
        <img id="home-room_2" src="/static/img/homePage/room2.gif">
      </div>
      <div class="grandmothers" id=grandmothers>
        <img id="grandmothers-img" src='/static/img/homePage/grandmothers.gif'>
      </div>
    </div>
    <video id="video" class="display-none" muted>
      <source id="video-source" src="/static/video/home.mp4" type="video/mp4">
    </video>
    <audio id="audio" loop>
      <source id="audio-source" src="/static/audio/home.mp3" type="audio/mp3">
    </audio>
  </div>
</template>

<script>
import fullScreenMenu from "@/components/fullScreenMenu";
export default {
  name: "home",
  components: {
    fullScreenMenu
  },
  data() {
    return {
      video: {},
      audio: {},
      canvas: {},
      ctx: {},
      width: 0,
      height: 0,
      max_height: 0,
      max_width: 0,
      height_offset: 0,
      width_offset: 0,
      stage: 0,
      videos: [
        {
          start: 0,
          end: 10,
          onEnd: "next"
        },
        {
          start: 10,
          end: 15,
          onEnd: "loop"
        }
      ]
    };
  },

  mounted: function() {
    const self = this;
    self.video = document.getElementById("video");
    self.audio = document.getElementById("audio");
    self.canvas = document.getElementById("home-canvas_video");
    self.ctx = self.canvas.getContext("2d");
    self.width = window.innerWidth;
    self.height = window.innerHeight;
    self.stage = 1;
    self.video.play();
    self.audio.play();
    self.resize();

    self.video.addEventListener(
      "play",
      function() {
        var $this = this;
        (function loop() {
          self.ctx.fillStyle = "#2D2C2D";
          self.ctx.fillRect(0, 0, self.width, self.height);
          if (!$this.paused && !$this.ended) {
            self.ctx.drawImage(
              $this,
              0,
              50,
              1280,
              620,
              self.width_offset,
              self.height_offset,
              self.max_width,
              self.max_height
            );
            setTimeout(loop, 1000 / 30);
          }
        })();
      },
      0
    );

    window.addEventListener("resize", function(event) {
      self.width = window.innerWidth;
      self.height = window.innerHeight;
      self.resize();
    });

    self.video.addEventListener(
      "timeupdate",
      function(e) {
        if (e.target.currentTime >= self.videos[self.stage].end) {
          if (self.videos[self.stage].onEnd == "next") {
            self.stage++;
            e.target.currentTime = self.videos[self.stage].start;
          } else if (self.videos[self.stage].onEnd == "loop") {
            e.target.currentTime = self.videos[self.stage].start;
          }
        }
      },
      false
    );

    setTimeout(() => {
      this.init();
    }, 3800);
  },

  methods: {
    init: function() {
      setTimeout(() => {
        setInterval(() => {
          document.getElementById("grandmothers-img").className =
            "grandmothers-img emergence-grandmother";
          setTimeout(() => {
            document.getElementById("grandmothers-img").className =
              "grandmothers-img hidden-grandmother";
          }, 2200);
        }, 22000);

        setTimeout(() => {
          document.getElementById("home-room_1").className = "emergence-room";
          document.getElementById("home-room_2").className = "emergence-room";
          document.getElementById("home-quote_1").className = "emergence-quote";
          document.getElementById("home-quote_2").className = "emergence-quote";

          document
            .getElementById("home-room_1")
            .addEventListener("mouseover", function(e) {
              e.target.setAttribute(
                "src",
                "/static/img/homePage/room1hover.gif"
              );
            });

          document
            .getElementById("home-room_1")
            .addEventListener("mouseleave", function(e) {
              e.target.setAttribute("src", "/static/img/homePage/room1.gif");
            });

          document
            .getElementById("home-room_2")
            .addEventListener("mouseover", function(e) {
              e.target.setAttribute(
                "src",
                "/static/img/homePage/room2hover.gif"
              );
            });

          document
            .getElementById("home-room_2")
            .addEventListener("mouseleave", function(e) {
              e.target.setAttribute("src", "/static/img/homePage/room2.gif");
            });
        }, 1000);
      }, 8800);
    },

    resize: function() {
      this.canvas.width = this.width;
      this.canvas.height = this.height;

      this.width_offset = 0;
      this.height_offset = 0;

      if (this.width >= 16 / 9 * this.height) {
        this.max_height = this.height;
        this.max_width = 16 / 9 * (this.height + 110);
        this.width_offset = 9 / 16 * this.width - (this.height + 110);
      } else {
        this.max_width = this.width;
        this.max_height = 9 / 16 * this.width - 110;
        this.height_offset = (this.height - this.max_height) / 2;
      }

      document.getElementById("home-room_1").style.height =
        this.max_height * 200 / 1080 + "px";
      document.getElementById("home-room_1").style.top =
        this.max_height * 860 / 1080 + this.height_offset + "px";
      document.getElementById("home-room_1").style.left =
        this.max_width * 700 / 1920 + this.width_offset + "px";
      document.getElementById("home-room_2").style.height =
        this.max_height * 200 / 1080 + "px";
      document.getElementById("home-room_2").style.top =
        this.max_height * 860 / 1080 + this.height_offset + "px";
      document.getElementById("home-room_2").style.left =
        this.max_width * 1000 / 1920 + this.width_offset + "px";

      document.getElementById("home-quote_1").style.top =
        this.max_height * 380 / 1080 + this.height_offset + "px";
      document.getElementById("home-quote_1").style.left =
        this.max_width * 225 / 1920 + this.width_offset + "px";
      document.getElementById("home-quote_1").style.width =
        this.max_width * 320 / 1920 + "px";
      document.getElementById("home-quote_1").style.fontSize =
        this.max_width * 20 / 1920 + "px";

      document.getElementById("home-quote_2").style.top =
        this.max_height * 550 / 1080 + this.height_offset + "px";
      document.getElementById("home-quote_2").style.left =
        this.max_width * 1425 / 1920 + this.width_offset + "px";
      document.getElementById("home-quote_2").style.width =
        this.max_width * 400 / 1920 + "px";
      document.getElementById("home-quote_2").style.fontSize =
        this.max_width * 20 / 1920 + "px";

      document.getElementById("grandmothers").style.bottom =
        this.height_offset + "px";
      document.getElementById("grandmothers").style.left =
        this.width_offset + "px";
      document.getElementById("grandmothers-img").style.height =
        this.max_height * 900 / 1080 + "px";
    }
  }
};
</script>

<style scoped>
.home {
  position: absolute;
  top: 0px;
  overflow: hidden;
  width: 100%;
  height: 100%;
}

.home canvas {
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

#home-room_1,
#home-room_2 {
  position: absolute;
  cursor: pointer;
  z-index: 100;
  opacity: 0;
}

#home-quote_1,
#home-quote_2 {
  position: absolute;
  opacity: 0;
}

.quote-text {
  color: #bbb;
  margin: 0px;
  text-shadow: 1px 1px 5px #000;
  font-family: Pfagorasanspro-italic;
}

.home-quote_author {
  color: #ccc;
  text-align: right;
  margin: 10px;
  font-size: 0.9em;
  font-family: Pfagorasanspro-bold;
}

.grandmothers {
  position: absolute;
  max-width: 100%;
  left: 0px;
  overflow: hidden;
}

.grandmothers img {
  height: 740px;
  z-index: 0;
  opacity: 0;
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

.emergence-grandmother {
  animation-name: emergence-opacity-essence;
  animation-direction: 0.3s;
  animation-timing-function: ease;
  animation-fill-mode: forwards;
}

.hidden-grandmother {
  animation-name: hidden-opacity-essence;
  animation-direction: 0.3s;
  animation-timing-function: ease;
  animation-fill-mode: forwards;
}
</style>
