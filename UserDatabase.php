<?php
require_once 'Database.php';
class UserDatabase
{
    private Database $database;
    public function __construct()
    {
        $this->database = new Database("users");
    }

    public function selectById($userId)
    {
        return $this->database->selectFromId($userId);
    }
}
