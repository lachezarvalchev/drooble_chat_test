var events = require('events');
var util = require('util');
var dateFormat = require('dateformat');
var interval = 2000;

var chatMessagesEmitter = events.EventEmitter;

var chatMessages = function() {
  var messagesStack = [];
  var timeOut = null;
  var self = this;

  // Event listener on 'add message'.
  this.on('add message', function(message) {
    console.log('New message added.');
    if (timeOut) {
      clearTimeout(timeOut);
    }

    var date = new Date();
    var messageObj = {
      'message': message,
      'date': dateFormat(date, 'dd-mm-yyyy hh:mm:ss')
    };
    messagesStack.push(messageObj);

    if (messagesStack.length === 5) {
      pushMessages();
    }
    else {
      timeOut = setTimeout(pushMessages, interval);
    }
  });

  // Emit event 'push messages'.
  var pushMessages = function() {
    var messageToSend = messagesStack;
    messagesStack = [];
    self.emit('push messages', messageToSend);
  }
};

// Extend chatMessagesEmitter with chatMessages.
util.inherits(chatMessages, chatMessagesEmitter);

// Export chatMessages so that it could be accessible from outside.
module.exports = chatMessages;
