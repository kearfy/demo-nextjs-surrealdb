import NextHead from 'next/head';
import React from 'react';
import { HeadDefaults } from '../constants/HeadDefaults';

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
                {title
                    ? `${title}${HeadDefaults.titleSuffix}`
                    : HeadDefaults.titleEmpty}
            </title>

            <meta name="application-name" content={HeadDefaults.titleEmpty} />
            {HeadDefaults.icon && (
                <link rel="apple-touch-icon" href={HeadDefaults.icon} />
            )}

            <meta name="charset" content="UTF-8" />
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1, minimum-scale=1"
            />
            <meta name="robots" content={robots ?? 'index, follow'} />

            <meta
                name="title"
                content={
                    title
                        ? `${title}${HeadDefaults.titleSuffix}`
                        : HeadDefaults.titleEmpty
                }
            />

            <meta
                name="og:title"
                content={
                    title
                        ? `${title}${HeadDefaults.titleSuffix}`
                        : HeadDefaults.titleEmpty
                }
            />
            <meta name="og:type" content="website" />
            <meta name="og:url" content={HeadDefaults.url} />
            {HeadDefaults.primaryImage && (
                <meta
                    name="og:image"
                    itemProp="image primaryImageOfPage"
                    content={HeadDefaults.primaryImage}
                />
            )}
            <meta
                name="og:site_name"
                content={
                    title
                        ? `${title}${HeadDefaults.titleSuffix}`
                        : HeadDefaults.titleEmpty
                }
            />

            <meta
                name="twitter:title"
                content={
                    title
                        ? `${title}${HeadDefaults.titleSuffix}`
                        : HeadDefaults.titleEmpty
                }
            />
            <meta name="twitter:card" content="summary" />

            <meta
                name="description"
                content={description ?? HeadDefaults.description}
            />
            <meta
                name="og:description"
                content={description ?? HeadDefaults.description}
            />
            <meta
                name="twitter:description"
                content={description ?? HeadDefaults.description}
            />
        </NextHead>
    );
}
