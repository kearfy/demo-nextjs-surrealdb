import React from "react";
import { useMutation, useQuery } from '@tanstack/react-query';
import { SurrealQuery } from "../hooks/Surreal";
import Link from "next/link";

export type PostID = `post:${string}`;
export type Post = {
    id: PostID;
    title: string;
    body: string;
    author: string;
    created: Date;
    updated: Date;
};

export default function Posts() {
    const { isLoading, error, data, refetch } = useQuery({
        queryKey: ['posts'],
        queryFn: async () => {
            const result = await SurrealQuery<Post>(`SELECT * FROM post ORDER BY created DESC`);
            const data = (result[0] && result[0]?.result) ?? [];
            return data.map(post => ({
                ...post,
                created: new Date(post.created),
                updated: new Date(post.updated)
            }))
        },
    });

    if (isLoading) return <h2 className="text-bold mx-8 mt-4 mb-8 text-5xl">Loading posts...</h2>;
    if (error) return <h2 className="text-bold mx-8 mt-4 mb-8 text-5xl">Failed to load posts</h2>;

    return (
        <>
            <h2 className="font-bold mx-8 mt-4 mb-12 text-5xl">Posts</h2>
            {
                data?.map(post => (
                    <RenderPost post={post} key={post.id} onRemoved={() => refetch()} />
                ))
            }
            {data?.length == 0 && <p className="mx-8">No posts available, create one!</p>}
        </>
    )
}

export function RenderPost({
    post,
    onRemoved
}: {
    post: Post;
    onRemoved?: (id: PostID) => void;
}) {
    const { isLoading: isRemovingPost, mutate: removePost } = useMutation({
        mutationFn: async () => {
            const result = await SurrealQuery<Post>(`DELETE post WHERE id = $id`, { id: post.id });

            if (result[0] && result[0]?.result) {
                onRemoved?.(post.id);
            } else {
                throw new Error("Failed to remove post");
            }
        },
    });

    return (
        <div className="p-8 mx-8 mb-16 bg-slate-200 rounded-lg">
            <h3 className="font-semibold text-3xl mt-1 mb-3">{post.title}</h3>
            <div className="flex gap-2.5 items-center mb-4">
                <div className="rounded-full bg-slate-300 w-7 h-7 text-sm flex justify-center items-center">
                    {
                        post.author.split(' ').length > 1 
                            ? post.author.split(' ')[0][0].toUpperCase() + post.author.split(' ').pop()?.[0].toUpperCase()
                            : post.author.slice(0, 2).toUpperCase()
                    }
                </div>
                <p className="font-light">{post.author}</p>
            </div>
            <p className="whitespace-pre-wrap">
                {isRemovingPost ? "Removing post" : post.body}
            </p>

            <div className="flex gap-4">
                <div className="mt-8 bg-blue-600 text-white px-4 py-2 rounded-md">
                    <Link href={`/edit/${post.id}`}>edit</Link>
                </div>
                <button onClick={() => removePost()} className="mt-8 bg-red-600 text-white px-4 py-2 rounded-md">
                    {isRemovingPost ? "Working" : "delete"}
                </button>
            </div>
        </div>
    )
}