DEFINE TABLE post SCHEMAFULL
    PERMISSIONS FULL;

DEFINE FIELD title   ON TABLE post TYPE string ASSERT $value != NONE;
DEFINE FIELD body    ON TABLE post TYPE string ASSERT $value != NONE;
DEFINE FIELD author  ON TABLE post TYPE string ASSERT $value != NONE;
DEFINE FIELD created ON TABLE post VALUE $before OR time::now();
DEFINE FIELD updated ON TABLE post VALUE time::now();