var socketio = require('socket.io')
  , guestNumber = 1
  , nickNames = {}
  , namesUsed = []
  , currentRoom = {}
  , roomList = []
  , socketList = {}
  , joinNameList = [];


exports.listen = function(server) {
  io = socketio.listen(server);
  io.set('log level', 1);

  io.sockets.on('connection', function (socket) {
    guestNumber = assignGuestName(socket, guestNumber, nickNames, namesUsed);
    createRoom(socket, '默认聊天室');
    console.log("socketId:"+socket.id);
    socketList[socket.id] = socket;
      console.log("socketList:"+socketList);
    handleMessageBroadcasting(socket, nickNames);
    handleNameChangeAttempts(socket, nickNames, namesUsed);
    handleRoomJoining(socket);
    socket.on('rooms', function() {

    socket.emit('rooms',roomList);
    });
    handleRoomCreating(socket);
    handleSingleChatting(socket);
    handleClientDisconnection(socket, nickNames, namesUsed);
  });
};

function assignGuestName(socket, guestNumber, nickNames, namesUsed) {
  var name = 'Guest' + guestNumber;
  nickNames[socket.id] = name;
  socket.emit('nameResult', {
    success: true,
    name: name
  });
  namesUsed.push(name);
  return guestNumber + 1;
}
function findClientsSocketByRoomId(roomId) {
    var res = []
        , room = io.sockets.adapter.rooms[roomId];
    if (room) {
        for (var id in room) {
            res.push(io.sockets.adapter.nsp.connected[id]);
        }
    }
    return res;
}
function joinRoom(socket, room) {
  socket.join(room);
  currentRoom[socket.id] = room;
    
  socket.emit('joinResult', {room: room});
  socket.broadcast.to(room).emit('message', {
    text: nickNames[socket.id] + ' 加入 ' + room + '.'
  });


    //var usersInRoom = io.sockets.clients(room);
    var usersInRoom = findClientsSocketByRoomId(room);
    console.log("usersInRoom:"+usersInRoom);
 // var usersInRoom = io.sockets.clients(room);
  if (usersInRoom.length > 1) {
    var usersInRoomSummary = '当前在 ' + room + '的人有: ';

    for (var index in usersInRoom) {
      var userSocketId = usersInRoom[index].id;
      if (userSocketId != socket.id) {
        if (index > 0) {
          usersInRoomSummary += ', ';
        }
        usersInRoomSummary += nickNames[userSocketId];
        joinNameList.push(nickNames[userSocketId]);
      }
    }
      console.log("joinRoomNames: "+ joinNameList);
    usersInRoomSummary += '.';
    socket.emit('message', {text: usersInRoomSummary});
  }
    for(var i = 0; i < roomList.length; i++){
        console.log("nameList4: "+joinNameList);
        if(roomList[i].room == room){
            console.log("nameList7: "+joinNameList);
            roomList[i].names = joinNameList;
            joinNameList = [];
        }
    }
}
Array.prototype.indexOf=function(v)
{
    for(var i=0, n=this.length; i<n; i++)
    {
        if(this[i]==v) return i;
    }
    return -1;
};
Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};
function joinFriend(socket,name){
    console.log('socket1:'+socket);

    socket.emit('singleTalk', {name: name});
    socket.emit('message', {text: '开始和'+name+'聊天吧～'});
}
function createRoom(socket, room) {
    socket.join(room);
    currentRoom[socket.id] = room;
    console.log('*******room:'+room);
    console.log('*******roomList:'+roomList);

    
    socket.emit('createResult', {room: room});
    socket.broadcast.to(room).emit('message', {
                                   text: nickNames[socket.id] + ' 加入 ' + room + '.'
                                   });

   /* var clients = io.sockets.adapter.rooms[room];
    console.log("clients:"+clients);
    for (var clientId in clients) {
        console.log("io.sockets.connected[clientId]:"+io.sockets.connected[clientId]);
    }

    //var usersInRoom = io.sockets.clients(room);
    var usersInRoom = clients;

*/
    var usersInRoom = findClientsSocketByRoomId(room);
    var nameList = [];
    if (usersInRoom.length > 1) {
        var usersInRoomSummary = '当前在 ' + room + '的人有: ';
        for (var index in usersInRoom) {
            var userSocketId = usersInRoom[index].id;
            if (userSocketId != socket.id) {
                if (index > 0) {
                    usersInRoomSummary += ', ';
                }
                usersInRoomSummary += nickNames[userSocketId];
                nameList.push(nickNames[userSocketId]);
            }
        }
        joinNameList = nameList;
        console.log("nameList1: "+joinNameList);
        usersInRoomSummary += '.';
        socket.emit('message', {text: usersInRoomSummary});
    }
    console.log("nameList2: "+joinNameList);
    var count = 0;
    for(var i = 0; i < roomList.length; i++){
        console.log("nameList4: "+joinNameList);
        if(roomList[i].room == room){
            console.log("nameList7: "+joinNameList);
            roomList[i].names = joinNameList;
            joinNameList = [];
            count ++;
        }
    }
    if(count == 0){
        // roomList.push(room);
        var roomObj = {};
        roomObj.room = room;
        console.log("nameList5: "+joinNameList);
        roomObj.names = joinNameList;
        console.log("nameList6: "+joinNameList);
        roomList.push(roomObj);
    }else{
        socket.emit('creatRoom', {
                    text: room + '已经存在，请重新创建.'
                    });
    }
    
    
}

