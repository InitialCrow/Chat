// variable environement..


const $user = $('#User');
const $password =$('#Password');
const $userSign = $('#UserSign');
const $passwordSign =$('#PasswordSign');
const $pop = $('#popup');
const $popSound = $('#popsound');

function signCondition(){
	var $user_val = $user.val();
	var $password_val = $password.val();
	var $user_valSign = $userSign.val();
	var $password_valSign = $passwordSign.val();
	var $myAlert = $('#myAlert');

	


	if (   $user_valSign === "" || $password_valSign ===""){
		if (   $password_valSign ===""){
			$myAlert.empty().append("<a href='#' class='close' data-dismiss='alert'>&times;</a><strong>Warning!</strong> password is not given...").fadeIn(1000);
			setTimeout(function(){
				$myAlert.fadeOut(1000);
			},3000);
		
		}
		else{
			$myAlert.empty().append("<a href='#' class='close' data-dismiss='alert'>&times;</a><strong>Warning!</strong> user is not given...").fadeIn(1000);
			setTimeout(function(){
				$myAlert.fadeOut(1000);
			},3000);
		}
		
	}
	else{
		return true;
	}

	if (   $user_valSign === "" && $password_valSign ===""){
		
		$myAlert.empty().append("<a href='#' class='close' data-dismiss='alert'>&times;</a><strong>Warning!</strong> don't be childy...").fadeIn(1000);
		setTimeout(function(){
				$myAlert.fadeOut(1000);
			},3000);
	}	
}

function sign_upCondition(){
	var $user_val = $user.val();
	var $password_val = $password.val();
	var $myAlert = $('#myAlert');
	
	if (   $user_val === "" || $password_val ===""){
		if (   $password_val ===""){
			$myAlert.empty().append("<a href='#' class='close' data-dismiss='alert'>&times;</a><strong>Warning!</strong> password is not given...").fadeIn(1000);
			setTimeout(function(){
				$myAlert.fadeOut(1000);
			},3000);
		
		}
		else{
			$myAlert.empty().append("<a href='#' class='close' data-dismiss='alert'>&times;</a><strong>Warning!</strong> user is not given...").fadeIn(1000);
			setTimeout(function(){
				$myAlert.fadeOut(1000);
			},3000);
		}
		
	}
	else{
		return true;
	}
	
	if (   $user_val === "" && $password_val ===""){
		
		$myAlert.empty().append("<a href='#' class='close' data-dismiss='alert'>&times;</a><strong>Warning!</strong> don't be childy...").fadeIn(1000);
		setTimeout(function(){
				$myAlert.fadeOut(1000);
			},3000);
	}
}
function signComplete(){
	var $myAlert = $('#myAlert');
	$myAlert.empty().append("<a href='#' class='close'  data-dismiss='alert'>&times;</a> sign_in complete!! you can log in now...").fadeIn(1000);
		setTimeout(function(){
				$myAlert.fadeOut(1000);
			},3000);
}

function userUknow(){
	var $myAlert = $('#myAlert');
	$myAlert.empty().append("<a href='#' class='close'  data-dismiss='alert'>&times;</a><strong>Warning!</strong> User or password doesn't exist ").fadeIn(1000);
		setTimeout(function(){
				$myAlert.fadeOut(1000);
			},3000);
}
