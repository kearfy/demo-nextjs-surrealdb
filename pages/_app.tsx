import { SurrealProvider } from '../hooks/Surreal'
import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Head from 'next/head';

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <SurrealProvider>
        <Component {...pageProps} />
      </SurrealProvider>
    </QueryClientProvider>
  )
}
