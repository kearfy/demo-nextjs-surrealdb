import React from 'react';
import { useRemovePost } from '../constants/Queries';
import { type Post, type PostID, type User } from '../constants/Types';
import LinkButton from './form/LinkButton';
import Button from './form/Button';

export default function RenderPost({
    post,
    onRemoved,
    showAuthorTools,
}: {
    post: Post<User>;
    onRemoved?: (id: PostID) => unknown;
    showAuthorTools?: boolean;
}) {
    const { isLoading: isRemovingPost, mutate: removePost } = useRemovePost({
        id: post.id,
        onRemoved,
    });

    return (
        <div className="p-8 bg-slate-200 rounded-lg">
            <h3 className="font-semibold text-3xl mt-1 mb-3">{post.title}</h3>
            <div className="flex gap-2.5 items-center mb-4">
                <div className="rounded-full bg-slate-300 w-7 h-7 text-sm flex justify-center items-center">
                    {/* If author name contains of multiple segments */}
                    {post.author.name.split(' ').length > 1
                        ? // Grab the first letter from first and last segment.
                          post.author.name.split(' ')[0][0].toUpperCase() +
                          post.author.name.split(' ').pop()?.[0].toUpperCase()
                        : // Otherwise grab first two letters
                          post.author.name.slice(0, 2).toUpperCase()}
                </div>
                <p className="font-light">{post.author.name}</p>
            </div>
            <p className="whitespace-pre-wrap">
                {isRemovingPost ? 'Removing post' : post.body}
            </p>

            {/* Show edit & delete button posts authored by signed in user */}
            {showAuthorTools && (
                <div className="flex gap-4">
                    <LinkButton href={`/edit#${post.id}`} size="small">
                        edit
                    </LinkButton>
                    <Button
                        onClick={() => removePost()}
                        size="small"
                        color="red"
                    >
                        {isRemovingPost ? 'Working' : 'delete'}
                    </Button>
                </div>
            )}
        </div>
    );
}
