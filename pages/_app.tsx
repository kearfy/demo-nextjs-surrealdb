import React from 'react';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Navbar from '../components/layout/Navbar';
import Head from '../components/Head';
import '../styles/globals.css';

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
    return (
        <QueryClientProvider client={queryClient}>
            {/* Nested head elements will overwrite this */}
            <Head />
            <div className="relative h-screen overflow-x-hidden">
                <Navbar />
                <Component {...pageProps} />
            </div>
        </QueryClientProvider>
    );
}
