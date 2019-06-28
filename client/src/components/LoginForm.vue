<template>
  <div v-if="startBlink" class="animated fadeIn">
    <div id="logo"> 
      <p class="animated fadeIn slow" id="title">Type n' Slash</p>
      <p class="animated fadeIn slow" id="tagline">kill 'em as fast as you type</p>
      <img class="animated fadeInDownBig faster delay-1s" id="img" src="@/assets/images/claw.png" width="20%">
    </div>
    <div v-if="canPlay" @click="goToRoom" id="playButton" style="padding:5px">
      <p style="margin-top:2px; font-size:25px">
        play
      </p>
    </div>
    <input v-model="username" class="animated fadeIn delay-2s" id="username" autocomplete="off" type="text" maxlength="7" placeholder="Name...">
    <div v-if='blink' class="">
      <h1 id="info">who are</h1>
      <h1 id="info2">you ?</h1>
    </div>
    <img class="animated fadeIn delay-2s" id="loginBox" src="@/assets/images/loginBox.png" alt="" width="60%" srcset="">
    <img id="elizabeth" src="@/assets/images/elizabeth.png" alt="" sizes="" srcset="">
  </div>
</template>

<script>

export default {
  data() {
    return {
      username: '',
      blink: true
    }
  },
  methods: {
    blinking(input) {
      this.blink = input
      setTimeout(() => {
        this.blinking(!input)
      }, 500)
    },
    goToRoom() {
      localStorage.setItem('username', this.username)
      this.$store.commit('SET_NAME', this.username)
      this.$router.push('/rooms')
    }
  },
  computed: {
    canPlay() {
      if (this.username !== '') return true
      else return false
    },

    startBlink() {
      setTimeout(() => {
        this.blinking(false)
      }, 2500)
      return true
    }
  }
}
</script>

<style scoped>
@font-face {
  font-family: 'Super Legend Boy';
  src: url('../assets/fonts/PressStart2P.ttf');
}

@font-face {
  font-family: "Reactor7";
  src: url("../assets/fonts/Reactor7.ttf");
}

#logo {
  position: absolute;
  margin-top: 120px;
  margin-left: 120px;
  color: black;
}

#img {
  position: relative;
  z-index: -1;
  margin-left: 400px;
  margin-top: -220px
}

#title {
  font-family: 'Super Legend Boy';
  font-size: 50px;
  z-index: 1;
}

#tagline {
  font-family: 'Reactor7';
  font-size: 40px;
  margin-left: 10px;
  margin-top: -15px
}

input {
  background-color:transparent;
  border: 0px solid;
}

#username {
  outline: none; 
  position: absolute; 
  margin-top: 420px; 
  margin-left: 135px; 
  z-index:1; 
  font-size:90px;
  font-family: 'Super Legend Boy'; 
  width:700px
}

#loginBox {
  position: absolute; 
  margin-top:380px; 
  margin-left:70px
}

#elizabeth {
  float: right; 
  margin-right:60px; 
  margin-top:150px
}

#info {
  font-size: 22px;
  position: absolute;
  color: #000;
  top: 240px;
  right:340px;
  transform:rotate(-15deg);
  font-family: 'Super Legend Boy'
}

#info2 {
  font-size: 33px;
  position: absolute;
  color: #000;
  top: 275px;
  right:323px;
  transform:rotate(-15deg);
  font-family: 'Super Legend Boy'
}

#playButton {
  position: absolute;
  margin-top: 300px;
  margin-left: 400px;
  width: 150px;
  height: 50px;
  background-color: rgba(59, 49, 169, 1);
  color: white;
  font-family: 'Super Legend Boy';
  text-align: center;
  cursor: pointer;
}

</style>
