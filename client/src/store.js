import Vue from 'vue'
import Vuex from 'vuex'
import { stat } from 'fs';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    username: '',
    rooms: [],
    roomName: '',
    selectedHero: ''
  },
  mutations: {
    SET_ROOM_NAME (state, roomName) {
      state.roomName = roomName
    },
    SET_HERO (state, heroName) {
      state.selectedHero = heroName
    },
    ADD_ROOM (state, newRoom) {
      state.rooms.push(newRoom)
      console.log(state.rooms)
    },
    SET_NAME (state, username) {
      state.username = username
    },
    FETCH_ROOMS (state, rooms) {
      state.rooms = rooms
      console.log(state.rooms)
    }
  },
  actions: {
    // fetchRooms(context) {
    //   axios
    //     .get('http://localhost:3000/rooms')
    //     .then(({data}) => {
    //       console.log(data)
    //       context.commit('FETCH_ROOMS', data)
    //     })
    //     .catch(function(err) {
    //       console.log(err);
    //     })
    // }
  }
})
