import 'styles/globals.css';

import * as gtag from './gtag';

import type { AppProps } from 'next/app';
import { GA_TRACKING_ID } from './gtag';
import Head from 'next/head';
import Script from 'next/script';
import { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: URL) => {
      gtag.pageview(url);
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      {process.env.NEXT_PUBLIC_UMAMI_ID &&
        process.env.NEXT_PUBLIC_UMAMI_URL &&
        process.env.NODE_ENV === 'production' && (
          <Script
            data-website-id={process.env.NEXT_PUBLIC_UMAMI_ID}
            src={process.env.NEXT_PUBLIC_UMAMI_URL}
          />
        )}
      <Toaster />
      <Component {...pageProps} />;
    </>
  );
}
