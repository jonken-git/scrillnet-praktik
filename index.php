<html>
    <head>
        <title>Form creator</title>
        <style>
            form {border:gray 5px solid; padding:5px; text-align: center; font-family: monospace; width:fit-content; margin-left:auto; margin-right:auto; background-color:lightgray}
        </style>
    </head>
    <body>
        <form id="creator" method='post'>
            <h1>create form</h1>
            <select title="Select which database table to connect to" id="dbSelect" name="table">
                <option value="none">Select table</option>
                <option value="users">Users</option>
                <option value="customers">Customers</option>
            </select>
            <input type="text" name="title" title="Give the form a title" placeholder="Title" minlength="4" maxlength="30" required>
            <input type="submit" value="create" id="createForm">
        </form>
    </body>

    <?php
        if (!empty($_POST)) {
            if ($_POST["table"] != 'none') {
                //open and check db connection
                $connection = new mysqli("localhost", "root", "loremipsum", "test_db2");
                if ($connection->connect_error) {
                    die("Connection failed: " . $connection->connect_error);
                }
                echo "Connected successfully";

                //access forms table and insert name and connected table
                $title = $_POST["title"];
                $table = $_POST["table"];
            
                $query = "INSERT INTO forms (Form_name, Connected_table) VALUES ('$title', '$table')";

                if ($connection->query($query) === TRUE) {
                    echo "New record created successfully";
                } 
                else {
                    echo "Error: " . $query . "<br>" . $connection->error;
                }
            
                $connection->close();
            
                //open editor HOW?
            }
            else {echo 'Error: no table selected';}
        }
    ?>

</html>