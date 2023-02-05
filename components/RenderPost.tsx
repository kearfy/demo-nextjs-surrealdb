import React from 'react';
import { Post } from '../constants/Types';

export default function RenderPost({ post }: { post: Post }) {
    return (
        <div className="flex flex-col gap-2 bg-zinc-200 rounded-3xl py-10 px-12">
            <h2 className="text-4xl">{post.title}</h2>
            <p className="text-zinc-600 pb-2">
                By {post.author}, {post.created.getDate()}-
                {post.created.getMonth() + 1}
            </p>
            <p>{post.body}</p>
        </div>
    );
}
