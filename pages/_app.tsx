import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '../styles/globals.css';
import Navbar from '../components/layout/Navbar';

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <div className='relative h-screen overflow-x-hidden'>
        <Navbar />
        <Component {...pageProps} />
      </div>
    </QueryClientProvider>
  )
}
