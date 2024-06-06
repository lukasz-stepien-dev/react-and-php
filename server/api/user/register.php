<?php
require_once '../../classes/User.php';
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    if (isset($data['firstName']) && isset($data['lastName']) && isset($data['email']) && isset($data['password'])) {
        $user = new User();
        $result = $user->register($data['firstName'], $data['lastName'], $data['email'], $data['password']);

        if ($result) {
          $token = bin2hex(openssl_random_pseudo_bytes(16));
          $userId = $user->getId();
          echo json_encode(['success' => true, 'token' => $token, 'userId' => $userId]);
        } else {
            echo json_encode(['success' => false, 'message' => 'Registration failed.']);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'Missing fields.']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request method.']);
}
?>