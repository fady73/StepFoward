
export const sendEvent = (action: string, value: any) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', action, {
        value: value,
      });
    } else {
      console.error('Google Analytics is not initialized');
    }
  };

  export function reportWebVitals({ id, name, label, value }) {
    (window as any).gtag('send', 'event', {
      eventCategory:
        label === 'web-vital' ? 'Web Vitals' : 'Next.js custom metric',
      eventAction: name,
      eventValue: Math.round(name === 'CLS' ? value * 1000 : value), // values must be integers
      eventLabel: id, // id unique to current page load
      nonInteraction: true, // avoids affecting bounce rate.
    })
  }


 export  function sendToGoogleAnalytics({name, delta, value, id}) {
    // Assumes the global `gtag()` function exists, see:
    // https://developers.google.com/analytics/devguides/collection/ga4
    (window as any).gtag('event', name, {
      // Built-in params:
      value: delta, // Use `delta` so the value can be summed.
      // Custom params:
      metric_id: id, // Needed to aggregate events.
      metric_value: value, // Optional.
      metric_delta: delta, // Optional.
  
      // OPTIONAL: any additional params or debug info here.
      // See: https://web.dev/articles/debug-performance-in-the-field
      // metric_rating: 'good' | 'needs-improvement' | 'poor',
      // debug_info: '...',
      // ...
    });
  }
  