<template>
  <div>
    <div class="wrapper">
      <canvas id="canvas-video" class="canvas-video"></canvas>
      <video id="video" class="hidden-video" muted>
        <source id="video-source" src="/static/video/hooloftext.mp4" type="video/mp4">
      </video>
      <audio id="audio">
        <source id="audio-source" src="/static/audio/hallOfText.mp3" type="audio/mp3">
      </audio>
      <div class="welcome">
        <div id="num-welcome" class="num-welcome emergence-num-welcome">
          <span>III</span>
        </div>
        <div id="title-welcome" class="title-welcome emergence-title-welcome">
          <span>Π Θ Λ Ú Ỵ C T Ᾱ ß</span>
        </div>
      </div>
    </div>
    <div class="down-rooms">
      <div class="current-room">
        <div id="current-room-title" class="current-room-title">
          <span>Π Θ Λ Ú Ỵ C T Ᾱ ß</span>
        </div>
      </div>
      <div class="help-message" v-bind:class="{ 'help-message-active': help_message.visible }">
        <span>{{help_message.text}}</span>
      </div>
      <div class="rooms">
        <div>
          <router-link to='/hallofIntro' class="num-room">I</router-link>
            <div class="title-room">
              <span>Ꙁ Ѧ C Т Ã Ꞗ K Ꙙ</span>
            </div>
        </div>
        <div>
          <router-link to='/hallofLetter' class="num-room">II</router-link>
          <div class="title-room">
            <span>Б Ӯ ₭ Ḇ И Ꙡ Ѧ</span>
          </div>
        </div>
        <div>
          <router-link to='/hallofText' class="num-room emergence-num-room-active">III</router-link>
          <div class="title-room">
            <span>Π Θ Λ Ú Ỵ C T Ᾱ ß</span>
          </div>
        </div>
        <div>
          <router-link to='#' class="num-room">IV</router-link>
          <div class="title-room">
            <span>K O Ħ Ꙡ Ꝋ β Ǩ Ѧ</span>
          </div>
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
  name: 'hallOfText',
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
      videos:[{
                start: 0,
                end: 15,
                onEnd: 'next'
              },
              {
                start: 15,
                end: 30,
                onEnd: 'loop'
              },
              {
                start: 35,
                end: 44,
                onEnd: 'next'
              },
              {
                start: 44,
                end: 52,
                onEnd: 'loop'
              },
              {
                start: 52,
                end: 60,
                onEnd: 'next'
              }],
      audios:[{
                start: 0,
                end: 9,
                onEnd: 'next'
              },
              {
                start: 9,
                end: 16,
                onEnd: 'loop'
              },
              {
                start: 16,
                end: 2,
                onEnd: 'next'
              },
              {
                start: 22,
                end: 28,
                onEnd: 'loop'
              },
              {
                start: 22,
                end: 29,
                onEnd: 'loop'
              }]
    }
  },

  mounted: function(){
    const self = this
    this.video  = document.getElementById('video');
    this.video_source = document.getElementById('video-source');    
    this.audio = document.getElementById('audio');
    this.audio_source = document.getElementById('audio-source');
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
      self.audio.play();
      self.audio.volume = 0;
      self.smoothIncreaseVolume();
      
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
      });

      document.addEventListener('mousedown', (e)=>{
        if (self.help_message.visible){
          if (!self.playing) self.video.play();
          self.help_message.visible = false;
          self.stage++;
          if (self.stage<=self.videos.length - 1){
            self.video.currentTime = self.videos[self.stage].start;
            self.audio.currentTime = self.audios[self.stage].start;

            if (self.stage==self.videos.length - 1){
              setTimeout(()=>{
                self.smoothDecreaseVolume();
              }, 3000);
            }
          } 
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
              self.$router.push('hallOfText');
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

      self.audio.addEventListener('timeupdate', function(e){
        if (e.target.currentTime >= self.audios[self.stage].end){
          if (self.audios[self.stage].onEnd == 'loop'){
            e.target.currentTime = self.audios[self.stage].start;
          }
        }
      }, false);

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
       if (self.audio.volume<0.99){
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
    top: 0px;
    right: 0px;
    height: 100%;
    width: 100%;
    background-color: black;
  }

  .hidden-video{
    display: none;
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
    margin-top: 65px;
    font-size: 45px;
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
    padding: 50px;
    opacity: 0;
  }

  .help-message{
    transition-timing-function: ease;
    transition-duration: 0.3s;
    font-size: 14px;
    padding: 15px 0px 45px;
    color: #aaa;
    opacity: 0;
    user-select: none;
  }

  .help-message-active{
    animation-name: help-message-flashing;
    animation-duration: 4s;
    animation-timing-function: ease;
    animation-fill-mode: forwards;
    animation-iteration-count: infinite;    
  }

  .current-room-title span{
    font-size: 22px;
    padding: 50px;
    color: #e1e1e1;
    text-shadow: 0px 0px 27px #000;
    user-select: none;
  }

  .rooms>div{
    position: relative;
    display: inline-block;
    padding: 0px 45px;
  }

  .rooms a, .rooms span{
    color: #9D9D9D;
    font-size: 13px;
    font-weight: 600;
    text-decoration: none;
    cursor: pointer;
    user-select: none;
  }

  a.num-room:hover + .title-room{
    opacity: 1;
  }

  .rooms .num-room{
    padding: 10px;
  }

  .rooms .title-room{
    position: absolute;
    bottom: 35px;
    left: 0px;
    width: 120px;
    transition-duration: 1s;
    transition-timing-function: ease;
    text-align: center;
    opacity: 0;
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
    cursor: pointer;
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

  .down-progress-bar{
    position: absolute;
    bottom: 0px;
    height: 4px;
    width: 0%;
    background: #9D9D9D;
  }

  .emergence-num-welcome{
    animation-name: emergence-num-welcome;
    animation-duration: 4s;
    animation-delay: .1s;
    animation-timing-function: ease;
    animation-fill-mode: forwards;
  }

  .hidden-num-welcome{
    animation-name: hidden-num-welcome;
    animation-duration: 1.5s;
    animation-timing-function: ease;
    animation-fill-mode: forwards;
  }

  .emergence-title-welcome{
    animation-name: emergence-title-welcome;
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
    animation-name: hidden-current-room-title;
    animation-duration: 1.0s;
    animation-timing-function: ease;
    animation-fill-mode: forwards;  
  }
  
  .hidden-title-welcome{
    animation-name: hidden-title-welcome;
    animation-duration: 3s;
    animation-timing-function: ease;
    animation-fill-mode: forwards;
  }

  .emergence-down-shadow{
    animation-name: emergence-down-shadow;
    animation-duration: 2s;
    animation-timing-function: ease;
    animation-fill-mode: forwards;
  }

  .emergence-num-room-active{
    animation-name: emergence-num-room-active;
    animation-duration: 4s;
    animation-timing-function: ease;
    animation-fill-mode: forwards;
  }

  @keyframes emergence-num-welcome{
    from{
      opacity: 0;
    }
    to{
      opacity: 1;
    }
  }

  @keyframes hidden-num-welcome{
    from{
      opacity: 1;
    }
    to{
      opacity: 0;
    }
  }

  @keyframes emergence-title-welcome {
    from{
      opacity: 0;
    }
    to{
      opacity: 1;
    }   
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

  @keyframes hidden-current-room-title {
    from{
      opacity: 1;
    }
    to{
      opacity: 0;
    }
  }

  @keyframes hidden-title-welcome {
    from{
      opacity: 1;
    }
    to{
      opacity: 0;
    }
  }

  @keyframes emergence-down-shadow {
    from{
      opacity: 0;
    }
    to{
      opacity: 1;
    }
  }

  @keyframes emergence-num-room-active {
    from{
      color: #9D9D9D;
    }
    to{
      color: #FFF;
      text-shadow: 0px 0px;
    }
  }

  @keyframes help-message-flashing {
    0%{
      opacity: .4;
      color: #9D9D9D;
    }
    50%{
      opacity: 1;
      color: #fff;
    }
    100%{
      opacity: .4;
      color: #9D9D9D;     
    }
  }
</style>
