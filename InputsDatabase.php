<?php
require_once 'Database.php';
class InputsDatabase
{
    private Database $database;
    public function __construct()
    {
        $this->database = new Database("inputs");
    }
}
