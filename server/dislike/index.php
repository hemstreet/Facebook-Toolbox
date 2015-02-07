<?php

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

$actions = [
    'create' => function ($postKey, $userKey) use ($conn) {
        //returns status on insert into database

        $sql = 'SELECT * FROM dislike WHERE postKey = \'' . $postKey . '\'';

        if ($result = $conn->query($sql)) {

            $row = $result->fetch_assoc();

            if (!is_null($row)) {
                $record = [
                    'postKey' => $row['postKey'],
                    'users' => json_decode($row['users'], true),
                    'count' => $row['count']
                ];

                $index = array_search($userKey, $record['users']);

                if ($index !== false) {

                    unset($record['users'][$index]);

                    $record['count']--;

                } else {

                    $record['users'][] = $userKey;
                    $record['count']++;

                };

//                $sql = 'INSERT INTO `dislike` (`postKey`, `users`, `count`) VALUES (\'' . $record['postKey'] . '\', \'' . json_encode($record['users']) . '\',' . $record['count'] . ') ON DUPLICATE KEY UPDATE `users` = \''.json_encode($record['users']).'\', count = '.$record['count'];
                $sql = "UPDATE `dislike` SET `count`=" . $record['count'] . ",`users`='" . json_encode($record['users']) . "' WHERE postKey = '" . $record['postKey'] . "'";

            } else {

                $record = [
                    'postKey' => $postKey,
                    'users' => [$userKey],
                    'count' => 1
                ];

                $sql = 'INSERT INTO `dislike` (`postKey`, `users`, `count`) VALUES (\'' . $record['postKey'] . '\', \'' . json_encode($record['users']) . '\',' . $record['count'] . ')';

            }

            $result->close();

        } else {

            $record = [
                'postKey' => $postKey,
                'users' => [$userKey],
                'count' => 1
            ];

            $sql = 'INSERT INTO `dislike` (`postKey`, `users`, `count`) VALUES (\'' . $record['postKey'] . '\', \'' . json_encode($record['users']) . '\',' . $record['count'] . ')';

        }


        $result = $conn->query($sql);

        return $record;


    },

    'read' => function ($postKey) use ($conn) {

        $record = null;

        $sql = 'SELECT * FROM dislike WHERE postKey = \'' . $postKey . '\'';

        if ($result = $conn->query($sql)) {

            $row = $result->fetch_assoc();

            if (!is_null($row)) {

                $record = [
                    'postKey' => $row['postKey'],
                    'users' => json_decode($row['users'], true),
                    'count' => $row['count']
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
        $result = 'No! =[';

}

echo $result;


//get a post by post id
// - each story or post has its own story-key.
//   used to lookup the amount of dislikes on that post

/*
 * Create a dislike
 *   x
//returns
/*
 * number of dislikes
 * who disliked it
 */


//echo "Connected successfully";

// Close the connect to the database server
$conn->close();



