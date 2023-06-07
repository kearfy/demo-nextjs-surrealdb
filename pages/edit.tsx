import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import PostEditor from '../components/PostEditor';
import {
    useAuthenticatedUser,
    usePost,
    useUpdatePost,
} from '../constants/Queries';
import { type PostID, type User } from '../constants/Types';
import Head from '../components/Head';

export default function Edit() {
    const router = useRouter();
    const { data: user } = useAuthenticatedUser();
    const id: PostID = (router.asPath.match(/#(.*)/)?.[1] ?? '') as PostID;
    const { isLoading: isSearching, data: post } = usePost<User>({
        id,
        fetchAuthor: true,
    });

    const { isLoading: isUpdatingPost, mutate: updatePost } = useUpdatePost({
        id,
        onUpdated: () => router.push('/'),
    });

    useEffect(() => {
        if (!id) router.push('/');
        if (!user) router.push('/signin');
    }, [id, user, router]);

    // Signed in users can only edit their own posts.
    const userIsAuthor = post?.author.id == user?.id;
    const errorMessage = isSearching
        ? 'Searching the post'
        : !userIsAuthor
        ? 'You are not the author of this post'
        : !post
        ? 'Post not found'
        : undefined;

    return (
        <>
            <Head title="Create post" robots="noindex, follow" />
            <PostEditor
                {...{
                    title: 'Edit post',
                    onSave: updatePost,
                    isLoading: isUpdatingPost,
                    post,
                    errorMessage,
                }}
            />
        </>
    );
}
