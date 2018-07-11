<template>
  <div>
    <div id="wrapper" class="wrapper">
      <canvas id="canvas-video" class="canvas-video"></canvas>
      <video id="video" class="display-none" muted>
        <source id="video-source" src="/static/video/heritage/3_hall.mp4" type="video/mp4">
      </video>
      <audio id="audio">
        <source id="audio-source" src="/static/audio/heritage/3_hall.mp3" type="audio/mp3">
      </audio>
      <div class="welcome">
        <div id="num-welcome" class="num-welcome emergence-num-welcome">
          <span>III</span>
        </div>
        <div id="title-welcome" class="title-welcome emergence-title-welcome">
          <img src='/static/img/heritage/3_hall.png'>
        </div>
      </div>
    </div>
    <div class="down-rooms">
      <div class="current-room">
        <div id="current-room-title" class="current-room-title">
          <img src='/static/img/heritage/3_hall.png'>
        </div>
      </div>
      <div class="rooms">
        <div>
          <router-link to='/heritage/hall/1' class="num-room">I</router-link>
        </div>
        <div>
          <router-link to='/heritage/hall/2' class="num-room">II</router-link>
        </div>
        <div>
          <router-link to='/heritage/hall/3' class="num-room num-room-active emergence-num-room-active">III</router-link>
        </div>
        <div>
          <router-link to='/heritage/hall/4' class="num-room">IV</router-link>
        </div>
      </div>
      <div class="btn-sound" id="btn-sound">
        <img src="/static/img/equalizer.gif" v-on:click="toggleVolume">
      </div>
    </div>
    <div id="down-shadow" class="down-shadow"></div>
  </div>
</template>

<script>
export default {
  name: "heritage-hall-3",
  data() {
    return {
      video: {},
      audio: {},
      canvas: {},
      ctx: {},
      enableAction: false,
      stage: 0,
      videos: [
        {
          start: 0,
          end: 15,
          onEnd: "next"
        },
        {
          start: 15,
          end: 30,
          onEnd: "loop"
        },
        {
          start: 35,
          end: 44,
          onEnd: "next"
        },
        {
          start: 44,
          end: 52,
          onEnd: "loop"
        },
        {
          start: 52,
          end: 60,
          onEnd: "nextRoom"
        }
      ],
      audios: [
        {
          start: 0,
          end: 138,
          onEnd: "loop"
        },
        {
          start: 139,
          end: 312,
          onEnd: "loop"
        }
      ]
    };
  },

  mounted: function() {
    this.video = document.getElementById("video");
    this.audio = document.getElementById("audio");
    this.canvas = document.getElementById("canvas-video");
    this.ctx = this.canvas.getContext("2d");
    setTimeout(() => {
      this.init();
    }, 4000);
  },

  methods: {
    init: function() {
      const self = this;
      self.video.play();
      self.audio.play();

      setTimeout(() => {
        document.getElementById("num-welcome").className =
          "num-welcome hidden-num-welcome";
        document.getElementById("down-shadow").className =
          "down-shadow emergence-down-shadow";
      }, 100);

      setTimeout(() => {
        document.getElementById("title-welcome").className =
          "title-welcome hidden-title-welcome";
        document.getElementById("current-room-title").className =
          "emergence-current-room-title current-room-title";
      }, 300);

      document.addEventListener("mousemove", e => {
        if (e.clientY > window.innerHeight * 0.75) {
          document.getElementById("down-shadow").style.boxShadow =
            "0px -10px 100px 80px #090707";
        } else {
          document.getElementById("down-shadow").style.boxShadow =
            "0px -10px 100px 50px #090707";
        }
      });

      document.addEventListener("mousedown", e => {
        if (self.enableAction) {
          if (e.button == 0) {
            if (!self.playing) self.video.play();
            self.enableAction = false;
            document.getElementById("wrapper").style.cursor = "default";
            self.stage++;
            if (self.stage <= self.videos.length - 1) {
              self.video.currentTime = self.videos[self.stage].start;

              if (self.stage == 2) {
                setTimeout(() => {
                  self.audio.currentTime = self.audios[1].start;
                }, 1500);
              }
            }
          }
        }
      });

      self.video.addEventListener(
        "timeupdate",
        function(e) {
          if (e.target.currentTime >= self.videos[self.stage].end) {
            if (self.videos[self.stage].onEnd == "loop") {
              e.target.currentTime = self.videos[self.stage].start;
              self.enableAction = true;
              document.getElementById("wrapper").style.cursor = "pointer";
            } else if (self.videos[self.stage].onEnd == "next") {
              self.stage++;
            } else if (self.videos[self.stage].onEnd == "nextRoom") {
              document.getElementById("current-room-title").className =
                "hidden-current-room-title current-room-title";
              setTimeout(() => {
                self.$router.push("/heritage/hall/4");
              }, 2000);
            }
          }

          if (self.videos[self.stage].onEnd == "loop") {
            self.enableAction = true;
            document.getElementById("wrapper").style.cursor = "pointer";
          }
        },
        false
      );

      self.video.addEventListener(
        "play",
        function() {
          var $this = this;
          self.canvas.width = document.documentElement.clientWidth;
          self.canvas.height = document.documentElement.clientHeight;
          (function loop() {
            if (!$this.paused && !$this.ended) {
              self.ctx.drawImage(
                $this,
                0,
                0,
                document.documentElement.clientWidth,
                document.documentElement.clientHeight
              );
              setTimeout(loop, 1000 / 30);
            }
          })();
        },
        0
      );
    },

    toggleVolume: function() {
      if (this.audio.volume == 0) {
        this.audio.volume = 0;
        document.getElementById("btn-sound").style.overflow = "hidden";
      } else {
        this.audio.volume = 1;
        document.getElementById("btn-sound").style.overflow = "inherit";
      }
    }
  }
};
</script>

