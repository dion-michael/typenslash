import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Room from './views/Room.vue'
import WaitingRoom from './views/WaitingRoom.vue'
import TypingGame from './views/TypingGame.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/rooms',
      name: 'roomList',
      component: Room
    },
    {
      path: '/waiting',
      name: 'waitingRoom',
      component: WaitingRoom
    },
    {
      path: '/game',
      name: 'game',
      component: TypingGame
    }
  ]
})
