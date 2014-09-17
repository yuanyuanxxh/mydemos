var socket = io.connect();
function GetDateT()
{
    var d,s;
    d = new Date();
    s = (d.getMonth() + 1) + "-";//取月份
    s += d.getDate() + " ";         //取日期
    s += d.getHours() + ":";       //取小时
    s += d.getMinutes() + ":";    //取分
    
    return(s);
    
}

function divEscapedContentElement(message) {
    if(message != ''){
        return $('<li class="even">'+
                 ' <a class="user" href="#"><img class="img-responsive avatar_" src="images/chat/taozi.png" alt=""><span class="user-name">我</span></a>'+
                 '<div class="reply-content-box">'+
                 '<span class="reply-time">'+GetDateT()+'</span>'+
                 '<div class="reply-content pr" style="background-color: mintcream;">'+
                 '<span class="arrow">&nbsp;</span>'+
                 message+
                 '</div>'+
                 '</div>'+
                 '</li>');
    }
    // return $('<div></div>').text(message);
}

function divEscapedRoomElement(room){
    return $('<a href="#pageId" class="list-group-item"><span class="glyphicon glyphicon-home"> </span>'+room+'</a>');
}
function divSystemContentElement(message) {
    return $('<div class="system-message"></div>').html('<i>' + message + '</i>');
}

function processUserInput(chatApp, socket) {
    var message = $('#send-message').val()
    , systemMessage;
    
    if (message[0] == '/') {
        systemMessage = chatApp.processCommand(message);
        if (systemMessage) {
            $('#messages').append(divSystemContentElement(systemMessage));
        }
    } else {
        chatApp.sendMessage($('#room').text(), message);
        $('#messages').append(divEscapedContentElement(message));
        $('#messages').scrollTop($('#messages').prop('scrollHeight'));
    }
    
    $('#send-message').val('');
    $('#send-message').focus();
}

$(document).ready(function() {
                  var chatApp = new Chat(socket);
                  
                  socket.on('nameResult', function(result) {
                            var message;
                            
                            if (result.success) {
                            message = '您当前的昵称为 ' + result.name + '.';
                            } else {
                            message = result.message;
                            }
                            $('#messages').append(divSystemContentElement(message));
                            });
                  
                  socket.on('joinResult', function(result) {
                            $('#room').text(result.room);
                            $('#messages').empty();
                            $('#messages').append(divSystemContentElement('更新聊天室'));
                            
                            });
                  socket.on('createResult', function(result) {
                            $('#room').text(result.room);
                            $('#messages').append(divSystemContentElement('聊天室 '+ result.room + '创建成功'));
                            });
                  
                  socket.on('message', function (message) {
                            //var newElement = $('<div></div>').text(message.text);
                            if(message.text != ''){
                            if(message.name == undefined){
                            var newElement = $('<div class="system-message"></div>').text(message.text);
                            }else{
                            var newElement = $('<li class="odd">'+
                                               '<a class="user" href="#"><img class="img-responsive avatar_" src="images/chat/ali.png" alt=""><span class="user-name">'+message.name+'</span></a>'+
                                               '<div class="reply-content-box">'+
                                               '<span class="reply-time">'+GetDateT()+'</span>'+
                                               '<div class="reply-content pr" style="background-color: ivory;">'+
                                               '<span class="arrow">&nbsp;</span>'+message.text+
                                               '</div>'+
                                               '</div>'+
                                               '</li>');
                            }
                            
                            $('#messages').append(newElement);
                            }
                            });
                  
                  socket.on('rooms', function(rooms) {
                            $('#room-list').empty();
                            console.log("rooms: "+rooms);
                            for(var i = 0; i < rooms.length; i++) {
                            room = rooms[i];
                            if (room != '') {
                            $('#room-list').append(divEscapedRoomElement(room));
                            }
                            }
                            
                            $('#room-list a').click(function() {
                                                    chatApp.processCommand('/join ' + $(this).text().substring(1,$(this).text().length));
                                                    $( "#panel-left" ).panel( "close" );
                                                    });
                            });
                  setInterval(function() {
                              socket.emit('rooms');
                              }, 1000);
                  
                  $('#send-message').focus();
                  
                  $('#send-form').submit(function() {
                                         processUserInput(chatApp, socket);
                                         return false;
                                         });
                  $('#changeNick-form').submit(function() {
                                               var nick = $('#nickName').val();
                                               chatApp.processCommand('/nick ' + nick);
                                               socket.on('nickResult', function(text){
                                                         alert(text.message);
                                                         })
                                               $.mobile.changePage('#pageId',{
                                                                   'allowSamePageTransition' : true,
                                                                   'reloadPage' : true,
                                                                   'transition' : 'none'
                                                                   });
                                               event.preventDefault();
                                               //  window.history.go(-2);
                                               
                                               });
                  $('#changeRoom-form').submit(function() {
                                               var room = $('#roomName').val();
                                               chatApp.processCommand('/creat ' + room);
                                               socket.on('creatRoom', function(text){
                                                         alert(text.text);
                                                         })
                                               $.mobile.changePage('#pageId',{
                                                                   'allowSamePageTransition' : true,
                                                                   'reloadPage' : true,
                                                                   'transition' : 'none'
                                                                   });
                                               event.preventDefault();
                                               //  window.history.go(-2);
                                               
                                               });
                  });
