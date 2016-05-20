<?php 
	header('Access-Control-Allow-Origin: *');
	header('Access-Control-Allow-Methods: GET, POST'); 
	header('Content-Type: text/html; charset= UTF-8');

	$msg = $_POST['msg'];
	$user = $_POST['user'];
	$id = $_POST['id'];
	$sav_msg = file_get_contents('msg.json');
	$take_msg = file_get_contents('msg_buffer.json');
	if (!empty($take_msg)){
		$arr = array('user' =>$user, 'msg' => $msg, 'id' => $id, 'last_stamp'=>uniqid());
		$json = json_decode($take_msg, true);
		array_push($json, $arr);
		$json = json_encode($json);
		$take_msg = fopen('msg_buffer.json','w+');
		fputs($take_msg, $json);

		fclose($take_msg);
		$sav_msg = fopen('msg.json','w+');
		
		
		fputs($sav_msg, 'jsonCallback('.$json.')');
		
		
		fclose($sav_msg);
	}
	else{
		$take_msg = fopen('msg_buffer.json','a');
		$arr = array($arr = array('user' =>$user, 'msg' => $msg, 'id' => $id,'last_stamp'=>uniqid()));
		$json = json_encode($arr);
		fputs($take_msg,$json);
		fclose($take_msg);

		$sav_msg = fopen('msg.json','a');
		
		
		fputs($sav_msg, 'jsonCallback('.$json.')');
		
		
		fclose($sav_msg);


	}
 ?>