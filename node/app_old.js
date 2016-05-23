var express = require('express')
var  app = express();
var  http = require('http');
var  server = http.createServer(app);
var  io = require('socket.io').listen(server);
var  port = 1337;


server.listen(port);
	io.set('log level', 2);
	//socket.io fallback
	io.configure('development', function(){
	io.set('transports', ['xhr-polling']);
});

app.configure(function() {
  app.use(express.static(__dirname + '/public'));
});

app.get('/', function (req, res) {
  //res.render('chat.jade', { pageTitle: 'Chat', layout: false, pretty: true });
  res.sendfile(__dirname + '/index.html');
});


var usernames = {};
var rooms = ['Room 1','Room 2','Room 3'];
var roomusers = [];



io.sockets.on('connection', function(socket) {



    //-- envoyer un message

    socket.on('sendchat', function(data) {
  io.sockets.in(socket.room).emit('updatechat', socket.username, data);
    });



    //-- connexion d'un nouvel utilisateur

    socket.on('adduser', function(username) {

  socket.username = username;
  usernames[username] = username;

  socket.room = 'Room 1';
  socket.join('Room 1');

      /*for(var i = 0; i < clients.length; i++) {
    console.log('LOG:' + clients[i].username + ' (' + socket.room + ')');
    roomusers[roomusers.length] = clients[i].username;
      }
  io.sockets.to('room1').emit('updateroomusers', roomusers);*/

  var clients = io.sockets.clients('Room 1');
  clients.forEach(function(client) {
      //console.log('Username: ' + client.username +'|'+clients.length);
      socket.emit('nb', clients.length);
  });

  socket.emit('updatechat', 'SERVER', 'You have connected to ' + socket.room);
  socket.broadcast.emit('updatechat', 'SERVER', username + ' has connected');
  //socket.broadcast.to('room1').emit('updatechat', 'SERVER', username + ' has connected to this room.');
  socket.emit('updaterooms', rooms, 'room1', usernames);
  io.sockets.emit('updateusers', usernames);

    });



    //-- changement de pièce

    socket.on('switchRoom', function(newroom) {
  socket.leave(socket.room);
  socket.join(newroom);

  socket.emit('updatechat', 'SERVER', 'You have connected to ' + newroom);
  socket.broadcast.to(socket.room).emit('updatechat', 'SERVER', socket.username + ' has left this room');
  socket.room = newroom;
  socket.broadcast.to(newroom).emit('updatechat', 'SERVER', socket.username + ' has joined ' + newroom);

  socket.emit('updaterooms', rooms, newroom);
  //io.sockets.emit('updateusers', usernames);
  //socket.emit('test', socket.username);
    });



    //-- déconnexion d'un utilisateur

    socket.on('disconnect', function() {
  delete usernames[socket.username];
  //delete roomusers;
  io.sockets.emit('updateusers', usernames);
  socket.broadcast.emit('updatechat', 'SERVER', socket.username + ' has disconnected');
  socket.leave(socket.room);
    });



    //-- ajout d'un nouveau salon

    socket.on('addNewRoom', function() {
  var nb = rooms.length+1;
  rooms.push('Room ' + nb);
    });


});




