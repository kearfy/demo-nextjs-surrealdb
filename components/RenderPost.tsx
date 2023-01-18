import React from "react";
import Link from "next/link";
import { useRemovePost } from "../constants/Queries";
import { Post, PostID, User } from "../constants/Types";

export default function RenderPost({
    post,
    onRemoved,
    showAuthorTools
}: {
    post: Post<User>;
    onRemoved?: (id: PostID) => unknown;
    showAuthorTools?: boolean;
}) {
    const { isLoading: isRemovingPost, mutate: removePost } = useRemovePost({ 
        id: post.id,
        onRemoved
    });

    return (
        <div className="p-8 bg-slate-200 rounded-lg">
            <h3 className="font-semibold text-3xl mt-1 mb-3">{post.title}</h3>
            <div className="flex gap-2.5 items-center mb-4">
                <div className="rounded-full bg-slate-300 w-7 h-7 text-sm flex justify-center items-center">
                    {
                        post.author.name.split(' ').length > 1 
                            ? post.author.name.split(' ')[0][0].toUpperCase() + post.author.name.split(' ').pop()?.[0].toUpperCase()
                            : post.author.name.slice(0, 2).toUpperCase()
                    }
                </div>
                <p className="font-light">{post.author.name}</p>
            </div>
            <p className="whitespace-pre-wrap">
                {isRemovingPost ? "Removing post" : post.body}
            </p>

            {showAuthorTools && (
                <div className="flex gap-4">
                    <div className="mt-8 bg-blue-600 text-white px-4 py-2 rounded-md">
                        <Link href={`/edit#${post.id}`}>edit</Link>
                    </div>
                    <button onClick={() => removePost()} className="mt-8 bg-red-600 text-white px-4 py-2 rounded-md">
                        {isRemovingPost ? "Working" : "delete"}
                    </button>
                </div>
            )}
        </div>
    )
}