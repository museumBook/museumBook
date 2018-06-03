<template>
  <div>
    <div class="wrapper">
      <canvas id="canvas-video" class="canvas-video"></canvas>
      <video id="video" class="display-none" muted>
        <source id="video-source" src="/static/video/hoolofintro.mp4" type="video/mp4">
      </video>
      <!-- <audio id="audio">
        <source id="audio-source" src="/static/audio/hallOfText.mp3" type="audio/mp3">
      </audio> -->
      <div class="welcome">
        <div id="num-welcome" class="num-welcome emergence-num-welcome">
          <span>I</span>
        </div>
        <div id="title-welcome" class="title-welcome emergence-title-welcome">
          <span>Ꙁ Ѧ C Т Ã Ꞗ K Ꙙ</span>
        </div>
      </div>
    </div>
    <div class="down-rooms">
      <div class="current-room">
        <div id="current-room-title" class="current-room-title">
          <span>Ꙁ Ѧ C Т Ã Ꞗ K Ꙙ</span>
        </div>
      </div>
      <div class="rooms">
        <div>
          <router-link to='/hallofIntro' class="num-room num-room-active emergence-num-room-active">I</router-link>
        </div>
        <div>
          <router-link to='/hallofLetter' class="num-room">II</router-link>
        </div>
        <div>
          <router-link to='/hallofText' class="num-room">III</router-link>
        </div>
        <div>
          <router-link to='#' class="num-room">IV</router-link>
        </div>
      </div>
      <div class="btn-sound" id="btn-sound">
        <img src="@/assets/img/equalizer.gif" v-on:click="toggleVolume">
      </div>
    </div>
    <div id="down-shadow" class="down-shadow"></div>
  </div>
</template>

