var express = require('express');
var fs = require('fs');

var app = express();
var http = require('http');
var server = http.createServer(app);
var bodyParser = require('body-parser')
var io = require('socket.io').listen(server);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

var conn = {
	'port' : 8300,
	'host' : 'localhost',
};

var db = require('./models/Database.js');
var mysql_use = db.mysqlDB();
var session = require("express-session")({
    secret: "chat_sess",
    resave: true,
    saveUninitialized: true
});

var history = [];
var userConnected = [];

app.use(session);

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
	res.render('index')
});
app.get('/chat',function(req, res){
	var _session = req.session;
	if(_session.user){
		userConnected.push(_session.user);
		userConnected = userConnected.unique();
		res.render('chat');
	}
	else{
		res.redirect('/');
	}
});
app.post('/sign_in', function(req,res){
	var _session = req.session;
	var login = req.body.userSign.trim().replace(/(<([^>]+)>)/ig,"");
	var password = req.body.passwordSign.trim().replace(/(<([^>]+)>)/ig,"");

	var query = " INSERT INTO "+mysql_use.config.database+".users ( name, password) VALUES ('"+login+"', '"+password+"');";
	mysql_use.query(query,function(err, result, field){

		if(result == ""){
			console.log('error bybye');
			res.redirect('/');
			return;
		}
		else{
			_session.user = login;
			console.log(_session.user+" s'est inscris au chat ! ");
			res.redirect('chat');
		}
	});
})
app.post('/log_in',function(req, res){
	var _session = req.session;
	var login = req.body.user.trim().replace(/(<([^>]+)>)/ig,"");
	var password = req.body.password.trim().replace(/(<([^>]+)>)/ig,"");
	
	mysql_use.query("SELECT * FROM users where name like '"+login+"'and password like '"+password+"';",function(err, result, field){

		if(result == ""){
			console.log('error bybye');
			res.redirect('/');
			return;
		}
		else{
			_session.user = login;	
			res.redirect('chat');
		}
	});
});
app.get('/log_out',function(req,res){
	req.session.destroy();
	res.redirect('/');
});
io.sockets.on('connection', function (socket) {
		io.emit('users_list', userConnected); // show the user list
		socket.on('first_load', function(){
			socket.emit('msg_receiver', history);
		});
		socket.on('msg_sended',function(msg){
			history.push(msg);
			fs.writeFile('./firstJson.json', JSON.stringify(history, null, 4) ); 
			io.emit('msg_receiver', history);
		});
		socket.on('logout',function(user){
			for(var i = 0; i<userConnected.length; i++){
				if(userConnected[i] === user){
					userConnected.splice(userConnected[i], 1);
					break;
				}
			}
			io.emit('users_list', userConnected);
		});

	});


server.listen(conn.port, conn.host);
console.log('server listen on : '+conn.host+':'+conn.port );

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



