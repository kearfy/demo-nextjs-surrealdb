import React from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { SurrealQuery } from '../hooks/Surreal';
import { Post } from '../components/posts';
import { useRouter } from 'next/router';

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

    const inputStyle = {
        width: '400px',
        padding: '10px 16px',
        marginTop: '10px',
        fontSize: '1.2rem',
        display: 'block'
    };

    return !isLoading ? (
        <>
            <Link href="/">Back to overview</Link>
            <br />
            <br />
            <form onSubmit={handleSubmit((post) => mutate(post))}>
                <input {...register('title')} placeholder="title" required style={inputStyle} />
                <input {...register('author')} placeholder="author" required style={inputStyle} />
                <textarea {...register('body')} placeholder="body" required style={inputStyle} rows={10} />
                <button 
                    style={{
                        marginTop: '30px',
                        padding: '10px 16px',
                        fontSize: '1.2rem',
                    }}
                >
                    Submit
                </button>
            </form>
        </>
    ) : (
        <h2>Submitting post....</h2>
    )
}