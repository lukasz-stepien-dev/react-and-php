<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With');

include_once '../../classes/Database.php';
include_once '../../classes/User.php';

$database = new Database();
$db = $database->getConnection();

$user = new User($db);

$userId = $_GET['userId'];

$result = $user->getUserDataFromId($userId);

if($result) {
    echo json_encode(
        array('firstName' => $result['first_name'], 'lastName' => $result['last_name'], 'email' => $result['email'])
    );
} else {
    echo json_encode(array('message' => 'User Not Found'));
}
?>