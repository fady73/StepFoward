import Head from 'next/head';
import siteData from 'siteData';

export function MetaHead(props) {
  const { date, title, imageUrl, description, ogUrl } = props;

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

      <meta property="og:url" content={ogUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={titleName} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />

      {date && <meta property="article:published_time" content={date} />}
    </Head>
  );
}
