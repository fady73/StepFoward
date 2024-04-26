/* eslint-disable @next/next/no-img-element */

import { getAllArticles, getArticlePageData, getOneArticles } from 'utils/notion';

import ArticleCard from 'components/ArticleCard';
import Container from 'components/Container';
import { Fragment } from 'react';
import Image from 'next/image';
import { Layout } from 'layouts/Layout';
import Link from 'next/link';
import getLocalizedDate from 'utils/getLocalizedDate';
import { renderBlocks } from 'components/blocks/renderBlocks';
import siteData from 'siteData';
import slugify from 'slugify';

const ArticlePage = ({
  content,
  title,
  thumbnail,
  publishedDate,
  lastEditedAt,
  summary,
  moreArticles,
  imageSrc
}) => {
  const publishedOn = getLocalizedDate(publishedDate);
  const modifiedDate = getLocalizedDate(lastEditedAt);
  const slug = slugify(title).toLowerCase();

  return (
    <>
      <Layout
        title={title}
        description={summary}
        date={new Date(publishedDate).toISOString()}
        ogUrl={`/blog/${slug}`}
      >
        <div>
          <div className="px-6 py-16 pt-16 pb-48 mx-auto -mb-48 text-center bg-gray-100 ">
            <div className="max-w-3xl mx-auto">
              <div className="sm:flex items-center justify-center mb-2 space-x-2 text-sm text-gray-500">
                <div className="">{publishedOn}</div>
                {publishedOn !== modifiedDate && (
                  <>
                    <span className="sm:block hidden">•</span>
                    <span className="0">Updated on {modifiedDate}</span>
                  </>
                )}
              </div>
              <div className="font-extrabold tracking-tight text-gray-900 text-w-4xl sm:text-4xl text-2xl">
                {title}
              </div>
              <div className="max-w-3xl mx-auto mt-3 text-xl leading-8 text-gray-500 sm:mt-4">
                {summary}
              </div>
            </div>
          </div>

          <div className=" px-2 mx-auto my-16 	">
            <img
              style={{
                display: 'block',
                marginLeft: 'auto',
                marginRight: 'auto'
              }}
              className="rounded-lg aspect-video text-center"
              src={thumbnail}
              width={500}
              height={500}
              alt={'article cover'}
            />
          </div>
          <div className="max-w-4xl px-6 mx-auto mb-24 space-y-1 md:px-8">
            {content.map(block => (
              <Fragment key={block.id}>{renderBlocks(block)}</Fragment>
            ))}
          </div>
          <div className="py-12 border-t px-4">
            <Container>
              <div className="flex items-center justify-between my-8 ">
                <div className="text-3xl font-bold text-gray-900">احدث الالعاب</div>
                <Link href="/">
                  <span className="font-semibold text-gray-900 cursor-pointer">
                    ➜ مزيد من الالعاب
                  </span>
                </Link>
              </div>
              <div className="grid gap-10 lg:gap-12 md:grid-cols-3  sm:grid-cols-">
                {moreArticles.map(article => (
                  <ArticleCard article={article} key={article.id} />
                ))}
              </div>
            </Container>
          </div>
        </div>
      </Layout>
    </>
  );
};



export const getServerSideProps = async ({ params: { slug } }) => {
  const data = await getOneArticles(process.env.BLOG_DATABASE_ID, slug);
  const result = await getArticlePageData(data[0], slug, process.env.BLOG_DATABASE_ID);

  return {
    props:{...result,revalidate:60 } };

};

export default ArticlePage;
