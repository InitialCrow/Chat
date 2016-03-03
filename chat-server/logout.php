<?php 
	header('Access-Control-Allow-Origin: *');
	header('Access-Control-Allow-Methods: GET, POST'); 
	$ip = $_SERVER['REMOTE_ADDR'];
	

	include('connectBdd.php');

	$pdo->('DELETE FROM connect WHERE ip = ' . $ip);
?>