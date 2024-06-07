<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With');

include_once '../../classes/Database.php';
include_once '../../classes/User.php';

$database = new Database();
$db = $database->getConnection();

$user = new User($db);

$data = json_decode(file_get_contents("php://input"));

$user->setEmail($data->email);
$password = $data->password;

$result = $user->login();
if($result) {
    if(password_verify($password, $result['password'])) {
        $token = bin2hex(openssl_random_pseudo_bytes(16));
        $user->setToken($token);
        echo json_encode(
            array('message' => 'Login Success', 'token' => $token, 'userId' => $user->getId(), 'success' => true)
        );
    } else {
        echo json_encode(array('message' => 'Login Not Success', 'success' => false));
    }
} else {
    echo json_encode(array('message' => 'Login Not Success', 'success' => false));
}
?>