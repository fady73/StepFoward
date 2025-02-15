//@ts-nocheck

import Head from 'next/head';
import siteData from 'siteData';

export function MetaHead(props) {
  const { title, imageUrl, description, ogUrl } = props;

  const titleName = title || siteData.title;

  return (
    <Head>
      <title>{titleName}</title>
      <meta name="robots" content="follow, index" />
      <meta content={description || titleName} name="description" />
      <meta property="og:site_name" content={siteData.author} />
      <meta property="og:site_description" content={siteData.description} />
      <meta property="og:description" content={description} />
      <meta property="og:title" content={siteData.title} />
      <meta property="og:image" content={imageUrl || siteData.ogBanner} />
      <meta name="algolia-site-verification" content="DE70F703343E3F3C" />

      <meta property="og:url" content={'step-forward.co'} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={titleName} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />
      <script
        src="https://www.chatbase.co/embed.min.js"
        chatbotId="1VQa28W02SWAR37SnUf8K"
        domain="www.chatbase.co"
        defer={false}
      ></script>
    </Head>
  );
}