<script>
export default {
  name: 'hallOfIntro',
  data () {
    return {
      video:{},
      audio:{},
      canvas:{},
      ctx:{},
      video_source:{},
      audio_source:{},
      help_message:{
        visible: false,
        text:'click on the mouse to continue'
      },
      stage:0,
      playing: true,
      videos:[{
                start: 0,
                end:   44,
                onEnd: 'next',
                rewind_from: 5
              },
              {
                start: 44,
                end: 60,
                onEnd: 'next',
                rewind_from: 52
              },
              {
                start: 60,
                end: 65.5,
                onEnd: 'next'
              },
              {
                start: 65.5,
                end: 67,
                onEnd: 'loop'
              },
              {
                start: 67,
                end:   75,
                onEnd: 'nextRoom'
              }],
      audios:[]
    }
  },

  mounted: function(){
    const self = this
    this.video  = document.getElementById('video');
    this.video_source = document.getElementById('video-source');    
    // this.audio = document.getElementById('audio');
    // this.audio_source = document.getElementById('audio-source');
    this.canvas = document.getElementById('canvas-video');
    this.ctx = this.canvas.getContext('2d');
    setTimeout(()=>{
      this.init();
    }, 4000);
  },

  methods:{
    init: function() {
      const self = this;
      self.video.play();
      // self.audio.play();
      // self.audio.volume = 0;
      // self.smoothIncreaseVolume();
      
      setTimeout(()=>{
        document.getElementById('num-welcome').className="num-welcome hidden-num-welcome";
        document.getElementById('down-shadow').className="down-shadow emergence-down-shadow";
      }, 100);

      setTimeout(()=>{
        document.getElementById('title-welcome').className="title-welcome hidden-title-welcome";
        document.getElementById('current-room-title').className="emergence-current-room-title current-room-title";
      }, 300);

      document.addEventListener('mousemove',(e)=>{
        if (e.clientY>window.innerHeight*0.75){
          document.getElementById('down-shadow').style.boxShadow = "0px -10px 100px 80px #090707";
        } else {
          document.getElementById('down-shadow').style.boxShadow = "0px -10px 100px 50px #090707";
        }
        if (self.help_message.visible){
            document.getElementById('app').style.cursor = "url(/static/img/cursor/next.png) 30 30, auto";
          } else {
            document.getElementById('app').style.cursor = "url(/static/img/cursor/default.png) 30 30, auto";
          }
        });

      document.addEventListener('mousedown', (e)=>{
        if (self.help_message.visible){
          if (!self.playing) self.video.play();
          self.help_message.visible = false;
          self.stage++;
          if (self.stage<=self.videos.length - 1){
            self.video.currentTime = self.videos[self.stage].start;
            // self.audio.currentTime = self.audios[self.stage].time_from;

            // if (self.stage==self.videos.length - 1){
            //   setTimeout(()=>{
            //     self.smoothDecreaseVolume();
            //   }, 3000);
            // }
          } 
          // else {
          //   document.getElementById('current-room-title').className = "hidden-current-room-title current-room-title";
          //   self.video.pause();
          //   self.audio.pause();
          // }
        }
      });

      self.video.addEventListener('timeupdate', function(e){
        if (e.target.currentTime >= self.videos[self.stage].end){
          if (self.videos[self.stage].onEnd == 'loop'){
            e.target.currentTime = self.videos[self.stage].start;
            self.help_message.visible = true;
          } else
          if (self.videos[self.stage].onEnd == 'next'){
            self.stage++;
          } else
          if (self.videos[self.stage].onEnd == 'nextRoom'){
            document.getElementById('current-room-title').className = "hidden-current-room-title current-room-title";
            setTimeout(()=>{
              self.$router.push('hallOfLetter');
            }, 2000);
          }   
        }
        if (self.videos[self.stage].rewind_from){
            if (e.target.currentTime>=self.videos[self.stage].rewind_from){
              self.help_message.visible = true;
            }
        }
        if (self.videos[self.stage].onEnd == 'loop'){
          self.help_message.visible = true;
        }
      }, false);

      // self.audio.addEventListener('timeupdate', function(e){
      //   if (e.target.currentTime >= self.audios[self.stage].time_to){
      //     if (self.audios[self.stage].loop){
      //       e.target.currentTime = self.audios[self.stage].time_from;
      //     }
      //   }
      // }, false);

      self.video.addEventListener('play', function() {
        var $this = this; //cache
        self.canvas.width = document.documentElement.clientWidth;
        self.canvas.height = document.documentElement.clientHeight;
        (function loop() {
          if (!$this.paused && !$this.ended) {
            self.ctx.drawImage($this, 0, 0, document.documentElement.clientWidth, document.documentElement.clientHeight);
            setTimeout(loop, 1000 / 30); // drawing at 30fps
          }
        })();
      }, 0);
    },

    toggleVolume: function(){
      if (this.audio.volume == 1){
        this.audio.volume = 0;
        document.getElementById('btn-sound').style.overflow = "hidden";
      } else {
        this.audio.volume = 1;
        document.getElementById('btn-sound').style.overflow = "inherit";
      };
    },
     
     smoothIncreaseVolume: function(){
      const self = this;
       if (self.audio.volume<1){
          self.audio.volume+=0.01;
          setTimeout(()=>{
            self.smoothIncreaseVolume();
          }, 40)
       }
     },

     smoothDecreaseVolume:function(){
      const self = this;
       if (self.audio.volume>0.05){
          self.audio.volume-=0.05;
          setTimeout(()=>{
            self.smoothDecreaseVolume();
          }, 80)
       }       
     }
  }
}
</script>

