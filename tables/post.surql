------------------------
----- Demo Content -----
------------------------

-- We need to add the demo content before the field definitions, otherwise we cannot assign the precreated authors

CREATE post CONTENT {
    title: "SurrealDB is awesome!",
    author: user:cld0r7j69000108mg39w4fs4d,
    body: "Are you getting tired of serverless? Well, the next big thing is around the corner. Get buckled up!

SurrealDB allows to you write backendless applications, as I like to call it.",
    created: time::now(),
    updated: time::now()
};

CREATE post CONTENT {
    title: "This blog was written with SurrealDB",
    author: user:cld0r5z5q000008mg803v0dhe,
    body: "It was actually quite easy, and in total it took me about an hour and 30 minutes.

I ran a SurrealDB instance locally, migrate the database with the table & field definitions. This took around 2 minutes.

Now, I was able to spend the rest of my 88 minutes on writing the frontend. In this time I learned how to use tailwind and how to use react query too!

This is absolutely a bless",
    created: time::now(),
    updated: time::now()
};

CREATE post CONTENT {
    title: "Introducing: authentication!",
    author: user:cld0r7j69000108mg39w4fs4d,
    body: "You can now create an account and signin to create & manage posts!
    
We use some cool js & react-query magic here to make it work flawlessly. Check it out!",
    created: time::now(),
    updated: time::now()
};

-----------------------------
----- Table definitions -----
-----------------------------

DEFINE TABLE post SCHEMAFULL
    PERMISSIONS 
        FOR select FULL
        FOR create WHERE $scope = 'user'
        FOR update, delete WHERE $scope = 'user' && author = $auth.id;

DEFINE FIELD title   ON TABLE post TYPE string ASSERT $value != NONE;
DEFINE FIELD body    ON TABLE post TYPE string ASSERT $value != NONE;
DEFINE FIELD author  ON TABLE post VALUE $before OR $auth.id;
DEFINE FIELD created ON TABLE post VALUE $before OR time::now();
DEFINE FIELD updated ON TABLE post VALUE time::now();

