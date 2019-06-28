<template>
  <div style="display:flex; justify-content:center; margin-top:30px;">
    <div style="display: flex; flex-direction:column">

      <div style="width:700px; height:250px; background-color: rgba(59,49,169,1);">
        <div style="display: flex; justify-content: space-around; border-bottom:2px solid rgb(212, 212, 212);">
          <img src="@/assets/images/chibi-dio.png" alt="" srcset="">
          <img src="@/assets/images/chibi-noctis.png" alt="" srcset="">
          <img src="@/assets/images/chibi-sora.png" alt="" srcset="">
          <img src="@/assets/images/chibi-sephiroth.png" alt="" srcset="">
        </div>
        <div class="container" style="margin-top:10px;">
          <div class="control" style="display: flex; justify-content: space-around;">
            <label class="radio">
              <input v-model="hero" type="radio" value="dio">
              Dio Brando
            </label>
            <label class="radio">
              <input v-model="hero" type="radio" value="noctis">
              Noctis Lucis Caelum
            </label>
            <label class="radio">
              <input v-model="hero" type="radio" value="sora">
              Sora
            </label>
            <label class="radio">
              <input v-model="hero" type="radio" value="sephiroth">
              Sephiroth
            </label>
          </div>
        </div>
      </div>

      <div style="width:700px; height:250px; background-color: rgba(59,49,169,1); margin-top:20px">
        <div style="display: flex; justify-content: space-around; border-bottom:2px solid rgb(212, 212, 212);">
          <p style="font-size:50px">{{roomName}}</p>
        </div>
        <div class="container" style="margin-top:20px;">
          <div v-for="player in players" :key="player" class="container" style="height:30px; width:500px; margin-bottom:17px">
            <div style="display: flex; justify-content: space-between; font-size:30px; color: white; border: 2px solid rgb(212, 212, 212); margin-right:10px; margin-left:10px">
              <h1 style="width:270px; font-size:30px">{{player}}</h1>
              <h1>[{{hero}}]</h1>
            </div>
          </div>
        </div>
      </div>

      <div @click="enterGame" id="goFight" class="animated infinite pulse">
        <p>FIGHT!!</p>
      </div>

      <div @click="reset" id="reset">
        <p>RESET SOCKET!!</p>
      </div>

      <div style="display: flex; justify-content: center">
        <p v-if="!wannaExit" @click="isExit" id="exitButton">exit</p>
        <div v-if="wannaExit" style="display: flex; justify-content: space-around; width: 250px">
          <p @click="exit" id="exitButton">yes</p>
          <p @click="wannaExit = false" id="exitButton">cancel</p>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      roomName: this.$store.state.roomName,
      wannaExit: false,
      players: [localStorage.username],
      hero: 'select a hero'
    }
  },
  methods: {
    enterGame () {
      this.$router.push('/game')
    },
    isExit() {
      this.wannaExit = true
      console.log(this.hero)
    },
    exit() {
      this.$store.commit('SET_ROOM_NAME', '')
      this.$router.push('/rooms')
    },
    reset() {
      axios
        .get(`http://localhost:3000/reset`)
        .then(({data}) => {
          console.log('game reseted')
        })
        .catch(function(err) {
          console.log(err);
        });
    }
  }
}
</script>

<style scoped>

img {
  width:150px;
  height:200px
}

p {
  font-family: "Reactor7";
  font-weight: bold;
  color: white;
}

label {
  font-family: "Reactor7";
  font-weight: bold;
  color: white;
  font-size: 25px
}

#goFight {
  background-color: rgba(59, 49, 169, 1);
  position: absolute;
  width:200px;
  height:75px;
  text-align: center;
  font-size: 50px;
  margin-left: 770px;
  margin-top: 350px;
  cursor: pointer
}

#reset {
  background-color: red;
  position: absolute;
  width:200px;
  height:75px;
  text-align: center;
  font-size: 20px;
  margin-left: -270px;
  margin-top: 350px;
  cursor: pointer
}

#exitButton {
  margin-top: 30px;
  background-color: rgba(59, 49, 169, 1);
  border: 5px solid rgb(212, 212, 212);
  width: 100px;
  text-align: center;
  cursor: pointer;
  font-size: 30px;
}
</style>
