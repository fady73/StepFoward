import { useEffect, useState } from 'react';

export default function SitemapPage() {
  const [sitemap, setSitemap] = useState<string>('');

  useEffect(() => {
    fetch('/api/sitemap')
      .then(res => res.text())
      .then(data => setSitemap(data))
      .catch(err => console.error('Error fetching sitemap:', err));
  }, []);

  return (
    <div>
      <h1>Sitemap XML</h1>
      <pre>{sitemap}</pre>
    </div>
  );
}
