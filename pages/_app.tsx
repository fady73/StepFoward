import 'styles/globals.css';

import type { AppProps } from 'next/app';
import { Insights } from './../components/Insights';
import NextNProgress from 'nextjs-progressbar';
import Script from 'next/script';
import { Toaster } from 'react-hot-toast';

export default function App({ Component, pageProps }: AppProps) {


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
      <Script
        async
        id="google"
        src="https://www.googletagmanager.com/gtag/js?id=G-3YYLPMGX7W"
      />
      <Script id="google-analytics">
        {`
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config','G-3YYLPMGX7W',{
        page_path: window.location.pathname,
      });
  `}
      </Script>
      <Toaster />
      <NextNProgress color="#29D" startPosition={0.3} stopDelayMs={200} height={10} showOnShallow={true} />
       <Component {...pageProps} />
       <Insights />
    </>
  );
}
