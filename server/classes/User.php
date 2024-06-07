<?php
require_once 'Database.php';

class User {
    private $db;
    private $id;
    private $token;
    private $email;

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
            $this->email = $email;
        }

        return $result;
    }

    public function login() {
        $query = 'SELECT * FROM users WHERE email = ? LIMIT 1';
        $stmt = $this->db->prepare($query);
        $stmt->execute([$this->email]);

        if ($stmt->rowCount() > 0) {
            $user_data = $stmt->fetch(PDO::FETCH_ASSOC);
            $this->id = $user_data['id'];
            return $user_data;
        }

        return false;
    }

    public function getId() {
        return $this->id;
    }

    public function setEmail($email) {
        $this->email = $email;
    }

    public function getEmail() {
        return $this->email;
    }

    public function setToken($token) {
        $this->token = $token;
    }

    public function getToken() {
        return $this->token;
    }
}
?>