<?php
	// connect environement for database
	
	$host = "chat";// your server host
	$dbName = "chat";// your database name
	$charset ="utf8"; // let utf8 by default
	$user = "root"; // user name of database
	$password = ""; // password of user name


	try{
		$pdo = new PDO("mysql:host=$host;dbname=$dbName;charset=$charset", "$user", "$password");
	}
	catch(Exception $e)

	{
	        die('Erreur : '.$e->getMessage());
	}

?>