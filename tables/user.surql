DEFINE TABLE user SCHEMAFULL
    PERMISSIONS 
        FOR select FULL
        FOR update, delete WHERE $scope = 'user' && id = $auth.id;

DEFINE SCOPE user 
    SIGNUP ( CREATE user SET name = $name, username = $username, password = crypto::argon2::generate($password) )
    SIGNIN ( SELECT * FROM user WHERE username = $username AND crypto::argon2::compare(password, $password));

DEFINE FIELD name       ON TABLE user TYPE string ASSERT $value != NONE;
DEFINE FIELD username   ON TABLE user TYPE string ASSERT $value != NONE;
DEFINE FIELD password   ON TABLE user TYPE string ASSERT $value != NONE
    PERMISSIONS 
        FOR select NONE
        FOR update, delete WHERE $scope = 'user' && id = $auth.id;

DEFINE FIELD created    ON TABLE user VALUE $before OR time::now();
DEFINE FIELD updated    ON TABLE user VALUE time::now();

DEFINE INDEX username ON TABLE user COLUMNS username UNIQUE;

------------------------
----- Demo Content -----
------------------------

CREATE user:cld0r5z5q000008mg803v0dhe CONTENT {
    name: "Micha de Vries",
    username: "michadevries",
    password: crypto::argon2::generate("Password1!"),
    created: time::now(),
    updated: time::now()
};

CREATE user:cld0r7j69000108mg39w4fs4d CONTENT {
    name: "John Doe",
    username: "johndoe",
    password: crypto::argon2::generate("Password1!"),
    created: time::now(),
    updated: time::now()
};