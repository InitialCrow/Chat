//chat 0.9
(function(window , $){
	'use strict';
	var app = {
		init : function(){
			this.cssHeight();
			this.send_msg();
			this.get_msg(20);// nb msg to display
			this.check_user();
			this.log_out();
		},
		cssHeight : function(){
			//hack for height always 100%
			var height = $(document).height();
			
			$('#chat').css('height', height-300);
			$('#users').css('height',height-150);
		},
		sign_in : function(){
			var $check = $('#check');
			$check.attr('action','sign_in');
			
			$('#validate').on('click',function(evt){
				evt.preventDefault();
				
				var credential  = {
					'login':$('#User').val().replace(/<\/?[^>]+>/gi,"").replace(/[<->-(-)]/gi,""),
				}
				if (signCondition() === true){
					sessionStorage.setItem("user",credential.login);
					$check.submit();
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
			$('#send').on('click', function(){
				$('#msg-form').submit();
			});
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
					talk += '<p ><span class='+msg[i].user+' style=\'color: #729002\'>'+msg[i].user+'</span> dit :'+'</p>'+'<p>'+msg[i].content+'</p>';
					
					if(i === msg.length-1){
						if(msg[i].user != user){
							talkForPop += '<p ><span class='+msg[i].user+' style=\'color: #729002\'>'+msg[i].user+'</span> dit :'+'</p>'+'<p>'+msg[i].content+'</p>';
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
		log_out : function(){
			var user = sessionStorage.getItem("user")

			$('#logout').on('click', function(evt){
				evt.preventDefault();
				$('#msg-form').attr('action','log_out');
				socket.emit('logout', user);
				sessionStorage.clear();
				document.location.href = '/log_out';
			});
			$(window).on('mouseover', (function () {
			    window.onbeforeunload = null;
			}));
			$(window).on('mouseout', (function () {
			    window.onbeforeunload = function () {

			        	return socket.emit('logout', user);
				}
			}));

			
		},
		check_user : function(){
			var $this  = $('form');
			var $users = $('#users');
			socket.on('users_list',function(list){
				var liste = [];
				for(var i = 0 ; i< list.length; i++){
					
					liste += '<li>'+list[i]+'</li>';
				}
				$users.empty().append('<h2>Utilisateurs connectés: </h2>'+'<ul>'+liste+'</ul>');
			})
		}
	}
	window.app = app;
})(window, jQuery)




