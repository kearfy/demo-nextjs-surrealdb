import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import PostEditor from '../components/PostEditor';
import {
    useAuthenticatedUser,
    usePost,
    useUpdatePost,
} from '../constants/Queries';
import { PostID, User } from '../constants/Types';

export default function Edit() {
    const router = useRouter();
    const { data: user } = useAuthenticatedUser();
    const rawID = router.asPath.match(/#(.*)/)?.[1];
    const id: PostID = rawID as PostID;

    const { isLoading: isSearching, data: post } = usePost<User>({
        id,
        fetchAuthor: true,
    });

    const { isLoading: isUpdatingPost, mutate: updatePost } = useUpdatePost({
        id,
        onUpdated: () => router.push('/'),
    });

    useEffect(() => {
        if (!rawID) router.push('/');
    }, [rawID, router]);

    useEffect(() => {
        if (!user) router.push('/signin');
    }, [user, router]);

    const userIsAuthor = post?.author.id == user?.id;
    const errorMessage = isSearching
        ? 'Searching the post'
        : !userIsAuthor
        ? 'You are not the author of this post'
        : !post
        ? 'Post not found'
        : undefined;

    return (
        <PostEditor
            {...{
                title: 'Edit post',
                onSave: updatePost,
                isLoading: isUpdatingPost,
                post,
                errorMessage,
            }}
        />
    );
}
