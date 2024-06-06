<?php
require_once '../../classes/Database.php';
require_once '../../classes/Task.php';

$db = new Database();
$dbConnection = $db->getConnection();

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

  if (isset($data['title']) && isset($data['description']) && isset($data['due_date']) && isset($data['user_id'])) {
    $task = new Task($dbConnection);
    $result = $task->create($data['title'], $data['description'], $data['due_date'], $data['user_id']);

    if ($result) {
            echo json_encode(['success' => true, 'message' => 'Task created successfully.']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Task creation failed.']);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'Missing fields.']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request method.']);
}
?>