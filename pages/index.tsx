import React from 'react';
import Posts from '../components/Posts';
import Link from 'next/link';
import LinkButton from '../components/LinkButton';

export default function Home() {
  return (
    <>
        <div className='p-8 flex'>
          <LinkButton href="/create">Create new post</LinkButton>
        </div>
        <Posts />
    </>
  )
}