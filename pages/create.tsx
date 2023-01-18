import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import PostEditor from '../components/PostEditor';
import { useAuthenticatedUser, useCreatePost } from '../constants/Queries';

export default function Create() {
    const router = useRouter();
    const { data: user } = useAuthenticatedUser();
    const { isLoading, mutate } = useCreatePost({
        onCreated: () => router.push('/')
    });

    useEffect(() => {
        if (!user) router.push('/signin');
    }, [user, router]);

    return (
        <PostEditor {...{
            title: "Create post",
            isLoading,
            onSave: mutate
        }} />
    )
}