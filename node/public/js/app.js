//chat 0.8
(function(window , $){
	'use strict';
	var app = {
		sign_in : function(){
			$('#check2').on('submit',function(evt){
				evt.preventDefault();

				var credential  = {
					'login':$('#UserSign').val(),
					'pass':$('#PasswordSign').val(),
				}
				if (signCondition() === true){
					socket.emit('sign_in', credential);

					socket.on('redirect',function(session){
						sessionStorage.setItem("user",credential.login); 
						document.location.href = 'chat.html';
					});
				}
				else{
					sessionStorage.clear();
					return console.log('sign_in fail');
				}
			});
		},
		send_msg : function(){
			var user = sessionStorage.getItem("user");
			$('#msg-form').append("<input name='user' id='user' type = 'hidden' value="+user+"></input>");
			$('#msg-form').on('submit',function(evt){
				evt.preventDefault();
				var msg = {
					'user' : user,
					'content' : $('#msg').val()
				};
				
				socket.emit('msg_sended', msg);
			
				$('#msg').val('');
			});	
		},
		get_msg : function(limit){
			socket.emit('first_load');
			var focused = true;
			var user = sessionStorage.getItem("user")
			var $this = $('#msg-form');
			var $chat = $('#chat');
			var not_me = null;
			
			
	
			var check_msg = false;

			socket.on('msg_receiver', function(msg){
				var talk = [];
				var talkForPop=[];
				for(var i =0; i<msg.length; i++){
					talk += '<p ><span class='+msg[i].user+' style=\'color: #729002\'>'+msg[i].user+'</span> say :'+'</p>'+'<p>'+msg[i].content+'</p>';
					
					if(i === msg.length-1){
						if(msg[i].user != user){
							talkForPop += '<p ><span class='+msg[i].user+' style=\'color: #729002\'>'+msg[i].user+'</span> say :'+'</p>'+'<p>'+msg[i].content+'</p>';
							not_me = true;
							
						}
						else{
							not_me = false;
						}
						
					}		
				}
				$chat.empty().append(talk);
				$chat.scrollTop(100000);
				
				if (not_me === true){

					$pop.css('display','block')
					$pop.empty().append('<p>'+talkForPop+'</p>')
					$popSound.attr('src','assets/message.wav');
					window.onfocus = function() {
						focused = true;	
					};
					window.onblur = function() {
						focused = false;
						
					};
					if(focused  === false){
						notifyMe(talkForPop);
					}

				}

				window.setTimeout(function(){
					$pop.css('display','none');
				},2000);
				check_msg = false;
			});
		},	
		sign_up : function(){

			var msg = [];
			var check_msg = false;
			$('#check').on('submit',function(evt){
				evt.preventDefault();

				var credential  = {
					'login':$('#User').val(),
					'pass':$('#Password').val(),
				};
				if (sign_upCondition() === true){
					socket.emit('login',credential)
					
					socket.on('redirect',function(session){
						sessionStorage.setItem("user",credential.login); 
						document.location.href = 'chat.html';
					});
				}
				else{
					sessionStorage.clear();
					return;
				}
				
			});
		},
		log_out : function(){

			$('#logout').on('click', function(evt){
				evt.preventDefault();
				socket.emit('logout');
				socket.on('redirect', function(){
					sessionStorage.clear();
					document.location="/";
				});
				
			});
		},
		check_session: function(){	
			socket.emit('check_session');
			socket.on('drop_unknow',function(){
				document.location.href = '/';
			});
		},
		check_user : function(){
			var $this  = $('form');
			var $users = $('#users');
			

			
			socket.on('users_list',function(list){
				var liste = [];
				for(var i = 0 ; i< list.length; i++){
					
					liste += '<li>'+list[i]+'</li>';
				}
				$users.empty().append('<h2>Users logged: </h2>'+'<ul>'+liste+'</ul>');
			})

		

			
		}

	}
	window.app = app;
})(window, jQuery)




