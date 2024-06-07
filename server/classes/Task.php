<?php
class Task {
    private $db;
    private $table_name = "tasks";

    public $id;
    public $title;
    public $description;
    public $due_date;
    public $status;
    public $user_id;

    public function __construct($db) {
        $this->db = $db;
    }

    public function create(): bool
    {
        $query = "INSERT INTO " . $this->table_name . " SET title = :title, description = :description, due_date = :due_date, status = :status, user_id = :user_id";
        $stmt = $this->db->prepare($query);

        $stmt->bindParam(':title', $this->title);
        $stmt->bindParam(':description', $this->description);
        $stmt->bindParam(':due_date', $this->due_date);
        $stmt->bindParam(':status', $this->status);
        $stmt->bindParam(':user_id', $this->user_id);

        if ($stmt->execute()) {
            return true;
        }

        return false;
    }

    public function update(): bool
    {
        $query = "UPDATE " . $this->table_name . " SET title = :title, description = :description, due_date = :due_date, status = :status WHERE id = :id";
        $stmt = $this->db->prepare($query);

        $stmt->bindParam(':id', $this->id);
        $stmt->bindParam(':title', $this->title);
        $stmt->bindParam(':description', $this->description);
        $stmt->bindParam(':due_date', $this->due_date);
        $stmt->bindParam(':status', $this->status);

        if ($stmt->execute()) {
            return true;
        }

        return false;
    }

    public function delete($id): bool
    {
        $query = "DELETE FROM " . $this->table_name . " WHERE id = :id";
        $stmt = $this->db->prepare($query);
        $stmt->bindParam(':id', $id);

        if ($stmt->execute()) {
            return true;
        }

        return false;
    }

    public function read_single($id)
    {
        $query = "SELECT * FROM " . $this->table_name . " WHERE id = :id";
        $stmt = $this->db->prepare($query);
        $stmt->bindParam(':id', $id);
        $stmt->execute();

        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($row) {
            return $row;
        }

        return false;
    }
}
?>