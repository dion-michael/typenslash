<template>
  <div class="about">
    <div>
      <img class="background" :src="background">
      <img class="player1" :src="player1.active">
      <img class="player2" :src="player2.active">
      <div class="level is-overlay" style="height: 100px">
        <!-- PLAYER 1 -->
        <div class="level-item">
          <div
            class="box has-text-left"
            :class="{'animated fadeOutLeft': turn === 'player2', 'animated fadeInLeft': turn === 'player1'}"
          >
            <a
              :disabled="turn === 'player2'"
              class="button is-dark"
              @mouseleave="selectionSound.pause(); selectionSound.currentTime=2"
              @click="attack(); selectionSound.play()"
            >attack</a>
            <a :disabled="turn === 'player2'" class="button is-dark" @click="ulti()">ulti</a>
            <a :disabled="turn === 'player2'" class="button is-dark" @click="win()">win</a>
            <a :disabled="turn === 'player2'" class="button is-dark" @click="dead()">dead</a>
            <!-- <a :disabled="turn === 'player2'" class="button is-light" @click="execute">execute</a> -->
            <select :disabled="turn === 'player2'" v-model="player1.character">
              <option value="twob">2B</option>
              <option value="tidus">Tidus</option>
              <option value="sora">Sora</option>
              <option value="dio">Dio</option>
              <option value="sephiroth">Sephiroth</option>
              <option value="noctis">Noctis</option>
            </select>
          </div>
        </div>
        <!-- TIME -->
        <div class="level-item">
          <div class="box is-dark">
            <p class="title">80</p>
          </div>
        </div>
        <!-- PLAYER 2 -->
        <div class="level-item">
          <div
            class="box has-text-right"
            :class="{'animated fadeOutRight': turn === 'player1', 'animated fadeInRight': turn === 'player2'}"
          >
            <select v-model="player2.character" :disabled="turn === 'player1'">
              <option value="twob">2B</option>
              <option value="tidus">Tidus</option>
              <option value="sora">Sora</option>
              <option value="dio">Dio</option>
              <option value="sephiroth">Sephiroth</option>
              <option value="noctis">Noctis</option>
            </select>
            <!-- <a class="button is-light" @click="execute" :disabled="turn === 'player1'">execute</a> -->
            <a :disabled="turn === 'player1'" class="button is-dark" @click="attack()">attack</a>
            <a :disabled="turn === 'player1'" class="button is-dark" @click="ulti()">ulti</a>
            <a class="button is-dark" @click="win()" :disabled="turn === 'player1'">win</a>
            <a class="button is-dark" @click="dead()" :disabled="turn === 'player1'">dead</a>
            <section>
              <div class="box">
                <ul>
                  <li v-for="(command,i) in player2.commands" :key="i">{{command}}</li>
                </ul>
                <progress class="progress" value="15" max="100">15%</progress>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { tidus, twob, dio, noctis, sephiroth, sora } from "../Characters.js";
export default {
  name: "Game",
  data() {
    return {
      audio: new Audio("/09.mp3"),
      winsound: new Audio("/win.mp3"),
      selectionSound: new Audio("/selectSound.mp3"),
      muda: new Audio("/muda.MP3"),
      nani: new Audio("/nani.mp3"),
      tidus,
      twob,
      dio,
      noctis,
      sephiroth,
      sora,
      player1: {
        active: "",
        commands: [],
        character: ""
      },
      player2: {
        active: "",
        commands: [],
        character: ""
      },
      background: "/batbg.png",
      turn: "player1"
    };
  },
  methods: {
    attack() {
      console.log("atk");
      this[this.turn].active = this[this[this.turn].character].attack.motion;
      this[this[this.turn].character].attack.sound.play();
      setTimeout(() => {
        this[this.turn].active = this[this[this.turn].character].idle.motion;
        this.turn === "player1"
          ? (this.turn = "player2")
          : (this.turn = "player1");
      }, this[this[this.turn].character].attack.delay);
    },
    ulti() {
      this.nani.play();
      this[this.turn].active = this[this[this.turn].character].ulti.motion;
      setTimeout(() => {
        this[this.turn].active = this[this[this.turn].character].idle.motion;
        this.turn === "player1"
          ? (this.turn = "player2")
          : (this.turn = "player1");
      }, this[this[this.turn].character].ulti.delay);
    },
    dead() {
      this[this.turn].active = this[this[this.turn].character].dead.motion;
      setTimeout(() => {
        this.turn === "player1"
          ? (this.turn = "player2")
          : (this.turn = "player1");
      }, this[this[this.turn].character].dead.delay);
    },
    win() {
      console.log("start win");
      this.audio.pause();
      this.winsound.play();
      this[this.turn].active = this[this[this.turn].character].win.motion;
      setTimeout(() => {
        console.log("win");
        this[this.turn].active = this[
          this[this.turn].character
        ].winafter.motion;
        this.turn === "player1"
          ? (this.turn = "player2")
          : (this.turn = "player1");
      }, this[this[this.turn].character].win.delay);
    }
  },
  mounted() {
    // this.executeOne('attack')
    this.player1.character = "noctis";
    this.player1.active = this[this[this.turn].character].idle.motion;
    this.player2.character = "noctis";
    this.player2.active = this[this[this.turn].character].idle.motion;
    this.audio.volume = 0.2;
    this.winsound.volume = 0.2;
    this.audio.play();
    this.muda.volume = 1;
    this.selectionSound.currentTime = 3;
  },
  watch: {
    "player2.character"() {
      console.log("masuk");
      this.player2.active = this[this.player2.character].idle.motion;
    },
    "player1.character"() {
      this.player1.active = this[this.player1.character].idle.motion;
    }
  }
};
</script>

<style scoped>
.player1 {
  width: 100%;
  height: 100%;
  position: fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  background-repeat: none;
  transform: scaleX(-1);
}

.player2 {
  width: 100%;
  height: 100%;
  position: fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  background-repeat: none;
}
.columns {
  position: fixed;
}

.box {
  position: relative;
}

.background {
  width: 100vw;
  height: 100%;
  position: fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  object-fit: cover;
  background-repeat: none;
}
.box .button {
  margin-left: 5px;
}
</style>

