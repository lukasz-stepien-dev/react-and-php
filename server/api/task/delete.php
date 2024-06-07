<?php
require_once '../../classes/Task.php';
require_once '../../classes/Database.php';
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

$database = new Database();
$db = $database->getConnection();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    if (isset($data['id'])) {
        $task = new Task($db);
        $result = $task->delete($data['id']);

        if ($result) {
            echo json_encode(['success' => true, 'message' => 'Task deleted successfully.']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Failed to delete task.']);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'Missing task ID.']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request method.']);
}
?>