<template>
  <div class="container" style="height:30px; width:500px; margin-bottom:17px">
    <div style="display: flex; justify-content: space-around; font-size:30px; color: white; border: 2px solid rgb(212, 212, 212)">
      <h1 style="width:270px; font-size:30px">{{room.name}}</h1>
      <a @click="enterRoom()" style="color:white; border-left: 2px solid rgb(212, 212, 212); padding-left:25px">Enter</a>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['room'],
    name: 'roomCard',
    data() {
      return {

      }
    },
    methods: {
      enterRoom() {
        console.log(this.room.name)
        this.$store.commit('SET_ROOM_NAME', this.room.name)
        // axios
        //   .patch(`http://localhost:3000/rooms/enter/${this.room.name}`, { player: localStorage.username })
        //   .then(({data}) => {
        //     console.log(`Player entered room ${data.name}`);
        //     this.$store.dispatch('fetchRooms')
        //     this.$router.push('/waiting')
        //   })
        //   .catch(function(err) {
        //     console.log(err);
        //   });
      },
    }
  }
</script>

<style>
h1 {
  font-family: "Reactor7";
  color: white;
}

a {
  font-family: "Reactor7";
  font-weight: bold;
  color: white;
}
</style>
