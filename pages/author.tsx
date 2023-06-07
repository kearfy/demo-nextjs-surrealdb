import React, { useEffect } from 'react';
import RenderPost from '../components/RenderPost';
import { useAuthenticatedUser, usePosts, useUser } from '../constants/Queries';
import { type User } from '../constants/Types';
import Head from '../components/Head';
import { useIdFromHash } from '../lib/useIdFromHash';
import { useRouter } from 'next/router';

export default function Home() {
    const router = useRouter();
    const author = useIdFromHash('user');
    const { isLoading, error, data, refetch } = usePosts<User>({
        fetchAuthor: true,
        author,
    });

    const { data: authorProfile } = useUser({ id: author });

    useEffect(() => {
        if (!author) router.push('/');
    }, [author, router]);

    const { data: user } = useAuthenticatedUser();
    const message = isLoading
        ? 'Loading posts...'
        : error
        ? 'Failed to load posts'
        : data?.length == 0
        ? 'No posts available, create one!'
        : undefined;

    return (
        <>
            <Head title={`Posts by ${authorProfile?.name}`} />
            <div className="mt-48 mx-8">
                <h2 className="font-bold mt-4 mb-12 text-5xl">{`Posts by ${authorProfile?.name}`}</h2>
                {message ? (
                    <p>{message}</p>
                ) : (
                    <div className="flex flex-col gap-12">
                        {data?.map((post) => (
                            <RenderPost
                                post={post}
                                key={post.id}
                                onRemoved={() => refetch()}
                                showAuthorTools={post.author.id === user?.id}
                            />
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}
