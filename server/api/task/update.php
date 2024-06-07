<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With');

include_once '../../classes/Database.php';
include_once '../../classes/Task.php';

$database = new Database();
$db = $database->getConnection();

$task = new Task($db);

$data = json_decode(file_get_contents("php://input"));

if (!empty($data->id) && !empty($data->title) && !empty($data->description) && !empty($data->due_date) && !empty($data->status)) {
    $task->id = $data->id;
    $task->title = $data->title;
    $task->description = $data->description;
    $task->due_date = $data->due_date;
    $task->status = $data->status;

    if ($task->update()) {
        echo json_encode(
            array('message' => 'Task Updated', 'success' => true)
        );
    } else {
        echo json_encode(
            array('message' => 'Task Not Updated', 'success' => false)
        );
    }
} else {
    echo json_encode(
        array('message' => 'Incomplete data', 'success' => false)
    );
}
?>