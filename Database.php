<?php
class Database
{
    private string $hostname = "localhost";
    private string $username = "root";
    private string $database = "praktik";
    private string $password = "root";
    private string $table;
    public array $rows = array();
    private mysqli $connection;


    public function __construct(string $table)
    {
        $this->connection = new mysqli(
            $this->hostname,
            $this->username,
            $this->password,
            $this->database
        );

        $this->table = $table;

        if ($this->connection->connect_error) {
            die("Connection failed: " . $this->connection->connect_error);
        }
    }
    private function selectQuery(?string $sqlExtension)
    {
        $sql = "SELECT * FROM $this->table $sqlExtension";
        return $this->connection->query($sql);
    }
    public function selectFromId(?int $id)
    {
        if ($id === null) {
            return [];
        }
        $result = $this->selectQuery("WHERE id = $id");

        if (!$result) {
            die("Query failed: " . $this->connection->error);
        }

        while ($row = $result->fetch_assoc()) {
            $this->rows[] = $row;
        }

        if (empty($this->rows)) {
            echo "No records found for ID: $id";  // Debugging statement
        }

        return $this->rows;
    }
    public function insert(?array $insertData)
    {
        unset($insertData["submit"]);
        $keysString = implode(", ", array_keys($insertData));

        $valuesString = implode(", ", array_map(function ($value) {

            if (json_validate($value) == true) {
                return "'" . $value . "'";
            } else {
                return '"' . $value . '"';
            }
        }, array_values($insertData)));


        $sql = "INSERT INTO $this->table ($keysString) VALUES ($valuesString)";
        print($sql);

        if ($this->connection->query($sql) === TRUE) {
            echo "New record inserted successfully!";
        } else {
            echo "Error: " . $this->connection->error;
        }

        return $this->connection->insert_id;
    }
}
