<?php
// open and check db connection
$connection = new mysqli("localhost", "root", "loremipsum", "test_db2");
if ($connection->connect_error) {
    die("Connection failed: " . $connection->connect_error);
}
echo "Connected successfully <br>";

require_once 'FormsDatabase.php';
require_once 'InputsDatabase.php';

$fdb = new FormsDatabase();
$idb = new InputsDatabase();
$data = $_POST["data"];
$data_decoded = json_decode($data, true);

 $formId = $fdb->insert([
    "Form_name" => $_POST["title"],
    "Connected_table" => $_POST["table"]
]);
echo "<br>";

foreach ($data_decoded as $element) {
    unset($element["data"]["id"]);
    $data_encoded = json_encode($element["data"]);
    $idb->insert([
        "Form_id" => $formId, //
        "Input_type" => $element["type"],
        "Label" => $element["label"],
        "Input_data" => $data_encoded
    ]);
}

$connection->close();
