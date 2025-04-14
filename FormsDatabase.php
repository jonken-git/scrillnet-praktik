<?php
require_once 'Database.php';
class FormsDatabase
{

    private Database $database;
    public function __construct()
    {
        $this->database = new Database("forms");
    }

    Public function insert(?array $insertData){
       return $this->database->insert($insertData);
    }
}
