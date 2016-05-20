var express = require('express');


var app = express();
var http = require('http');
var server = http.createServer(app);
var io = require('socket.io').listen(server);
var port = 8300;

var db = require('./models/Database.js');
var mysql_use = db.mysqlDB();

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');

app.get('/', function (req, res) {

    res.render('index')
});

io.sockets.on('connection', function (socket) {
    console.log('Un client est arrivé !');

    socket.on('login',function(credential){
    	var cheked = false;
    	mysql_use.query("SELECT * FROM users where name like '"+credential.login+"'and password like '"+credential.pass+"';",function(err, result, field){

    		if(result == ""){
			checked = false;
			
			console.log('error bybye')	
		}
		else{
			checked = true;
			console.log('ok')	
		}

    	});
    	console.log(credential.login + " s'est connecté");
    })

});


server.listen(port);
console.log('server listen on : http://localhost:8000' );

// -----------------------------------------------------------------------old been---------------------------------------------
// var usernames = {};
// var rooms = ['Room 1','Room 2','Room 3'];
// var roomusers = [];

// io.set('log level', 2);
// 			 //socket.io fallback
// io.configure('development', function(){
// 	io.set('transports', ['xhr-polling']);
// });
// io.sockets.on('connection', function(socket) {



//     //-- envoyer un message

//     socket.on('sendchat', function(data) {
// 	io.sockets.in(socket.room).emit('updatechat', socket.username, data);
//     });



//     //-- connexion d'un nouvel utilisateur

//     socket.on('adduser', function(username) {

// 	socket.username = username;
// 	usernames[username] = username;

// 	socket.room = 'Room 1';
// 	socket.join('Room 1');

// 	    /*for(var i = 0; i < clients.length; i++) {
// 		console.log('LOG:' + clients[i].username + ' (' + socket.room + ')');
// 		roomusers[roomusers.length] = clients[i].username;
// 	    }
// 	io.sockets.to('room1').emit('updateroomusers', roomusers);*/

// 	var clients = io.sockets.clients('Room 1');
// 	clients.forEach(function(client) {
// 	    //console.log('Username: ' + client.username +'|'+clients.length);
// 	    socket.emit('nb', clients.length);
// 	});

// 	socket.emit('updatechat', 'SERVER', 'You have connected to ' + socket.room);
// 	socket.broadcast.emit('updatechat', 'SERVER', username + ' has connected');
// 	//socket.broadcast.to('room1').emit('updatechat', 'SERVER', username + ' has connected to this room.');
// 	socket.emit('updaterooms', rooms, 'room1', usernames);
// 	io.sockets.emit('updateusers', usernames);

//     });



//     //-- changement de pièce

//     socket.on('switchRoom', function(newroom) {
// 	socket.leave(socket.room);
// 	socket.join(newroom);

// 	socket.emit('updatechat', 'SERVER', 'You have connected to ' + newroom);
// 	socket.broadcast.to(socket.room).emit('updatechat', 'SERVER', socket.username + ' has left this room');
// 	socket.room = newroom;
// 	socket.broadcast.to(newroom).emit('updatechat', 'SERVER', socket.username + ' has joined ' + newroom);

// 	socket.emit('updaterooms', rooms, newroom);
// 	//io.sockets.emit('updateusers', usernames);
// 	//socket.emit('test', socket.username);
//     });



//     //-- déconnexion d'un utilisateur

//     socket.on('disconnect', function() {
// 	delete usernames[socket.username];
// 	//delete roomusers;
// 	io.sockets.emit('updateusers', usernames);
// 	socket.broadcast.emit('updatechat', 'SERVER', socket.username + ' has disconnected');
// 	socket.leave(socket.room);
//     });



//     //-- ajout d'un nouveau salon

//     socket.on('addNewRoom', function() {
// 	var nb = rooms.length+1;
// 	rooms.push('Room ' + nb);
//     });


// });



