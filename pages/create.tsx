import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import PostEditor from '../components/Editor';
import { useAuthenticatedUser, useCreatePost } from '../constants/Queries';

export default function Create() {
    const router = useRouter();
    const { data: user } = useAuthenticatedUser();

    useEffect(() => {
        if (!user) router.push('/signin');
    }, [user, router]);

    const { isLoading, mutate } = useCreatePost({
        onCreated: () => router.push('/')
    })

    return !isLoading ? (
        <div className='pt-40 mx-8 absolute w-screen min-h-screen'>
            <h2 className="font-bold mt-4 mb-12 text-5xl">Create</h2>
            <PostEditor onSave={mutate} />
        </div>
    ) : (
        <h2>Submitting post....</h2>
    )
}