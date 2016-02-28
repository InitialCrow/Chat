<?php 
	$user = $_POST['user'];
	$password = $_POST['password'];
	$ip = $_SERVER['REMOTE_ADDR'];

	try{
		$bdd = new PDO('mysql:host=chat;dbname=chat;charset=utf8', 'root', '');
	}
	catch(Exception $e)

	{

	        die('Erreur : '.$e->getMessage());

	}
	
	$bdd->exec("INSERT INTO users(name, password) VALUES('$user','$password')");
 ?>