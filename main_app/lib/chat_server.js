var socketio = require('socket.io')
, guestNumber = 1
, nickNames = {}
, namesUsed = []
, currentRoom = {}
, roomList = [];

exports.listen = function(server) {
    io = socketio.listen(server);
    io.set('log level', 1);
    
    io.sockets.on('connection', function (socket) {
                  guestNumber = assignGuestName(socket, guestNumber, nickNames, namesUsed);
                  createRoom(socket, '默认聊天室');
                  
                  handleMessageBroadcasting(socket, nickNames);
                  handleNameChangeAttempts(socket, nickNames, namesUsed);
                  handleRoomJoining(socket);
                  socket.on('rooms', function() {
                            socket.emit('rooms', roomList);
                            });
                  handleRoomCreating(socket);
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

function joinRoom(socket, room) {
    socket.join(room);
    currentRoom[socket.id] = room;
    
    socket.emit('joinResult', {room: room});
    socket.broadcast.to(room).emit('message', {
                                   text: nickNames[socket.id] + ' 加入 ' + room + '.'
                                   });
    
    var usersInRoom = io.sockets.clients(room);
    if (usersInRoom.length > 1) {
        var usersInRoomSummary = '当前在 ' + room + '的人有: ';
        for (var index in usersInRoom) {
            var userSocketId = usersInRoom[index].id;
            if (userSocketId != socket.id) {
                if (index > 0) {
                    usersInRoomSummary += ', ';
                }
                usersInRoomSummary += nickNames[userSocketId];
            }
        }
        usersInRoomSummary += '.';
        socket.emit('message', {text: usersInRoomSummary});
    }
}
function createRoom(socket, room) {
    socket.join(room);
    currentRoom[socket.id] = room;
    console.log('*******room:'+room);
    console.log('*******roomList:'+roomList);
    console.log('*******roomList.indexOf(room):'+roomList.indexOf(room));
    if(roomList.indexOf(room) == -1){
        roomList.push(room);
    }else{
        socket.emit('creatRoom', {
                    text: room + '已经存在，请重新创建.'
                    });
    }
    
    
    socket.emit('createResult', {room: room});
    socket.broadcast.to(room).emit('message', {
                                   text: nickNames[socket.id] + ' 加入 ' + room + '.'
                                   });
    
    var usersInRoom = io.sockets.clients(room);
    if (usersInRoom.length > 1) {
        var usersInRoomSummary = '当前在 ' + room + '的人有: ';
        for (var index in usersInRoom) {
            var userSocketId = usersInRoom[index].id;
            if (userSocketId != socket.id) {
                if (index > 0) {
                    usersInRoomSummary += ', ';
                }
                usersInRoomSummary += nickNames[userSocketId];
            }
        }
        usersInRoomSummary += '.';
        socket.emit('message', {text: usersInRoomSummary});
    }
}

function handleMessageBroadcasting(socket, nickNames) {
    socket.on('message', function (message) {
              socket.broadcast.to(message.room).emit('message', {
                                                     name: nickNames[socket.id],
                                                     text: message.text
                                                     });
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
