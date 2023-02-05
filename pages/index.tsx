import React from 'react';
import { usePosts } from '../lib/Queries';
import RenderPost from '../components/RenderPost';

export default function Index() {
    const { data: posts } = usePosts();

    return (
        <div className="flex flex-col gap-8 p-16">
            <h1 className="text-6xl mb-8">My Awesome Blog</h1>
            {posts?.map((post) => (
                <RenderPost post={post} key={post.id} />
            ))}
        </div>
    );
}
