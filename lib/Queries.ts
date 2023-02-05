import { useQuery } from '@tanstack/react-query';
import AwaitedSurreal from '@theopensource-company/awaited-surrealdb';
import { Post } from '../constants/Types';

export const SurrealInstance = new AwaitedSurreal({
    endpoint:
        process.env.NEXT_PUBLIC_SURREAL_ENDPOINT ?? 'http://localhost:8000',
    namespace: process.env.NEXT_PUBLIC_SURREAL_NAMESPACE ?? 'test',
    database: process.env.NEXT_PUBLIC_SURREAL_DATABASE ?? 'test',
});

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
            const result = await SurrealInstance.opiniatedQuery<Post>(
                'SELECT * FROM post ORDER BY created DESC'
            );

            if (!result?.[0]?.result) return;
            return result[0].result.map(processPostRecord);
        },
    });
