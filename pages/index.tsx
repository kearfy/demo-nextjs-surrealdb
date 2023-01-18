import React from 'react';
import RenderPost from '../components/RenderPost';
import { useAuthenticatedUser, usePosts } from '../constants/Queries';
import { User } from '../constants/Types';

export default function Home() {
    const { isLoading, error, data, refetch } = usePosts<User>({
        fetchAuthor: true,
    });

    const { data: user } = useAuthenticatedUser();

    if (isLoading)
        return (
            <h2 className="text-bold mx-8 mt-4 mb-8 text-5xl">
                Loading posts...
            </h2>
        );
    if (error)
        return (
            <h2 className="text-bold mx-8 mt-4 mb-8 text-5xl">
                Failed to load posts
            </h2>
        );

    return (
        <div className="mt-48 mx-8">
            <h2 className="font-bold mt-4 mb-12 text-5xl">Posts</h2>
            {data?.length == 0 ? (
                <p>No posts available, create one!</p>
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
    );
}
