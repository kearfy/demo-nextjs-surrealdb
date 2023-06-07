import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export function useIdFromHash<T extends string, U = `${T}:${string}`>(
    table: T
) {
    const router = useRouter();
    const initial = extractId<U>(table, router.asPath);
    const [id, setId] = useState(initial);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const handler = () => {
                setId(extractId<U>(table, location.hash));
            };

            window.addEventListener('hashchange', handler);
            return () => window.removeEventListener('hashchange', handler);
        }
    });

    return id;
}

function extractId<U>(table: string, url: string) {
    const regex = new RegExp(`#(?:${table}:)?([a-z0-9]+)$`);
    const id = url.match(regex)?.[1];
    if (id) return `${table}:${id}` as U;
}
