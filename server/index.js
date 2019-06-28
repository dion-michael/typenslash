var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

const cors = require('cors');

let rooms = [
  {
    name: 'tes',
    players: [],
    status: 'waiting'
  },
  {
    name: 'tes2',
    players: [],
    status: 'waiting'
  }
];

app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//findAll
app.get('/rooms', function(req, res) {
  res.status(200).json(rooms);
});

//create
app.post('/rooms', function(req, res) {
  rooms.push(req.body.room);
  io.emit('new-room-created', req.body.room.name);
});

//enter
app.patch('/rooms/enter/:roomName', function(req, res) {
  let room = rooms.find(room => {
    return room.name === req.params.roomName
  })

  room.players.push(req.body.player)
  console.log(rooms)
  res.status(200).json(rooms)
})

//exit
app.patch('/rooms/exit/:roomName', function(req, res) {
  let room = rooms.find(room => {
    return room.name === req.params.roomName
  })

  let newRoom = room.players.filter(player => {
    return player !== req.body.username
  })
  room = newRoom
  console.log(rooms)
  res.status(200).json(rooms)
})

server.listen(3000, function() {
  console.log('Listening on port', 3000);
});
