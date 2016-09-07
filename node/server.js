var express = require('express');
var fs = require('fs');

var app = express();
var http = require('http');
var server = http.createServer(app);
var bodyParser = require('body-parser')
var io = require('socket.io').listen(server);


var session_token = [];
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
	if(_session.user ){


	
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

	var login = req.body.user.trim().replace(/<\/?[^>]+>/gi,"").replace(/[<->-(-)]/gi,"");
	

	var query = " INSERT INTO "+mysql_use.config.database+".users ( name) VALUES ('"+login+"');";
	mysql_use.query(query,function(err, result, field){
		if(err){
			console.log('error bybye');
			res.redirect('/');
			return;
		}
		if(result == ""){
			console.log('error bybye');
			res.redirect('/');
			return;
		}
		else{
			_session.user = login;
			_session.id_mysql= result.insertId;
			session_token.push(_session);
			console.log(_session.user+" s'est inscris au chat ! ");
			res.redirect('chat');
		}
	});
	
});
app.get('/log_out',function(req,res){
	var _session = req.session;
	var query = "DELETE FROM " +mysql_use.config.database+".users WHERE users.id = "+_session.id_mysql;
	mysql_use.query(query);
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
			for(var i = 0; i<session_token.length; i++){
				if(session_token[i].user === user){
					var query = "DELETE FROM " +mysql_use.config.database+".users WHERE users.id = "+session_token[i].id_mysql;
					mysql_use.query(query);
					
				}

			}	
			
			io.emit('users_list', userConnected);

		});
	});


server.listen(conn.port, conn.host);
console.log('server listen on : '+conn.host+':'+conn.port );

// ------------------------------------------------------ helper
Array.prototype.unique=[].unique||function(){var o={},i,l=this.length,r=[];for(i=0;i<l;i++)o[this[i]]=this[i];for(i in o)r.push(o[i]);return r}



