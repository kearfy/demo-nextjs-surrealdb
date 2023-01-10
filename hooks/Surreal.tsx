import React, { ReactNode, useEffect, useState } from 'react';
import Surreal, { Result } from 'surrealdb.js';

export const SurrealEndpoint = `http://localhost:8000/rpc`;
export const SurrealNamespace = 'demo'
export const SurrealDatabase = 'demo'
export const SurrealInstance = new Surreal(SurrealEndpoint);

export function SurrealProvider({ children }: { children: ReactNode }) {
    const [ready, setReady] = useState<boolean>(false);
    useEffect(() => {
        (async () => {
            await SurrealInit();
            setReady(true);
        })();
    }, []);

    return <>{ready && children}</>;
}

export const SurrealInit = async () => {
    await SurrealInstance.use(SurrealNamespace, SurrealDatabase);
};

export const SurrealQuery = async <T = unknown>(
    query: string,
    vars?: Record<string, unknown>
): Promise<Result<T[]>[]> => SurrealInstance.query<Result<T[]>[]>(query, vars);