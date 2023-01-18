import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import PostEditor from '../components/Editor';
import { useAuthenticatedUser, usePost, useUpdatePost } from '../constants/Queries';
import { PostID, User } from '../constants/Types';

export default function Edit() {
    const router = useRouter();
    const { data: user } = useAuthenticatedUser();
    const rawID = router.asPath.match(/#(.*)/)?.[1];
    
    useEffect(() => {
        if (!rawID) router.push('/');
    }, [rawID, router]);

    useEffect(() => {
        if (!user) router.push('/signin');
    }, [user, router]);

    const id: PostID = rawID as PostID;

    const { isLoading: isSearching, data: post } = usePost<User>({
        id,
        fetchAuthor: true
    })

    const { isLoading: isUpdatingPost, mutate: updatePost } = useUpdatePost({
        id,
        onUpdated: () => router.push('/')
    });

    const userIsAuthor = post?.author.id == user?.id;

    return (
        <div className='pt-40 mx-8 absolute w-screen min-h-screen'>
            <h2 className="font-bold mt-4 mb-12 text-5xl">Edit</h2>
            {
                !isSearching && !isUpdatingPost && post && userIsAuthor ? (
                    <PostEditor onSave={updatePost} post={post} />
                ) : isSearching ? (
                    <p>Loading...</p>
                ) : isUpdatingPost ? (
                    <p>updating</p>
                ) : !userIsAuthor ? (
                    <p>You are not the author of this post</p>
                ) : (
                    <p>Post not found</p>
                )
            }
        </div>
    );
}