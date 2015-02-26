# Titans-Toolbox Server

Using the default hosted database
==

Server client for handling Facebook's requests: read & create.

https://jonhemstreet.com/facebook/dislike/?action=read&post={postKey}

https://jonhemstreet.com/facebook/dislike/?action=create&post={postKey}&user={userKey}


postKey is currently the data-timestamp or data-time attribute ( a unique identifier ). The only uniform key across the whole site that I have found is the timestamps on the post. Future 
version may be a hashed timestamp + post key combination.

If you wish to host your own server
==

create a `credentials.php` file in the server's root directory ( the same one this readme is in ).

```
    <?php
    $credentials = [
        'host'     => 'https://example.com',
        'database' => 'database_name',
        'username' => 'database_user',
        'password' => 'database_password'
    ];
```