<?php
class Task {
    private $db;
    private $table_name = "tasks";

    public $title;
    public $description;
    public $due_date;

    public function __construct($db) {
        $this->db = $db;
    }

    public function create($title, $description, $due_date, $user_id) {
  $query = "INSERT INTO " . $this->table_name . " SET title=:title, description=:description, due_date=:due_date, user_id=:user_id";

  $stmt = $this->db->prepare($query);

  $stmt->bindParam(':title', $title);
  $stmt->bindParam(':description', $description);
  $stmt->bindParam(':due_date', $due_date);
  $stmt->bindParam(':user_id', $user_id); // Bind the user ID parameter

  if ($stmt->execute()) {
    return true;
  }

  return false;
}

}
?>