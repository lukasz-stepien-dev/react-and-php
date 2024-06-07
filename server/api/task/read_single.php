<?php
require_once '../../classes/Task.php';
require_once '../../classes/Database.php';
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

$database = new Database();
$db = $database->getConnection();

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (isset($_GET['id'])) {
        $task = new Task($db);
        $result = $task->read_single($_GET['id']);

        if ($result) {
            echo json_encode($result);
        } else {
            echo json_encode(['success' => false, 'message' => 'Task not found.']);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'Missing task ID.']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request method.']);
}
?>