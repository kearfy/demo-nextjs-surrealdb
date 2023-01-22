import React from 'react';
import type { AppProps } from 'next/app';
import '../styles/globals.css';
import Head from '../components/Head';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            {/* We can place some default head params here, nested Head elements will overwrite it. */}
            <Head />
            <Component {...pageProps} />
        </>
    );
}
