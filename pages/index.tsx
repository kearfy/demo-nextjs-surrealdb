import React from 'react';
import RenderPost from '../components/RenderPost';
import { useAuthenticatedUser, usePosts } from '../constants/Queries';
import { User } from '../constants/Types';
import Head from '../components/Head';

export default function Home() {
    const { isLoading, error, data, refetch } = usePosts<User>({
        fetchAuthor: true,
    });

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
            <Head title="test" />
            <div className="mt-48 mx-8">
                <h2 className="font-bold mt-4 mb-12 text-5xl">Posts</h2>
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
