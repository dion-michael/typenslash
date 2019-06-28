<template>
  <div style="display:flex; justify-content:center; margin-top:50px;">
    <div style="display: flex; flex-direction:column">

      <div style="width:700px; height:510px; background-color: rgba(59,49,169,1);
        overflow: hidden;">
        <div style="display: flex; justify-content: space-around; border-bottom:2px solid rgb(212, 212, 212);">
          <p style="font-size:50px">RoomList</p>
          <div style="display: flex; width:200px"> 
            <input v-model="newRoomName" id="newRoom" type="text" autocomplete="off" maxlength="10" placeholder="New Room...">
            <p @click="createRoom" id="create">create</p>
          </div>
        </div>

        <div class="container" style="margin-top:20px; height:400px; width: 100%;
          overflow-y: scroll; padding-right: 17px; box-sizing: content-box;">
          <div v-if="isEmpty" id="empty" style="text-align: center; font-size:30px; margin-top:50px">
            <p>There are no rooms available</p>
            <p>Create some room first</p>
          </div>
          <RoomCard v-for="room in rooms" :key="room.name" :room="room"/>
        </div>
      </div>

      <div style="display: flex; justify-content: center">
        <p v-if="!wannaExit" @click="isExit" id="exitButton">exit</p>
        <div v-if="wannaExit" style="display: flex; justify-content: space-around; width: 250px">
          <p @click="exit" id="exitButton">yes</p>
          <p @click="wannaExit = false" id="exitButton">cancel</p>
        </div>
      </div>

    <img id="elizabeth" src="../assets/images/elizabeth2.png" alt="">
    <img id="elizabeth2" src="../assets/images/elizabeth2.png" alt="">
    
    <div id="info" style="display:flex; flex-direction:column; justify-content:center">
      <span id="hello">Hello,</span><br>
      <span id="username">{{username}} !!</span>
    </div>


    </div>
  </div>
</template>

<script>
import RoomCard from '@/components/RoomCard.vue'

export default {
  name: 'room',
  components: {
    RoomCard
  },
  data() {
    return {
      username: '',
      rooms: [],
      newRoomName: '',
      wannaExit: false,
    };
  },
  methods: {

    createRoom() {
      const newRoom = {
        name: this.newRoomName,
        players: this.$store.state.rooms,
        status: 'waiting'
      }
      this.newRoom = ''
      this.$store.commit('ADD_ROOM', newRoom)
    },

    isExit() {
      this.wannaExit = true
    },
    exit() {
      localStorage.removeItem('username')
      this.$router.push('/')
    }
  },
  mounted() {
    this.username = localStorage.username
    this.rooms = this.$store.state.rooms
  },
  computed: {
    isEmpty() {
      if (this.rooms.length === 0) return true
      else return false
    },
  }
};
</script>

<style scoped>
@font-face {
  font-family: "Reactor7";
  src: url("../assets/fonts/Reactor7.ttf");
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

#newRoom {
  font-family: "Reactor7";
  font-size: 30px;
  margin-top: 20px;
  width: 170px;
  height: 30px;
}

#create {
  background-color: rgba(59, 49, 169, 1);
  border: 2px solid rgb(212, 212, 212);
  height: 30px;
  margin-top: 20px;
  margin-left: 20px;
  padding: 2px;
  cursor: pointer;
}

#elizabeth {
  position: absolute;
  transform: scaleX(-1);
  transform:rotate(-40deg);
  width: 30%;
  z-index: -1;
  margin-left: -230px !important;
  margin-top: 50px;
}

#elizabeth2 {
  position: absolute;
  transform: scaleX(-1);
  transform:rotate(-40deg);
  width: 30%;
  z-index: -1;
  margin-left: 300px !important;
  margin-top: 90px;
}

#info {
  position: absolute;
  font-size: 40px;
  font-family: 'Reactor7';
  font-weight: bold;
  transform: scaleX(-1);
  transform:rotate(-50deg);
  width: 200px;
  margin-left: -280px;
  margin-top: 140px
}


#username {
 margin-top: -70px
}

p {
  font-family: "Reactor7";
  font-weight: bold;
  color: white;
}
</style>
