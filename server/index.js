var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

const cors = require('cors');

let rooms = [];

app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/rooms', function(req, res) {
  res.status(200).json(rooms);
});

app.post('/rooms', function(req, res) {
  rooms.push(req.body.roomName);
  io
    .of('/rooms')
    .emit('new-room-created', req.body.roomName);
});

server.listen(3000, function() {
  console.log('Listening on port', 3000);
});
