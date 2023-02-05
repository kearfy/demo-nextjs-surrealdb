DEFINE TABLE post SCHEMAFULL
    PERMISSIONS 
        FOR select FULL
        FOR create, update, delete NONE;

DEFINE FIELD title ON post TYPE string ASSERT $value != NONE;
DEFINE FIELD author ON post TYPE string ASSERT $value != NONE;
DEFINE FIELD body ON post TYPE string ASSERT $value != NONE;
DEFINE FIELD created ON post VALUE $before OR time::now();
DEFINE FIELD updated ON post VALUE time::now();