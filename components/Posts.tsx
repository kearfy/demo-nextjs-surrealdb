import React from "react";
import { useQuery } from '@tanstack/react-query';
import { SurrealQuery } from "../hooks/Surreal";

export type PostID = `post:${string}`;
export type Post = {
    id: PostID;
    title: string;
    body: string;
    author: string;
    created: Date;
    updated: Date;
};

export default function Posts() {
    const { isLoading, error, data } = useQuery({
        queryKey: ['posts'],
        queryFn: async () => {
            const result = await SurrealQuery<Post>(`SELECT * FROM post`);
            const data = (result[0] && result[0]?.result) ?? [];
            console.log(data);
            
            return data.map(post => ({
                ...post,
                created: new Date(post.created),
                updated: new Date(post.updated)
            }))
        },
    });

    if (isLoading) return <h2>Loading posts...</h2>;
    if (error) return <h2>Failed to load posts</h2>;

    return (
        <>
            <h2 style={{fontSize: '4rem', margin: '30px 0px 20px'}}>Posts</h2>
            {
                data?.map(post => (
                    <div key={post.id}>
                        <br />
                        <h3 style={{margin: '0px', fontSize: "2.5rem"}}>{post.title}</h3>
                        <div
                            style={{
                                display: 'flex',
                                gap: '20px',
                                alignItems: 'center',
                            }}
                        >
                            <b>{post.author}</b>
                            <p>Created: {post.created.toLocaleString()}</p>
                            <p>Updated: {post.updated.toLocaleString()}</p>
                        </div>
                        <p>
                            {post.body}
                        </p>
                        <br />
                    </div>
                ))
            }
            {data?.length == 0 && <p>No posts available, create one!</p>}
        </>
    )
}