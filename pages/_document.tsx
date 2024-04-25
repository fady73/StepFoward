import { Head, Html, Main, NextScript } from 'next/document';

import { Insights } from 'components/Insights';

export default function Document() {
  return (
    <Html lang="ar" dir="rtl">
      <Head />

      <body>
        <Main />
        <Insights />

        <NextScript />
      </body>
    </Html>
  );
}
