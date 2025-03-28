<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>

    <form method="POST">
        <label for="Förnamn">Insert first name:</label>
        <input type="text" name="Förnamn" id="Förnamn" required><br><br>

        <label for="Efternamn">Insert last name:</label>
        <input type="text" name="Efternamn" id="Efternamn" required><br><br>

        <label for="Telefonnummer">Insert phone number:</label>
        <input type="text" name="Telefonnummer" id="Telefonnummer" required><br><br>

        <button type="submit" name="submit">Insert</button>
    </form><br><br>


    <form method="POST">
        <label for="user_id">Enter ID:</label>
        <input type="number" name="user_id" id="user_id" required>
        <button type="submit">Search</button>
    </form><br>
    <?php
    require_once 'UserDatabase.php';

    $db = new UserDatabase();
    if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST["user_id"])) {
        $userId = intval($_POST["user_id"]);

        $rows = $db->selectById($userId);
        function renderTable($rows, $collumns)
        {
            if (empty($rows)) {
                echo "No data to display.";
                return;
            }

            echo "<table border ='1'>";

            foreach ($rows as $row) {

                echo "<tr>";
                foreach ($collumns as $key => $name) {
                    echo "<th>" . $name . "</th>";
                }
                echo "</tr>";

                echo "<tr>";
                foreach ($collumns as $key => $name) {
                    echo "<td>" . $row[$key] . "</td>";
                }
                echo "</tr>";
            }

            echo "</table>";
        }

        renderTable($rows, ["id" => "Id", "Förnamn" => "Förnamn", "Efternamn" => "Efternamn", "Telefonnummer" => "Telefonnummer"]);
    }
    if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST["submit"])) {
        $db = new Database("users");
        $db->InsertUser();
    }

    ?>
</body>

</html>