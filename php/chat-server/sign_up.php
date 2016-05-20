<?php 
	header('Access-Control-Allow-Origin: *');
	header('Access-Control-Allow-Methods: GET, POST');  
	
	include('connectBdd.php');

	$user = $_POST['user'];
	$password = $_POST['password'];
	$authy = 0;

	
	$sql = "SELECT * FROM users ";
	$req  = $pdo->query($sql);
	
	while($row = $req->fetch()) {   
		if ($row['name']===$user && $row['password'] == $password){
			$authy = 1;
			break;
		}
		else{
			
			$authy = 0;
		}
		

	}  
	$req->closeCursor();
	if($authy === 1){

		$sql = 'SELECT COUNT(*) AS nbre_entrees FROM connect WHERE name=\'' . $user.'\'';
		$req = $pdo->query($sql);
		$data = $req->fetch();
		if ($data['nbre_entrees'] == 0) // L'IP ne se trouve pas dans la table, on va l'ajouter.
		{

		    $pdo->exec('INSERT INTO connect (name,ip,timestamp) VALUES(\''.$user.'\',\'' . $_SERVER['REMOTE_ADDR'] . '\', ' . time() . ')');

		}

		else // L'IP se trouve déjà dans la table, on met juste à jour le timestamp.

		{

		   $pdo->exec('UPDATE connect SET timestamp=' . time() . ' WHERE name=\'' . $user . '\'');

		}
		

		
		$token = uniqid(true);
		$arr = array('id'=>$token, 'user'=>$user);
		$json =  json_encode($arr);
		echo $json;
		
	}
	
 ?>