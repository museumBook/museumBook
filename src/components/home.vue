<template>
  <div>
    <div id="wrapper" class="wrapper">
      <canvas id="canvas-video" class="canvas-video"></canvas>
      <img id="static-home" class="background-home">
      <img id="load-home" class="background-home">
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
  name: 'home',
  data () {
    return {
      video:{},
      audio:{},
      canvas:{},
      ctx:{},
      video_source:{},
      audio_source:{},
      videos:[{
        start: 0,
        end: 6,
        onEnd: 'loop'
      }]
    }
  },

  mounted: function(){
    const self = this;
    this.video  = document.getElementById('video');
    this.video_source = document.getElementById('video-source');    
    this.audio = document.getElementById('audio');
    this.audio_source = document.getElementById('audio-source');
    this.canvas = document.getElementById('canvas-video');
    this.ctx = this.canvas.getContext('2d');

    self.video.play();

    self.video.addEventListener('timeupdate', function(e){
      if (e.target.currentTime >= self.videos[0].end){
        e.target.currentTime= self.videos[0].start;
      }
    }, false);

    self.video.addEventListener('play', function() {
      var $this = this; //cache
      self.canvas.width = document.documentElement.clientWidth;
      self.canvas.height = document.documentElement.clientHeight;
      document.getElementById('load-home').style.height= document.getElementById('canvas-video').height + 'px';
      document.getElementById('static-home').style.height= document.getElementById('canvas-video').height + 'px';
      document.getElementById('load-home').style.width= document.getElementById('canvas-video').width + 'px';
      document.getElementById('static-home').style.width= document.getElementById('canvas-video').width + 'px';
      (function loop() {
        if (!$this.paused && !$this.ended) {
          self.ctx.drawImage($this, 0, 0, document.documentElement.clientWidth, document.documentElement.clientHeight);
          setTimeout(loop, 1000 / 30); // drawing at 30fps
        }
      })();
    }, 0);

    setTimeout(()=>{
      this.init();
    }, 4000);
  },

  methods:{
    init: function(){
      document.getElementById('load-home').setAttribute('src', '/static/img/homePage/load-home.gif')
      document.getElementById('load-home').className = 'load-home emergence-load-home';
      setTimeout(()=>{
        document.getElementById('static-home').setAttribute('src', '/static/img/homePage/static-home.png');
        document.getElementById('static-home').style.display= 'block';
        // setTimeout(()=>{
        //   document.getElementById('load-home').style.display='none';
        // }, 1000)
      }, 17500)
    }
  }
}
</script>

<style scoped>
  .wrapper{
    position: absolute;
    width: 100%;
    height: 100%;
  }

  .wrapper canvas{
    position: absolute;
  }

  .background-home{
    position: absolute;
    left: 0px;
    top: 0px;
    max-width: 100%;
    object-fit: cover;
  }

  #load-home{
    opacity: 0;
  }

  #static-home{
    display: none;
  }

  .emergence-load-home{
    animation-name: emergence-opacity-essence;
    animation-duration: 1s;
    animation-timing-function: ease;
    animation-fill-mode: forwards;
  }
</style>
