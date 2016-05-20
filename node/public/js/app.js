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
			

			
		},
		sign_up : function(){

			var recieve_msg = [];
			var check_msg = false;
			$('#check').on('submit',function(evt){
				evt.preventDefault();

				var credential  = {
					'login':$('#User').val(),
					'pass':$('#Password').val(),
				}
				
				if (sign_upCondition() === true){
					console.log(credential)
					socket.emit('login',credential)
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




