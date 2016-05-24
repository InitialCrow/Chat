var express = require('express');
var fs = require('fs');

var app = express();
var http = require('http');
var server = http.createServer(app);
var io = require('socket.io').listen(server);
var port = 8300;

var db = require('./models/Database.js');
var mysql_use = db.mysqlDB();
var session = require("express-session")({
    secret: "chat_sess",
    resave: true,
    saveUninitialized: true
});

var history = [];
var userConnected = [];

var sharedsession = require("express-socket.io-session");
app.use(session);

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');


io.use(sharedsession(session));

app.get('/', function (req, res) {

	res.render('index')
});
app.get('/chat.html',function(req, res){

	res.render('chat');
});

io.sockets.on('connection', function (socket) {
    	socket.on('sign_in',function(credential){
    		var _session = socket.handshake.sessionStore;

    		var query = " INSERT INTO "+mysql_use.config.database+".users ( name, password) VALUES ('"+credential.login+"', '"+credential.pass+"');";
		mysql_use.query(query,function(err, result, field){

			if(result == ""){
				console.log('error bybye');
				return;
			}
			else{
				_session.credential = credential;
				console.log(credential.login+" s'est inscris au chat ! ");
				socket.emit('redirect');
			}
		});
    	});
	socket.on('login',function(credential){
		var _session = socket.handshake.sessionStore;
		mysql_use.query("SELECT * FROM users where name like '"+credential.login+"'and password like '"+credential.pass+"';",function(err, result, field){

			if(result == ""){
				console.log('error bybye');
				return;
			}
			else{
				_session.credential = credential;	
				socket.emit('redirect');
			}
		});
	});
	socket.on('logout', function(){
		var _session = socket.handshake.sessionStore;
		console.log(_session.credential.login +" s'est déconnecter ! ");
		var search =_session.credential.login;

		for (var i=userConnected.length-1; i>=0; i--) {
			if (userConnected[i] === search) {
				userConnected.splice(i, 1);
				// break;       //<-- Uncomment  if only the first term has to be removed
			}
		}
	
		_session = [];

		socket.emit('redirect');
	})
	socket.on('check_session',function(){
		var _session = socket.handshake.sessionStore;
		if(_session.credential){
			
			userConnected.push(_session.credential.login);
			
			userConnected = userConnected.unique();
			io.emit('users_list', userConnected);
			return;
		}
		else{
			socket.emit('drop_unknow');
		}
	});
	socket.on('first_load', function(){
		socket.emit('msg_receiver', history);

		
	});
	socket.on('msg_sended',function(msg){
		var _session = socket.handshake.sessionStore;
		history.push(msg);
		fs.writeFile('./firstJson.json', JSON.stringify(history, null, 4) ); 
		io.emit('msg_receiver', history);
	});

});

server.listen(port,'172.16.1.76');
console.log('server listen on : 172.16.1.76:8300' );

// ------------------------------------------------------ helper
Array.prototype.unique=[].unique||function(){var o={},i,l=this.length,r=[];for(i=0;i<l;i++)o[this[i]]=this[i];for(i in o)r.push(o[i]);return r}

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



