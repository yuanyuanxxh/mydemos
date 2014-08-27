var Chat = function(socket) {
  this.socket = socket;
};

Chat.prototype.sendMessage = function(room, text) {
  var message = {
    room: room,
    text: text
  };
  this.socket.emit('message', message);
};

Chat.prototype.changeRoom = function(room) {
  this.socket.emit('join', {
    newRoom: room,
  });
};

Chat.prototype.createRoom = function(room) {
    this.socket.emit('create', {
        newRoom: room,
    });
};
Chat.prototype.singleChat = function(name) {
    this.socket.emit('singleChat', {
                     name: name,
                     });
};

Chat.prototype.processCommand = function(command) {
  var words = command.split(' ')
    , command = words[0].substring(1, words[0].length).toLowerCase()
    , message = false;

  switch(command) {
    case 'join':
      words.shift();
      var room = words.join(' '); 
      this.changeRoom(room);
      break;
    case 'creat':
      words.shift();
      var room = words.join(' ');
      this.createRoom(room);
      break;
    case 'nick':
      words.shift();
      var name = words.join(' ');
      this.socket.emit('nameAttempt', name);
      break;
    case 'singlechat':
       words.shift();
       var name = words.join(' ');
       this.singleChat(name);
       break;
    default:
      message = '请您输入正确的命令';
      break;
  }

  return message;
};
