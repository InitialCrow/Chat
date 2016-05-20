//chat 0.3
(function(window , $){
	'use strict';
	var app = {
		sign_in : function(){
			$('#check2').on('submit',function(evt){
				evt.preventDefault();
				var $this = $(this);
				if (signCondition() === true){
					$.ajax({
						url : $this.attr('action')+"/sign_in.php",
						type : $this.attr('method'),
						data : $this.serialize(),
						
						success: function(data, textStats, jqXH){			
		       					signComplete();
		  				 },
						error : function(xhr, status){
							
						},
					})
				}
				else{
					return;
				}
				
			});
		},
		send_msg : function(){
			var user = sessionStorage.getItem("user");
			var id = sessionStorage.getItem("id");
			$('#msg-form').append("<input name='user' id='user' type = 'hidden' value="+user+"></input>","<input  type ='hidden' name='id' id='id' value="+id+"></input>");


			$('#msg-form').on('submit',function(evt){
				evt.preventDefault();

				
				var $this = $(this);
				$.ajax({
					url : $this.attr('action')+'/sav_msg.php',
					type : $this.attr('method'),
					data : $this.serialize(),
					
				})
				$('#msg').val('');
			});	
		},
		get_msg : function(limit){
			var focused = true;
			var user = sessionStorage.getItem("user")
			var $this = $('#msg-form');
			var $chat = $('#chat');
			var not_me = null;
			
			var recieve_msg = [];
			var check_msg = false;
			setInterval(function(){
				$.ajax({
					url : $this.attr('action')+"/msg.json",
					contentType: 'application/json; charset=utf-8',
					dataType : 'jsonp',
					jsonpCallback: 'jsonCallback',
					success: function(data, textStats, jqXH){ // success est toujours en place, bien sûr !
						if (data.length > limit){
           							data =  data.splice(-limit);
           						}

           						var last_msg = data[data.length-1];    

						if(recieve_msg.length === 0){
							recieve_msg = data;		
							check_msg = true;
						}

           						if( recieve_msg[recieve_msg.length-1].last_stamp !== last_msg.last_stamp){
							recieve_msg = data;
							check_msg = true;	
						}

						if(recieve_msg.length === data.length && check_msg === true  ){
							var talk = [];
							var talkForPop=[];
							for(var i =0; i<recieve_msg.length; i++){

								talk += '<p ><span class='+recieve_msg[i].user+' style=\'color: #729002\'>'+recieve_msg[i].user+'</span> say :'+'</p>'+'<p>'+recieve_msg[i].msg+'</p>';
								
								if(i === recieve_msg.length-1){
									if(recieve_msg[i].user != user){
										talkForPop += '<p ><span class='+recieve_msg[i].user+' style=\'color: #729002\'>'+recieve_msg[i].user+'</span> say :'+'</p>'+'<p>'+recieve_msg[i].msg+'</p>';
										not_me = true;
										
									}
									else{
										not_me = false;
									}
									
								}		
							}
							
							$chat.empty().append(talk);
							$chat.scrollTop(100000);
							setTimeout(function(){
								if (not_me === true){

									$pop.css('display','block')
									$pop.empty().append('<p>'+talkForPop+'</p>')
									$popSound.attr('src','assets/message.wav');
									window.onfocus = function() {
										focused = true;	
									};
									window.onblur = function() {
										focused = false;
										notifyMe(talkForPop);
									};
								}
								
							},5);
							check_msg = false;
						}
						$pop.css('display','none')
      					 },
					error : function(xhr, status){
						
					},	
				})
				
				app.check_user();
			},2000)
			

			
		},
		sign_up : function(){
			var recieve_msg = [];
			var check_msg = false;
			$('#check').on('submit',function(evt){
				evt.preventDefault();
				var $this = $(this);
				if (sign_upCondition() === true){
					$.ajax({
						url : $this.attr('action')+"/sign_up.php",
						type : $this.attr('method'),
						data : $this.serialize(),
						dataType : 'json',
						success: function(data, textStats, jqXH){			
		       
       						sessionStorage.setItem("user",data.user);
       						sessionStorage.setItem("id",data.id);
       						document.location = "chat.html";
		  				 },
						error : function(xhr, status){
							
							userUknow();
						},
					})
				}
				else{
					return;
				}
				
			});
		},
		log_out : function(){

			$('#logout').on('click', function(evt){
				evt.preventDefault();
				sessionStorage.clear();
				document.location="index.html";
			});
		},
		check_session: function(){
			
			var user = sessionStorage.getItem("user");
			var id = sessionStorage.getItem("id");


			if(user === null || id === null || user === undefined || id=== undefined || user ==="" ||id==="" ){
				document.location="index.html";
			}
		},
		check_user : function(){
			var $this  = $('form');
			var $users = $('#users');
			var list = [];

			$.ajax({
					url : $this.attr('action')+"/connected.php",
					type : $this.attr('method'),
					dataType : 'json',
					
					
					success: function(data, textStats, jqXH){

	       				for (var i = 0; i < data.length; i++) {
							list += '<li>'+data[i].name+'</li>';
						};
						$users.empty().append('<h2>Users logged: </h2>'+'<ul>'+list+'</ul>');

					},
					error : function(xhr, status){
						console.log(status)
					},
				});
		}

	}
	window.app = app;
})(window, jQuery)




