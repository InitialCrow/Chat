<?php 
	header('Access-Control-Allow-Origin: *');
	header('Access-Control-Allow-Methods: GET, POST');  
	

	include('connectBdd.php');
	$sql = 'SELECT COUNT(*) AS nbre_entrees FROM connect WHERE ip=\'' . $_SERVER['REMOTE_ADDR'].'\'';
	$req = $pdo->query($sql);

	$data = $req->fetch();

	$pdo->query('UPDATE connect SET timestamp=' . time() . ' WHERE ip=\'' . $_SERVER['REMOTE_ADDR'] . '\'');





	$timestamp_6sec = time() - (60 * 0.1); // 60 * 5 = nombre de secondes écoulées en 5 minutes

	$pdo->query('DELETE FROM connect WHERE timestamp < ' . $timestamp_6sec);




	$req = $pdo->query('SELECT * FROM connect');

	$data = $req->fetchAll();
	$arr=[];
	foreach ($data as $key) {
		$arr2 = array('name' => $key['name'] );
		
		array_push($arr, $arr2);
	}
	$json = json_encode($arr);
	echo $json;
	



	

?>

