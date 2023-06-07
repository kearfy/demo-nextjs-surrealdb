import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import PostEditor from '../components/PostEditor';
import {
    useAuthenticatedUser,
    usePost,
    useUpdatePost,
} from '../constants/Queries';
import { type User } from '../constants/Types';
import Head from '../components/Head';
import { useIdFromHash } from '../lib/useIdFromHash';

export default function Edit() {
    const router = useRouter();
    const { data: user, isLoading: isUserLoading } = useAuthenticatedUser();
    const id = useIdFromHash('post');
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
        if (!isUserLoading && !user) router.push('/signin');
    }, [id, user, isUserLoading, router]);

    // Signed in users can only edit their own posts.
    const userIsAuthor = post?.author.id == user?.id;
    const errorMessage = isSearching
        ? 'Searching the post'
        : !post
        ? 'Post not found'
        : !userIsAuthor
        ? 'You are not the author of this post'
        : undefined;

    return (
        <>
            <Head title="Edit post" robots="noindex, follow" />
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
