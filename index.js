var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var chatMessages = require('./chat_messages.js');

app.use('/css', express.static(__dirname + '/public/stylesheets'));
app.use('/scripts', express.static(__dirname + '/public/javascripts'));

http.listen(3000, function() {
  console.log('Server listening on *:3000');
});

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
  console.log('a user connected');
  var chatMessage = new chatMessages();
  socket.on('chat message', function(message) {
    chatMessage.emit('add message', message);
  });

  chatMessage.on('push messages', function(messages) {
    io.emit('chat message', messages);
  });

  socket.on('disconnect', function() {
    console.log('a user disconnected');
  });
});
