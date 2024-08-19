import { Head, Html, Main, NextScript } from 'next/document';
import { onCLS, onINP, onLCP } from 'web-vitals/attribution';
import { reportWebVitals, sendToGoogleAnalytics } from 'utils/analytic';

import { NextWebVitalsMetric } from 'next/app';
import { useEffect } from 'react';

export function reportWebVitas(metric: NextWebVitalsMetric) {
  reportWebVitals(metric);
}
export default function Document() {
  useEffect(() => {
    onCLS(sendToGoogleAnalytics);
    onINP(sendToGoogleAnalytics);
    onLCP(sendToGoogleAnalytics);
  }, []);
  return (
    <Html lang="ar" dir="rtl">
      <Head>
        <meta
          name="google-site-verification"
          content="HecMw8hl1wcPFybL6XtKYCCU82PfsVdeBm4CsPUZtAE"
        />
      </Head>

      <body>
        <Main />

        <NextScript />
      </body>
    </Html>
  );
}
