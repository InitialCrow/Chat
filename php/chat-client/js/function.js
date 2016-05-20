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
// experiments...
function notifyMe(msg) {
  // Voyons si le navigateur supporte les notifications
  if (!("Notification" in window)) {
    alert("Ce navigateur ne supporte pas les notifications desktop");
  }

  // Voyons si l'utilisateur est OK pour recevoir des notifications
  else if (Notification.permission === "granted") {
    // Si c'est ok, créons une notification
    var notification = new Notification(msg.replace(/<(?:.|\n)*?>/gm, ' '));
  }

  // Sinon, nous avons besoin de la permission de l'utilisateur
  // Note : Chrome n'implémente pas la propriété statique permission
  // Donc, nous devons vérifier s'il n'y a pas 'denied' à la place de 'default'
  else if (Notification.permission !== 'denied') {
    Notification.requestPermission(function (permission) {

      // Quelque soit la réponse de l'utilisateur, nous nous assurons de stocker cette information
      if(!('permission' in Notification)) {
        Notification.permission = permission;
      }

      // Si l'utilisateur est OK, on crée une notification
      if (permission === "granted") {
        var notification = new Notification(msg.replace(/<(?:.|\n)*?>/gm, ''));
      }
    });
  }

  // Comme ça, si l'utlisateur a refusé toute notification, et que vous respectez ce choix,
  // il n'y a pas besoin de l'ennuyer à nouveau.
}
