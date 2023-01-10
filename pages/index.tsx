import React from 'react';
import Posts from '../components/posts';
import Link from 'next/link';

export default function Home() {
  return (
    <>
        <Link href="/create">Create new post</Link>
        <Posts />
    </>
  )
}