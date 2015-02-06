<?php

$sql = "CREATE DATABASE titan_facebook_plugin";

if ($conn->query($sql) === TRUE) {
    echo "Database created successfully";

} else {
    echo "Error creating database: " . $conn->error;

}