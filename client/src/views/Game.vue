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
              @click="player1.commands.push('forward','attack','backward'); selectionSound.play()"
            >attack</a>
            <a
              :disabled="turn === 'player2'"
              class="button is-dark"
              @click="player1.commands.push('forward','ulti','backward')"
            >ulti</a>
            <a
              :disabled="turn === 'player2'"
              class="button is-dark"
              @click="player1.commands.push('win')"
            >win</a>
            <a
              :disabled="turn === 'player2'"
              class="button is-dark"
              @click="player1.commands.push('dead')"
            >dead</a>
            <a :disabled="turn === 'player2'" class="button is-light" @click="execute">execute</a>
            <select :disabled="turn === 'player2'" v-model="player1.character">
              <option value="twob">2B</option>
              <option value="tidus">Tidus</option>
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
            </select>
            <a class="button is-light" @click="execute" :disabled="turn === 'player1'">execute</a>
            <a
              :disabled="turn === 'player1'"
              class="button is-dark"
              @click="player2.commands.push('forward','attack','backward')"
            >attack</a>
            <a
              :disabled="turn === 'player1'"
              class="button is-dark"
              @click="player2.commands.push('forward','ulti','backward')"
            >ulti</a>
            <a
              class="button is-dark"
              @click="player2.commands.push('win')"
              :disabled="turn === 'player1'"
            >win</a>
            <a
              class="button is-dark"
              @click="player2.commands.push('dead')"
              :disabled="turn === 'player1'"
            >dead</a>
            <section>
              <div class="box">
                <!-- <ul>
                  <li v-for="(command,i) in player2.commands" :key="i">{{command}}</li>
                </ul>-->
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
export default {
  data() {
    return {
      audio: new Audio("/09.mp3"),
      winsound: new Audio("/win.mp3"),
      selectionSound: new Audio("/selectSound.mp3"),
      muda: new Audio("/muda.MP3"),
      nani: new Audio("/nani.mp3"),
      tidus: {
        attack: {
          motion: "/tidus/attack.gif",
          delay: 500
        },
        idle: {
          motion: "/tidus/idle.gif",
          delay: 0
        },
        ulti: {
          motion: "/tidus/ulti.gif",
          delay: 10000
        },
        dead: {
          motion: "/tidus/dead.gif",
          delay: 2000
        },
        win: {
          motion: "/tidus/win-before.gif",
          delay: 1000
        },
        winafter: {
          motion: "/tidus/win-after.gif",
          delay: 0
        },
        forward: {
          motion: "/tidus/move.gif",
          delay: 500
        },
        backward: {
          motion: "/tidus/back.gif",
          delay: 500
        },
        sound: new Audio("/tidus-atk.wav")
      },
      twob: {
        attack: {
          motion: "/2B/attack.gif",
          delay: 4000
        },
        idle: {
          motion: "/2B/idle.gif",
          delay: 0
        },
        ulti: {
          motion: "/2B/ulti.gif",
          delay: 5000
        },
        dead: {
          motion: "/tidus/dead.gif",
          delay: 2000
        },
        win: {
          motion: "/2B/win-before.gif",
          delay: 1000
        },
        winafter: {
          motion: "/2B/win-after.gif",
          delay: 0
        },
        forward: {
          motion: "/tidus/move.gif",
          delay: 500
        },
        backward: {
          motion: "/tidus/back.gif",
          delay: 500
        },
        sound: new Audio("/tidus-atk.wav")
      },
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
      background: "/hacktiv.jpeg",
      turn: "player1"
    };
  },
  methods: {
    attack() {
      console.log("attack");
      this[this.turn].active = this[this[this.turn].character].attack.motion;
      this[this[this.turn].character].sound.play();
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          this[this.turn].active = this[this[this.turn].character].idle.motion;
          resolve("done");
        }, this[this[this.turn].character].attack.delay);
      });
    },
    forward() {
      console.log("forward");
      this[this.turn].active = this[this[this.turn].character].forward.motion;
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve("done");
        }, this[this[this.turn].character].forward.delay);
      });
    },
    backward() {
      console.log("backward");
      this[this.turn].active = this[this[this.turn].character].backward.motion;
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          this[this.turn].active = this[this[this.turn].character].idle.motion;
          resolve("done");
        }, this[this[this.turn].character].backward.delay);
      });
    },
    ulti() {
      // setTimeout(() => {
      //   this.muda.play();
      // }, 1000);
      // this.nani.currentTime = 0.1;
      this.nani.play();
      return new Promise(resolve => {
        console.log("ulti");
        setTimeout(() => {
          this[this.turn].active = this[this[this.turn].character].ulti.motion;
          this.muda.play();
        }, 3000);
        setTimeout(() => {
          this[this.turn].active = this[this[this.turn].character].idle.motion;
          resolve("done");
        }, this[this[this.turn].character].ulti.delay);
      });
    },
    dead() {
      return new Promise(resolve => {
        this[this.turn].active = this[this[this.turn].character].dead.motion;
        setTimeout(() => {
          console.log("dead");
          resolve("done");
        }, this[this[this.turn].character].dead.delay);
      });
    },
    win() {
      console.log("start win");
      this.audio.pause();
      this.winsound.play();
      return new Promise(resolve => {
        this[this.turn].active = this[this[this.turn].character].win.motion;
        setTimeout(() => {
          console.log("win");
          this[this.turn].active = this[
            this[this.turn].character
          ].winafter.motion;
          resolve("done");
        }, this[this[this.turn].character].win.delay);
      });
    },
    async execute() {
      for (let x = 0; x < this[this.turn].commands.length; x++) {
        await this[this[this.turn].commands[x]]();
      }
      this[this.turn].commands = [];
      this.turn === "player1"
        ? (this.turn = "player2")
        : (this.turn = "player1");
    }
  },
  mounted() {
    this[this.turn].character = "tidus";
    this[this.turn].active = this[this[this.turn].character].idle.motion;
    this.player2.character = "twob";
    this.player2.active = this[this[this.turn].character].idle.motion;
    this.audio.volume = 0.2;
    this.winsound.volume = 0.2;
    this.audio.play();
    this.muda.volume = 2;
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
  /* background-image: url("/bg-2.jpeg"); */
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  /* object-fit: cover; */
  background-repeat: none;
  transform: scaleX(-1);
}

.player2 {
  width: 100vw;
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
  /* background-image: url("/bg-2.jpeg"); */
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  object-fit: cover;
  background-repeat: none;
  /* transform: scaleX(-1); */
}
.box .button {
  margin-left: 5px;
}
</style>

