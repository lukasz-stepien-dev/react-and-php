<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once '../../classes/Database.php';

$database = new Database();
$db = $database->getConnection();

$query = "SELECT * FROM tasks";
$stmt = $db->prepare($query);
$stmt->execute();

if($stmt->rowCount() > 0){
    $tasks = array();
    $tasks["records"] = array();

    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        extract($row);
        $task_item = array(
            "id" => $id,
            "title" => $title,
            "description" => $description,
            "created_at" => $created_at,
            "due_date" => $due_date,
            "status" => $status,
            "user_id" => $user_id
        );
        array_push($tasks["records"], $task_item);
    }
    http_response_code(200);
    echo json_encode($tasks);
} else {
    http_response_code(404);
    echo json_encode(array("message" => "No tasks found."));
}
?>