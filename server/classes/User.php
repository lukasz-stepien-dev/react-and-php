<?php
require_once 'Database.php';

class User {
    private $db;
    private $id;

    public function __construct() {
        $this->db = (new Database())->getConnection();
    }

    public function register($firstName, $lastName, $email, $password) {
        $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

        $query = 'INSERT INTO users (first_name, last_name, email, password) VALUES (?, ?, ?, ?)';
        $stmt = $this->db->prepare($query);
        $result = $stmt->execute([$firstName, $lastName, $email, $hashedPassword]);

        if ($result) {
            $this->id = $this->db->lastInsertId();
        }

        return $result;
    }

    public function getId() {
        return $this->id;
    }
}
?>