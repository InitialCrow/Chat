<?php
	header('Access-Control-Allow-Origin: *');
	header('Access-Control-Allow-Methods: GET, POST');  
	include('connectBdd.php');
	$user = $_POST['user'];
	$password = $_POST['password'];
	$ip = $_SERVER['REMOTE_ADDR'];

	

	$pdo->exec("INSERT INTO users(name, password) VALUES('$user','$password')");
 ?>