<style scoped>
  .wrapper{
    position: absolute;
    overflow: hidden;
    top: 0px;
    right: 0px;
    height: 100%;
    width: 100%;
    background-color: black;
  }

  .canvas-video{
    position: absolute;
    top: 0px;
    bottom: 0px;
    height: 100%;
    width: 100%;
    object-fit: cover;
  }

  .welcome{
    position: absolute;
    top: 30%;
    left: 30%;
    right: 30%;
    font-family: 'Romulc';
    text-align: center;
    user-select: none;
  }

  .num-welcome{
    font-weight: bold;
    font-size: 16px;
    color: #ffffff;
    opacity: 0;
  }

  .title-welcome{
    margin-top: 60px;
    font-size: 25px;
    color: #ffffff;
    opacity: 0;
  }

  .down-rooms{
    position: absolute;
    bottom: 0px;
    width: 100%;
    z-index: 1;
    padding: 0px 0px 30px 0px;
    text-align: center;
    font-family: 'Romulc';
  }

  .current-room-title{
    padding: 0px;
    opacity: 0;
  }

  .current-room-title span{
    font-size: 20px;
    color: #e1e1e1;
    text-shadow: 0px 0px 27px #000;
    user-select: none;
  }

  .rooms{
    padding-top: 25px;
  }

  .rooms a{
    color: #9D9D9D;
    font-size: 13px;
    font-weight: 600;
    text-decoration: none;
    cursor: url(/static/img/cursor/pointer.png) 30 30, auto;
    user-select: none;
  }
  
  .rooms>div{
    position: relative;
    display: inline-block;
    padding: 0px 45px;
  }

  .rooms .num-room{
    padding: 10px;
  }

 .down-shadow{
    position: absolute;
    bottom: 0px;
    transition-timing-function: ease;
    transition-duration: 0.8s;
    box-shadow: 0px -10px 100px 50px #090707;
    width: 100%;
    height: 1px;
    opacity: 0;
  }

  .btn-sound{
    position: absolute;
    right: 50px;
    bottom: 40px;
    width: 28px;
    height: 5px;
    cursor: url(/static/img/cursor/pointer.png) 30 30, auto;
  }

  .btn-sound img{
    position: absolute;
    top: -6px;
    left: 0px;
  }

  .btn-sound image{
    position: absolute;
    top: -5px;
    left: 0px;
    height: 11px;
  }

  .emergence-num-welcome{
    animation-name: emergence-opacity-essence;
    animation-duration: 4s;
    animation-delay: .1s;
    animation-timing-function: ease;
    animation-fill-mode: forwards;
  }

  .hidden-num-welcome{
    animation-name: hidden-opacity-essence;
    animation-duration: 1.5s;
    animation-timing-function: ease;
    animation-fill-mode: forwards;
  }

  .emergence-title-welcome{
    animation-name: emergence-opacity-essence;
    animation-duration: 7s;
    animation-delay: .5s;
    animation-timing-function: ease;
    animation-fill-mode: forwards;
  }

  .emergence-current-room-title{
    animation-name: emergence-current-room-title;
    animation-duration: 7s;
    animation-delay: 1s;
    animation-timing-function: ease;
    animation-fill-mode: forwards;   
  }

  .hidden-current-room-title{
    animation-name: hidden-opacity-essence;
    animation-duration: 1.0s;
    animation-timing-function: ease;
    animation-fill-mode: forwards;  
  }
  
  .hidden-title-welcome{
    animation-name: hidden-opacity-essence;
    animation-duration: 3s;
    animation-timing-function: ease;
    animation-fill-mode: forwards;
  }

  .emergence-num-room-active{
    animation-name: emergence-num-room-active;
    animation-duration: 4s;
    animation-timing-function: ease;
    animation-fill-mode: forwards;
  }

  .emergence-down-shadow{
    animation-name: emergence-opacity-essence;
    animation-duration: 2s;
    animation-timing-function: ease;
    animation-fill-mode: forwards;
  }

  @keyframes emergence-current-room-title {
    from{
      opacity: 0;
      padding: 20px;
    }
    to{
      opacity: 1;
      padding: 0px;
    }   
  }
  
  @keyframes emergence-num-room-active {
    from{
      color: #9D9D9D;
      font-size: 13px;
    }
    to{
      color: #CCC;
      font-size: 15px;
      text-shadow: 0px 0px;
    }
  }

</style>
