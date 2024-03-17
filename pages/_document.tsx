import { Head, Html, Main, NextScript } from 'next/document';

import Script from 'next/script';

export default function Document() {
  return (
    <Html lang="ar" dir="rtl">
      <head>
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
      gtag('config', ${'G-3YYLPMGX7W'},{
        page_path: window.location.pathname,
      });
  `}
        </Script>
      </head>
      <Head />

      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
