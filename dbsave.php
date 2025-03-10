<?php
    //open and check db connection
    $connection = new mysqli("localhost", "root", "loremipsum", "test_db2");
    if ($connection->connect_error) {
        die("Connection failed: " . $connection->connect_error);
    }
    echo "Connected successfully <br>";
    
    $title = $_POST["title"];
    $table = $_POST["table"];
    $data = $_POST["data"];
    $data_decoded = json_decode($data);
    
    print_r($data_decoded);
    echo "<br>";

    $formQuery = "INSERT INTO forms (Form_name, Connected_table) VALUES ('$title', '$table')";
    if ($connection->query($formQuery) === TRUE) {
        echo "New form created successfully <br>";
    } 
    else {
        echo "Error: " . $formQuery . "<br>" . $connection->error;
    }
    
    foreach($data_decoded as $element) {
        print_r($element);
        echo "<br>";
        print_r($element->type);
        echo "<br>";
        print_r($element->label);
        echo "<br>";
        $element->type = "'".$element->type."'";
        $element->label = "'".$element->label."'";
        array_shift($element->data);
        $DataAsString = implode(',',$element->data);
        $DataAsString = "'".$DataAsString."'";
        echo($DataAsString);
        echo "<br>";
        $inputQuery = "INSERT INTO inputs (Input_type, Label, Input_data) VALUES ($element->type, $element->label, $DataAsString)";
        if ($connection->query($inputQuery) === TRUE) {
            echo "New input added successfully <br>";
        } 
        else {
            echo "Error: " . $inputQuery . "<br>" . $connection->error;
        }
    }
    
    $connection->close();
?>