import NextHead from 'next/head';
import React from 'react';

export default function Head({
    title,
    description,
    robots,
}: {
    title?: string;
    description?: string;
    robots?: string;
}) {
    return (
        <NextHead>
            <title>
                {title ? `${title} - Demo blog` : 'SurrealDB Demo blog'}
            </title>

            <meta name="application-name" content="SurrealDB Demo blog" />
            <link rel="apple-touch-icon" href="/icon.png" />

            <meta name="charset" content="UTF-8" />
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1, minimum-scale=1"
            />
            <meta name="robots" content={robots ?? 'index, follow'} />

            <meta
                name="title"
                content={title ? `${title} - Demo blog` : 'SurrealDB Demo blog'}
            />

            <meta
                name="og:title"
                content={title ? `${title} - Demo blog` : 'SurrealDB Demo blog'}
            />
            <meta name="og:type" content="website" />
            <meta name="og:url" content="http://localhost:8000/" />
            <meta
                name="og:image"
                itemProp="image primaryImageOfPage"
                content="https://raw.githubusercontent.com/surrealdb/surrealdb/main/img/icon.png"
            />
            <meta
                name="og:site_name"
                content={title ? `${title} - Demo blog` : 'SurrealDB Demo blog'}
            />

            <meta
                name="twitter:title"
                content={title ? `${title} - Demo blog` : 'SurrealDB Demo blog'}
            />
            <meta name="twitter:card" content="summary" />

            <meta
                name="description"
                content={
                    description ??
                    "This is a demo application, in the form of a blog. It's written with SurrealDB, NextJS, tailwind, react-query, and a lot more :D"
                }
            />
            <meta
                name="og:description"
                content={
                    description ??
                    "This is a demo application, in the form of a blog. It's written with SurrealDB, NextJS, tailwind, react-query, and a lot more :D"
                }
            />
            <meta
                name="twitter:description"
                content={
                    description ??
                    "This is a demo application, in the form of a blog. It's written with SurrealDB, NextJS, tailwind, react-query, and a lot more :D"
                }
            />
        </NextHead>
    );
}
