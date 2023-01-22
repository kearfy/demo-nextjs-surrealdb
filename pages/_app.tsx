import React from 'react';
import type { AppProps } from 'next/app';
import '../styles/globals.css';
import Head from '../components/Head';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
    return (
        <QueryClientProvider client={queryClient}>
            {/* We can place some default head params here, nested Head elements will overwrite it. */}
            <Head />
            <Component {...pageProps} />
        </QueryClientProvider>
    );
}
