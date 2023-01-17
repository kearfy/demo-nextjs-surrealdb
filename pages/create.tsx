import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { SurrealQuery } from '../hooks/Surreal';
import { Post } from '../components/Posts';
import { useRouter } from 'next/router';
import Button from '../components/Button';
import LinkButton from '../components/LinkButton';

type PostInput = Pick<Post, 'title' | 'author' | 'body'>;

export default function Create() {
    const router = useRouter();
    const { register, handleSubmit } = useForm<PostInput>();

    const { isLoading, mutate } = useMutation({
        mutationFn: async (post: PostInput) => {
            const result = await SurrealQuery<Post>(`CREATE post CONTENT {
                title: $title,
                author: $author,
                body: $body
            }`, post);

            if (result[0] && result[0]?.result) {
                router.push('/');
            } else {
                throw new Error("Failed to create post");
            }
        },
    });

    return !isLoading ? (
        <>
            <div className='p-8 flex'>
                <LinkButton href="/">Back to overview</LinkButton>
            </div>
            <form onSubmit={handleSubmit((post) => mutate(post))}>
                <input {...register('title')} placeholder="title" required className="bg-gray-200 block px-6 py-4 rounded-md text-lg my-4 mx-8 w-96 max-w-full" />
                <input {...register('author')} placeholder="author" required className="bg-gray-200 block px-6 py-4 rounded-md text-lg my-4 mx-8 w-96 max-w-full" />
                <textarea {...register('body')} placeholder="body" required className="bg-gray-200 block px-6 py-4 rounded-md text-lg my-4 mx-8 w-96 max-w-full" rows={10} />
                <Button className="mx-8 mt-4">
                    submit
                </Button>
            </form>
        </>
    ) : (
        <h2>Submitting post....</h2>
    )
}