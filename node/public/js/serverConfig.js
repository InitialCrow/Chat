const $server = "http://chat:8000"; //put server host here
const $method = "POST";

function serverConfig(){// function for change post url
	$form = $('form');
	$form.attr('action', $server);
	$form.attr('method', $method);

}

// run ..

serverConfig();