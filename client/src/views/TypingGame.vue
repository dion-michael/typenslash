<template>
  <div style="display: flex; flex-direction: column; align-items: center;">
    <div style="margin: 20px; margin-top: 30px; padding: 20px; background-color: #dfdfdf; width: 1120px; text-align: center;">
      <div width>
        <div style="display: flex; flex-direction: column; align-items: center;">
          <!-- Player 1 progress bar -->
          <div id="p1bar" class="progressbarcontainer">
            <div id="p1progress" class="progressbar indigo"></div>
          </div>
          <p id="displaysentence">
            {{game.sentence}}
          </p>
          <!-- Player 2 progress bar -->
          <div id="p2bar" class="progressbarcontainer">
            <div id="p2progress" class="progressbar orange"></div>
          </div>
        </div>
      </div>
      <input type="text" name="" id="input" v-model="game.inputWord"><br>
      <button style="padding: 0.2rem 0.5rem;" @click="start" v-show="isReady">START</button><br>
      <p style="background-color: aquamarine;">{{game.currentWord}}</p><br>
      <div style="display: flex; justify-content: space-evenly;">
        <p>My HP: <span class="bright">{{playerHp}}</span></p>
        <p>Enemy HP: <span class="bright">{{enemyHp}}</span></p>
      </div>
    </div>
    <div style="padding: 1rem; text-align: center;">
      <input type="text" name="" id="" placeholder="Enter your name" v-model="playerName">
      <button @click="ready">Ready</button>
    </div>
  </div>
</template>

<script>
const socket = io.connect('http://localhost:3000');

export default {
  data() {
    return {
      game: {
        sentence: "",
        currentWord: "",
        inputWord: "",
      },
      playerName: "",
      playerNum: 0,
      playerHp: 100,
      enemyHp: 100,
      sentenceWidth: 0,
      isReady: false,
    }
  },
  mounted() {
    this.playerName = this.$store.state.username;
    socket.on('gameStart', ob => {
      console.log('started')
      this.game.sentence = ob.sentence.join(' ');
      this.game.currentWord = ob.currentWord;
    });
    socket.on('gameUpdate', ob => {
      if(ob.player === this.playerNum) {
        //progress bar
        let calcwidth = Math.floor(this.sentenceWidth * ob.progress)
        document.querySelector('#p1progress').style.width = `${calcwidth}px`;
        this.game.sentence = ob.sentence.join(' ');
        this.game.currentWord = ob.currentWord;
      } else {
        let calcwidth = Math.floor(this.sentenceWidth * ob.progress)
        document.querySelector('#p2progress').style.width = `${calcwidth}px`;
      }
    });
    socket.on('newRound', ob => {
      if(ob.lastWinner === this.playerNum) {
        document.querySelector('#p1progress').style.width = `${this.sentenceWidth}px`;
        this.enemyHp -= ob.damage;
      } else {
        document.querySelector('#p2progress').style.width = `${this.sentenceWidth}px`;
        this.playerHp -= ob.damage;
      }
      // run animation
      setTimeout(() => {
        document.querySelector('#p1progress').style.width = `0px`;
        document.querySelector('#p2progress').style.width = `0px`;
        this.game.sentence = ob.sentence.join(' ');
        this.game.currentWord = ob.currentWord;
      }, 500);
    });
  },
  methods: {
    ready() {
      socket.emit('ready', this.playerName, num => {
        this.isReady = true;
        this.playerNum = num;
      });
    },
    start() {
      socket.emit('start', this.playerName)
    },
  },
  computed: {
    inputWord() {
      return this.game.inputWord;
    },
    sentence() {
      return this.game.sentence;
    }
  },
  watch: {
    inputWord(str) {
      if(str === (this.game.currentWord + ' ')) {
        console.log(`%cMatched: ${str}!`, 'color: #07b80a')
        socket.emit('correctWord', this.playerNum) 
        this.game.inputWord = '';
      }
    },
    sentence(str) {
      if(str.length > 5) {
        console.log('setting width')
        setTimeout(() => {
          this.sentenceWidth = document.querySelector('#displaysentence').offsetWidth;
          document.querySelector('#p1bar').style.width = `${this.sentenceWidth}px`;
          document.querySelector('#p2bar').style.width = `${this.sentenceWidth}px`;
        }, 40);
      }
    },
  }
}
</script>

<style scoped>
* {
    margin: 0;
    padding: 0;
    font-family: "Roboto Mono", Consolas, SFMono-Regular, Menlo, Monaco, "Ubuntu Mono", monospace;
    font-size: 1.1rem;
  }  
  input#input {
    margin: 1rem 0;
    padding: 0.3rem 0.8rem;
    min-width: 540px;
  }
  .bright {
    background-color: #e9be6e;
  }
  #displaysentence {
    display: inline-block;
    margin: 0;
    padding: 0;
    margin-bottom: 1px;
  }
  .progressbarcontainer {
    display: inline-block;
    position: relative;
    height: 18px;
    margin: 0;
    padding: 0;
    background: transparent;
  }
  .progressbar {
    position: absolute;
    height: 18px;
    background-color: black;
  }
  .indigo {
    background-color: #7d09ca;
  }
  .orange {
    background-color: #ec8a1a;
  }
</style>