<style scoped>
.wrapper {
  position: absolute;
  top: 0px;
  right: 0px;
  height: 100%;
  width: 100%;
  overflow: hidden;
  background-color: black;
}

.canvas-video {
  position: absolute;
  top: 0px;
  bottom: 0px;
  height: 100%;
  width: 100%;
  object-fit: cover;
}

.welcome {
  position: absolute;
  top: 30%;
  left: 30%;
  right: 30%;
  font-family: "Romulc";
  text-align: center;
  user-select: none;
}

.num-welcome {
  font-weight: bold;
  font-size: 16px;
  color: #ffffff;
  opacity: 0;
}

.title-welcome {
  margin-top: 60px;
  font-size: 25px;
  color: #ffffff;
  opacity: 0;
}

.title-welcome > img {
  width: 200px;
  height: 33px;
}

.down-rooms {
  position: absolute;
  bottom: 0px;
  width: 100%;
  z-index: 1;
  padding: 0px 0px 30px 0px;
  text-align: center;
  font-family: "Romulc";
}

.current-room-title {
  padding: 0px;
  opacity: 0;
}

.current-room-title img {
  width: 150px;
  height: 26px;
}

.rooms {
  padding-top: 25px;
}

.rooms a {
  transition: 0.3s;
  color: #9d9d9d;
  font-size: 13px;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  user-select: none;
}

.rooms a:hover {
  font-size: 17px;
  color: #ccc;
}

.rooms > div {
  position: relative;
  display: inline-block;
  padding: 0px 45px;
}

.rooms .num-room {
  padding: 10px;
}

.down-shadow {
  position: absolute;
  bottom: 0px;
  transition-timing-function: ease;
  transition-duration: 0.8s;
  box-shadow: 0px -10px 100px 50px #090707;
  width: 100%;
  height: 1px;
  opacity: 0;
}

.btn-sound {
  position: absolute;
  right: 50px;
  bottom: 40px;
  width: 28px;
  height: 5px;
  cursor: pointer;
}

.btn-sound img {
  position: absolute;
  top: -6px;
  left: 0px;
}

.btn-sound image {
  position: absolute;
  top: -5px;
  left: 0px;
  height: 11px;
}

.emergence-num-welcome {
  animation-name: emergence-opacity-essence;
  animation-duration: 4s;
  animation-delay: 0.1s;
  animation-timing-function: ease;
  animation-fill-mode: forwards;
}

.hidden-num-welcome {
  animation-name: hidden-opacity-essence;
  animation-duration: 1.5s;
  animation-timing-function: ease;
  animation-fill-mode: forwards;
}

.emergence-title-welcome {
  animation-name: emergence-opacity-essence;
  animation-duration: 7s;
  animation-delay: 0.5s;
  animation-timing-function: ease;
  animation-fill-mode: forwards;
}

.emergence-current-room-title {
  animation-name: emergence-current-room-title;
  animation-duration: 7s;
  animation-delay: 1s;
  animation-timing-function: ease;
  animation-fill-mode: forwards;
}

.hidden-current-room-title {
  animation-name: hidden-opacity-essence;
  animation-duration: 1s;
  animation-timing-function: ease;
  animation-fill-mode: forwards;
}

.hidden-title-welcome {
  animation-name: hidden-opacity-essence;
  animation-duration: 3s;
  animation-timing-function: ease;
  animation-fill-mode: forwards;
}

.mouse-click-active {
  animation-name: emergence-mouse-click;
  animation-duration: 0.5s;
  animation-timing-function: ease;
  animation-fill-mode: forwards;
}

.mouse-click-disactive {
  animation-name: hidden-mouse-click;
  animation-duration: 0.2s;
  animation-timing-function: ease;
  animation-fill-mode: forwards;
}

.emergence-num-room-active {
  animation-name: emergence-num-room-active;
  animation-duration: 4s;
  animation-timing-function: ease;
  animation-fill-mode: forwards;
}

.emergence-down-shadow {
  animation-name: emergence-opacity-essence;
  animation-duration: 2s;
  animation-timing-function: ease;
  animation-fill-mode: forwards;
}

@keyframes emergence-current-room-title {
  from {
    opacity: 0;
    padding: 20px;
  }
  to {
    opacity: 1;
    padding: 0px;
  }
}

@keyframes emergence-num-room-active {
  from {
    color: #9d9d9d;
    font-size: 13px;
  }
  to {
    color: #ccc;
    font-size: 17px;
    text-shadow: 0px 0px;
  }
}

@keyframes emergence-mouse-click {
  from {
    margin-bottom: 15px;
  }
  to {
    margin-bottom: 20px;
    opacity: 1;
  }
}

@keyframes hidden-mouse-click {
  from {
    margin-bottom: 20px;
  }
  to {
    margin-bottom: 15px;
    opacity: 0;
  }
}
</style>
