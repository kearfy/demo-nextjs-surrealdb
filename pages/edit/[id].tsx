import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery } from '@tanstack/react-query';
import { SurrealQuery } from '../../hooks/Surreal';
import { Post } from '../../components/Posts';
import { useRouter } from 'next/router';
import Button from '../../components/Button';
import LinkButton from '../../components/LinkButton';

type PostInput = Pick<Post, 'title' | 'author' | 'body'>;

export default function Create() {
    const router = useRouter();
    const { register, handleSubmit } = useForm<PostInput>();
    const { id } = router.query;
    
    if (!id) router.push('/');

    const { isLoading: isSearching, data: post } = useQuery({
        queryKey: ['post', id],
        queryFn: async () => {
            const result = await SurrealQuery<Post>(`SELECT * FROM post WHERE id = $id`, { id });
            const data = (result[0] && result[0]?.result) ?? [];
            if (!data[0]) return;
            return {
                ...data[0],
                created: new Date(data[0].created),
                updated: new Date(data[0].updated)
            }
        },
    });

    const { isLoading: isUpdatingPost, mutate: updatePost } = useMutation({
        mutationFn: async (post: PostInput) => {
            const result = await SurrealQuery<Post>(`UPDATE post CONTENT {
                title: $title,
                author: $author,
                body: $body
            } WHERE id = $id`, {
                id,
                ...post
            });

            if (result[0] && result[0]?.result) {
                router.push('/');
            } else {
                throw new Error("Failed to create post");
            }
        },
    });

    return !isSearching && !isUpdatingPost && post ? (
        <>
            <div className='p-8 flex'>
                <LinkButton href="/">Back to overview</LinkButton>
            </div>
            <form onSubmit={handleSubmit((post) => updatePost(post))}>
                <input {...register('title')} defaultValue={post.title} placeholder="title" required className="bg-gray-200 block px-6 py-4 rounded-md text-lg my-4 mx-8 w-96 max-w-full" />
                <input {...register('author')} defaultValue={post.author} placeholder="author" required className="bg-gray-200 block px-6 py-4 rounded-md text-lg my-4 mx-8 w-96 max-w-full" />
                <textarea {...register('body')} defaultValue={post.body} placeholder="body" required className="bg-gray-200 block px-6 py-4 rounded-md text-lg my-4 mx-8 w-96 max-w-full" rows={10} />
                <Button className="mx-8 mt-4">
                    save
                </Button>
            </form>
        </>
    ) : isSearching ? (
        <p>Loading...</p>
    ) : isUpdatingPost ? (
        <p>updating</p>
    ) : (
        <p>Post not found</p>
    );
}