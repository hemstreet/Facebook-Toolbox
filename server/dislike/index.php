<?php

/**
 * Plugin Name: Facebook Toolbox Server
 * Author: Jonathan Naylor, Jon Hemstreet
 * Email: jonathanfranklinnaylor@gmail.com
 * Version: 0.8.4
 * Description: Provides endpoints to facilitate the features of Facebook Toolbox
 */


$tableName = 'dislike';

// Include credentials
include_once('../credentials.php');

// Create connection
$conn = new mysqli(
    $credentials['host'],
    $credentials['username'],
    $credentials['password'],
    $credentials['database']
);

// Check connection
if ($conn->connect_error) {

    die("Connection failed: " . $conn->connect_error);

}

function santitizeData($conn, $data) {
    $newData = mysqli_real_escape_string($conn, $data);

    return $newData;
}


$actions = [
    'create' => function ($postKey, $userKey) use ($conn) {
        //returns status on insert into database

        $sql = 'SELECT * FROM dislike WHERE postKey = \'' . santitizeData($conn, $postKey) . '\'';

        $result = $conn->query($sql);

        if ($result && $result->num_rows > 0) {

            $row = $result->fetch_assoc();

            $users = json_decode($row['users'], true);

            $row['users'] = array_values($users ? $users : []);

            if (!is_null($row)) {
                $record = [
                    'postKey' => $row['postKey'],
                    'users' => $row['users'],
                    'count' => count($row['users'])
                ];

                $index = array_search($userKey, $record['users']);

                if (($index !== false && $index !== null)) {

                    unset($record['users'][$index]);
                    $record['users'] = array_values($record['users']);

                    $record['count']--;

                } else {

                    $record['users'][] = $userKey;
                    $record['count']++;

                };

//                $sql = 'INSERT INTO `dislike` (`postKey`, `users`, `count`) VALUES (\'' . $record['postKey'] . '\', \'' . json_encode($record['users']) . '\',' . $record['count'] . ') ON DUPLICATE KEY UPDATE `users` = \''.json_encode($record['users']).'\', count = '.$record['count'];
                $sql = "UPDATE `dislike` SET `count`=" . santitizeData($conn, $record['count']) . ",`users`='" . santitizeData($conn, json_encode($record['users'])) . "' WHERE postKey = '" . santitizeData($conn, $record['postKey']) . "'";

            } else {

                $record = [
                    'postKey' => $postKey,
                    'users' => [$userKey],
                    'count' => 1
                ];

                $sql = 'INSERT INTO `dislike` (`postKey`, `users`, `count`) VALUES (\'' . santitizeData($conn, $record['postKey']) . '\', \'' . santitizeData($conn, json_encode($record['users'])) . '\',' . santitizeData($conn, $record['count']) . ')';

            }

            $result->close();

        } else {

            $record = [
                'postKey' => $postKey,
                'users' => [$userKey],
                'count' => 1
            ];

            $sql = 'INSERT INTO `dislike` (`postKey`, `users`, `count`) VALUES (\'' . santitizeData($conn, $record['postKey']) . '\', \'' . santitizeData($conn, json_encode($record['users'])) . '\',' . santitizeData($conn, $record['count']) . ')';

        }


        $conn->query($sql);

        return $record;


    },

    'read' => function ($postKey) use ($conn) {

        $record = null;

        $sql = 'SELECT * FROM dislike WHERE postKey = \'' . santitizeData($conn, $postKey) . '\'';

        if ($result = $conn->query($sql)) {

            $row = $result->fetch_assoc();

            $users = json_decode($row['users'], true);

            $row['users'] = array_values($users ? $users : []);

            if (!is_null($row)) {

                $record = [
                    'postKey' => $row['postKey'],
                    'users' => $row['users'],
                    'count' => count($row['users'])
                ];

            }

        }

        return $record;

    }

];

parse_str($_SERVER['QUERY_STRING']);

/**
 * @var $post
 * @var $user
 */

switch ($action) {

    case 'read':
        $result = json_encode($actions[$action]($post));

        break;

    case 'create':
        $result = json_encode($actions[$action]($post, $user));

        break;

    default:
        $result = 'No =[';

}

echo $result;

$conn->close();




