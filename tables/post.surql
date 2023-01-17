DEFINE TABLE post SCHEMAFULL
    PERMISSIONS FULL;

DEFINE FIELD title   ON TABLE post TYPE string ASSERT $value != NONE;
DEFINE FIELD body    ON TABLE post TYPE string ASSERT $value != NONE;
DEFINE FIELD author  ON TABLE post TYPE string ASSERT $value != NONE;
DEFINE FIELD created ON TABLE post VALUE $before OR time::now();
DEFINE FIELD updated ON TABLE post VALUE time::now();

CREATE post CONTENT {
    title: "SurrealDB is awesome!",
    author: "Micha",
    body: "Are you getting tired of serverless? Well, the next big thing is around the corner. Get buckled up!

SurrealDB allows to you write backendless applications, as I like to call it."
};

CREATE post CONTENT {
    title: "This blog was written with SurrealDB",
    author: "Micha de Vries",
    body: "It was actually quite easy, and in total it took me about an hour and 30 minutes.

I ran a SurrealDB instance locally, migrate the database with the table & field definitions. This took around 2 minutes.

Now, I was able to spend the rest of my 88 minutes on writing the frontend. In this time I learned how to use tailwind and how to use react query too!

This is absolutely a bless"
};