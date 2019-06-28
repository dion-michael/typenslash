const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const cors = require('cors');
const sentences = require('./sentences');

function getSentence() {
  let index =  (Math.floor(Math.random()*110)) // 0 to 109
  return sentences[index];
}

let game = {
  started: false,
  round: 0,
  currentSentence: [],
  currentSentenceStr: '',
  playerCount: 0,
  players: [],
  // players: [{
  //   name: '', 
  //   wordIndex: 0, // index of word in sentence array
  // }],             // hp is calculated in client
  reset: () => {
    game.started = false;
    game.round = 0;
    game.currentSentence = [];
    game.currentSentenceStr = '';
    game.playerCount = 0;
    game.players = [];
  },
  nextRound: () => {
    game.round ++;
    let temp = getSentence();
    game.currentSentence = temp.split(' ');
    game.currentSentenceStr = temp;
    game.players.forEach(player => {
      player.wordIndex = 0;
    })
  },
};

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', function(req, res){
  res.send('<h1>Hello world</h1>');
});

app.get('/reset', function(req, res) {
  game.reset();
  console.log('game reset!')
  res.status(200).end();
});

io.on('connection', function(socket){
  console.log('----- Client connected! -----');

  socket.on('ready', (name, callback) => {
    if(game.playerCount < 2) {
      game.playerCount ++;
      game.players.push({
        name: `${name.toUpperCase()} (player ${game.playerCount})`,
        wordIndex: 0,
      });
      
      console.log(game.players)
      callback(game.playerCount);
    }
  });

  socket.on('start', () => {
    if(!game.started) {
      game.started = true;
      game.round = 1;
      let temp = getSentence();
      game.currentSentence = temp.split(' ');
      game.currentSentenceStr = temp;
      io.emit('gameStart', {
        sentence: game.currentSentence,
        currentWord: game.currentSentence[0],
      })
    }
  })

  socket.on('correctWord', num => {
    game.players[num - 1].wordIndex ++;
    let newIndex = game.players[num - 1].wordIndex;
    
    if(newIndex === game.currentSentence.length) {
      console.log(`NewIndex: ${newIndex}`)
      // Next round
      game.nextRound();
      io.emit('newRound', {
        lastWinner: num,
        damage: newIndex,
        sentence: game.currentSentence,
        currentWord: game.currentSentence[0],
      })
    } else {
      // Show progress as percentage of sentence
      let full = game.currentSentenceStr.length;
      let part = 0;
      for(let i = 0; i < newIndex; i ++) {
        part += (game.currentSentence[i].length + 1);
      }
      io.emit('gameUpdate', {
        player: num,
        progress: (part / full), // 0 - 0.99
        sentence: game.currentSentence,
        currentWord: game.currentSentence[newIndex],
      })
    }
  })

});

http.listen(3000, function(){
  console.log('listening on port:3000');
});
