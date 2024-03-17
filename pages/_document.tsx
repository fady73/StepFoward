import { Head, Html, Main, NextScript } from 'next/document';

import { GA_TRACKING_ID } from './gtag';
import Script from 'next/script';

export default function Document() {
  return (
    <Html lang="ar" dir="rtl">
      {/* <Head /> */}
      <Head>
        {/* enable analytics script only for production */}
        {
          <>
            <Script
              async
              id="google"
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
            />
            <Script
              id="google-analytics"
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{
                __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `
              }}
            />
          </>
        }
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
