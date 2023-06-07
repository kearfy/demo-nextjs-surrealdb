import { useQuery } from '@tanstack/react-query';
import { Post } from '../constants/Types';
import { Surreal } from 'surrealdb.js';

export const SurrealInstance = new Surreal(
    process.env.NEXT_PUBLIC_SURREAL_ENDPOINT ?? 'http://localhost:8000',
    {
        ns: process.env.NEXT_PUBLIC_SURREAL_NAMESPACE ?? 'test',
        db: process.env.NEXT_PUBLIC_SURREAL_DATABASE ?? 'test',
    }
);

export function processPostRecord(post: Post) {
    return {
        ...post,
        created: new Date(post.created),
        updated: new Date(post.updated),
    };
}

export const usePosts = () =>
    useQuery({
        queryKey: ['posts'],
        queryFn: async () => {
            const result = await SurrealInstance.query<[Post[]]>(
                'SELECT * FROM post ORDER BY created DESC'
            );

            if (!result?.[0]?.result) return;
            return result[0].result.map(processPostRecord);
        },
    });