function handleMessageBroadcasting(socket, nickNames) {
  socket.on('message', function (message) {
    console.log("roomList.indexOf(message.room):"+roomList.indexOf(message.room));
    console.log("roomList:"+roomList);
    var count = 0;
    for(var i = 0; i < roomList.length; i++){
          if(roomList[i].room == message.room){
              console.log("roomList[i].room:"+roomList[i].room);
              socket.broadcast.to(message.room).emit('message', {
                  name: nickNames[socket.id],
                  room: message.room,
                  text: message.text
              });
          count ++;
          }
    }
    if(count == 0){
        var socketId = '';
        for(var s in nickNames)
        {
            console.log("nickNames[s]:"+nickNames[s]);
            if(nickNames[s] == message.room) {
                socketId = s;
            }
        }
        if(socketId != ''){
            io.sockets.connected[socketId].emit('message', {
                name: nickNames[socket.id],
                single: true,
                text: message.text
            });
        }

    }

  });
}

function handleNameChangeAttempts(socket, nickNames, namesUsed) {
  socket.on('nameAttempt', function(name) {
    if (name.indexOf('Guest') == 0) {
      socket.emit('nickResult', {
        success: false,
        message: '昵称不能以’Guest‘开头.'
      });
    } else {
      if (namesUsed.indexOf(name) == -1) {
        var previousName = nickNames[socket.id];
        var previousNameIndex = namesUsed.indexOf(previousName);
        namesUsed.push(name);
        nickNames[socket.id] = name;
        delete namesUsed[previousNameIndex];
        socket.emit('nameResult', {
          success: true,
          name: name
        });
        socket.broadcast.to(currentRoom[socket.id]).emit('message', {
          text: previousName + ' 将昵称更改为 ' + name + '.'
        });
      } else {
        socket.emit('nickResult', {
          success: false,
          message: '该昵称已存在，请使用其他昵称.'
        });
      }
    }
  });
}

function handleRoomJoining(socket) {
  socket.on('join', function(room) {
    socket.leave(currentRoom[socket.id]);
    joinRoom(socket, room.newRoom);
  });
}
function handleSingleChatting(socket) {
    console.log('socket2:'+socket);
    socket.on('singleChat', function(name) {
              console.log('name:'+name.name);
             // socket.leave(currentRoom[socket.id]);
              joinFriend(socket, name.name);
              });
}
function handleRoomCreating(socket) {
    socket.on('create', function(room) {
        socket.leave(currentRoom[socket.id]);
        createRoom(socket, room.newRoom);
    });
}

function handleClientDisconnection(socket, nickNames, namesUsed) {
  socket.on('disconnect', function() {
    var nameIndex = namesUsed.indexOf(nickNames[socket.id]);
    delete namesUsed[nameIndex];
    delete nickNames[socket.id];
  });
}
