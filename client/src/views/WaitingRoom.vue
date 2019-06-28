<template>
  <div style="display:flex; justify-content:center; margin-top:300px;">
    <div style="display: flex; flex-direction:column">

      <div style="width:700px; height:250px; background-color: rgba(59,49,169,1);">
        <div style="display: flex; justify-content: space-around; border-bottom:2px solid rgb(212, 212, 212);">
          <p style="font-size:50px">{{roomName}}</p>
        </div>
        <div class="container" style="margin-top:20px;">
          <div v-for="player in players" :key="player" class="container" style="height:30px; width:500px; margin-bottom:17px">
            <div style="display: flex; justify-content: space-around; font-size:30px; color: white; border: 2px solid rgb(212, 212, 212)">
              <h1 style="width:270px; font-size:30px">{{player}}</h1>
              <h1>[Selected Hero]</h1>
            </div>
          </div>
        </div>
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
      players: []
    }
  },
  methods: {
    isExit() {
      this.wannaExit = true
    },
    exit() {
      // axios
      //   .patch(`http://localhost:3000/rooms/exit/${this.roomName}`, { player: localStorage.username })
      //   .then(({data}) => {
      //     console.log(`Player exit from room ${data.name}`);
      //     this.$store.dispatch('fetchRooms')
      //     this.$router.push('/rooms')
      //   })
      //   .catch(function(err) {
      //     console.log(err);
      //   });
      this.$store.commit('SET_ROOM_NAME', '')
      this.$router.push('/rooms')
    },
    fetchRooms() {
      
    }
  }
}
</script>

<style scoped>
p {
  font-family: "Reactor7";
  font-weight: bold;
  color: white;
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
