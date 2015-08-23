$(document).ready(function() {
  var socket = io();

  $('form').submit(function() {
    socket.emit('chat message', $('#m').val());
    $('#m').val('');
    return false;
  });

  socket.on('chat message', function(messages) {
    messages.forEach(function(message) {
      $('#messages').append($('<li>').text(message.date + ': ' + message.message));
    })
  })
});
