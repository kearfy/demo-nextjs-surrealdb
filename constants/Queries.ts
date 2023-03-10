import { useMutation, useQuery } from '@tanstack/react-query';
import {
    SurrealInstance,
    SurrealSignin,
    SurrealSignout,
    SurrealSignup,
} from '../lib/Surreal';
import {
    Post,
    PostID,
    PostInput,
    SigninDetails,
    SignupDetails,
    User,
    UserID,
} from './Types';
import {
    processPostRecord,
    processUserRecord,
} from '../lib/ProcessDatabaseRecord';

// Contains wrapper react-query functions to make them easily reusable.

export function useAuthenticatedUser() {
    return useQuery({
        queryKey: ['authenticated-user'],
        queryFn: async (): Promise<User | null> => {
            const result = await SurrealInstance.opiniatedQuery<User>(
                `SELECT * FROM user WHERE id = $auth.id`
            );
            const data = (result[0] && result[0]?.result) ?? [];
            return data.map(processUserRecord).find((a) => !!a) ?? null;
        },
    });
}

export function useSurrealSignin({
    onSuccess,
    onFailure,
}: {
    onSuccess?: () => unknown;
    onFailure?: () => unknown;
}) {
    const { refetch } = useAuthenticatedUser();
    return useMutation({
        mutationFn: async (auth: SigninDetails) => {
            if (await SurrealSignin(auth)) {
                refetch();
                onSuccess?.();
            } else {
                onFailure?.();
            }
        },
    });
}

export function useSurrealSignup({
    onSuccess,
    onFailure,
}: {
    onSuccess?: () => unknown;
    onFailure?: () => unknown;
}) {
    const { refetch } = useAuthenticatedUser();
    return useMutation({
        mutationFn: async (auth: SignupDetails) => {
            if (await SurrealSignup(auth)) {
                refetch();
                onSuccess?.();
            } else {
                onFailure?.();
            }
        },
    });
}

export function useSurrealSignout({
    onSuccess,
}: {
    onSuccess?: () => unknown;
}) {
    const { refetch } = useAuthenticatedUser();
    return useMutation({
        mutationFn: async () => {
            await SurrealSignout();
            refetch();
            onSuccess?.();
        },
    });
}

////////////////////////
//////// POSTS /////////
////////////////////////

export function usePosts<TAuthorType extends UserID | User>({
    fetchAuthor,
}: {
    fetchAuthor: TAuthorType extends User ? true : false;
}) {
    return useQuery({
        queryKey: ['posts'],
        queryFn: async (): Promise<Post<TAuthorType>[]> => {
            const result = await SurrealInstance.opiniatedQuery<
                Post<TAuthorType>
            >(
                `SELECT * FROM post ORDER BY created DESC ${
                    fetchAuthor ? 'FETCH author' : ''
                }`
            );
            const data = (result[0] && result[0]?.result) ?? [];
            return data.map((post) => processPostRecord<TAuthorType>(post));
        },
    });
}

export function usePost<TAuthorType extends UserID | User>({
    id,
    fetchAuthor,
}: {
    id: PostID;
    fetchAuthor: TAuthorType extends User ? true : false;
}) {
    return useQuery({
        queryKey: ['post', id],
        queryFn: async (): Promise<Post<TAuthorType> | null> => {
            const result = await SurrealInstance.opiniatedQuery<
                Post<TAuthorType>
            >(
                `SELECT * FROM post WHERE id = $id ${
                    fetchAuthor ? 'FETCH author' : ''
                }`,
                { id }
            );
            const data = (result[0] && result[0]?.result) ?? [];
            if (!data[0]) return null;
            return processPostRecord<TAuthorType>(data[0]);
        },
    });
}

export function useCreatePost({
    onCreated,
}: {
    onCreated: (post: Post<UserID>) => unknown;
}) {
    return useMutation({
        mutationFn: async (post: PostInput) => {
            const result = await SurrealInstance.opiniatedQuery<Post<UserID>>(
                `CREATE post CONTENT {
                title: $title,
                body: $body
            }`,
                post
            );

            if (result[0] && result[0]?.result?.[0]) {
                onCreated(result[0] && result[0]?.result[0]);
            } else {
                throw new Error('Failed to create post');
            }
        },
    });
}

export function useUpdatePost({
    id,
    onUpdated,
}: {
    id: PostID;
    onUpdated?: (post: Post<UserID>) => unknown;
}) {
    return useMutation({
        mutationFn: async (post: PostInput) => {
            const result = await SurrealInstance.opiniatedQuery<Post>(
                `UPDATE post CONTENT {
                title: $title,
                body: $body
            } WHERE id = $id`,
                {
                    id,
                    ...post,
                }
            );

            if (result[0] && result[0]?.result?.[0]) {
                onUpdated?.(result[0] && result[0]?.result?.[0]);
            } else {
                throw new Error('Failed to create post');
            }
        },
    });
}

export function useRemovePost({
    id,
    onRemoved,
}: {
    id: PostID;
    onRemoved?: (id: PostID) => unknown;
}) {
    return useMutation({
        mutationFn: async () => {
            const result = await SurrealInstance.opiniatedQuery<Post>(
                `DELETE post WHERE id = $id`,
                {
                    id,
                }
            );

            if (result[0] && result[0]?.result) {
                onRemoved?.(id);
            } else {
                throw new Error('Failed to remove post');
            }
        },
    });
}
