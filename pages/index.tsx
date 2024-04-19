import { Fragment, useEffect, useState } from 'react';
import { convertToArticleList, getAllArticles, notion } from 'utils/notion';

import ArticleCard from 'components/ArticleCard';
import Category from 'components/Category';
import Container from 'components/Container';
import HeroHeader from 'components/HeroHeader';
import { Layout } from 'layouts/Layout';
import Link from 'next/link';
import PDFViewer from 'components/PDFViewer';
import Pagination from '../components/Pagination';
import { filterArticles } from 'utils/filterArticles';
import { useRouter } from 'next/router';

export default function Index(props) {
  const router = useRouter();
  const [pageNumber, setPageNumber] = useState(1);

  const { articles, categories, hasMore, nextCursor } = props;
  useEffect(() => {
    const { query } = router;
    const pageCursor = query.cursor ? query.cursor.toString() : undefined;
    fetchNextPage(pageCursor);
  }, [router]);

  const fetchNextPage = async (pageCursor?: string) => {
    if (hasMore) {
      await getAllArticles(pageCursor);
    }
  };

  const handleLoadMore = () => {
    const cursor = props.nextCursor;

    router.push({
      pathname: router.pathname,
      query: { cursor }
    });
  };
  const [selectedTag, setSelectedTag] = useState<string>(null);
  const filteredArticles = filterArticles(articles, selectedTag);
  const [allCategories, setAllCategories] = useState<any>(['الكل', ...categories]);
  return (
    <Layout>
      <HeroHeader />

      <div className="flex flex-wrap justify-center gap-4 mt-8">
        {allCategories.map(tag => (
          <Category
            tag={tag}
            key={tag}
            selectedTag={selectedTag}
            setSelectedTag={setSelectedTag}
          />
        ))}
      </div>
      <div className="flex flex-wrap justify-center gap-4 mt-4">
        <Link passHref key={'test'} href={'/book'}>
          <div
            className={
              'text-gray-900 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium'
            }
          >
            {' '}
            كتاب 500 لعبه
          </div>
        </Link>
      </div>
      <div></div>

      <Container>
        <div className="py-8">
          <div className="my-8 text-3xl font-bold text-gray-900  px-8">
            {!selectedTag || selectedTag === 'الكل' ? 'كل الالعاب' : `${selectedTag}`}
          </div>
          <div className="grid gap-10 lg:gap-12  md:grid-cols-3  sm:grid-cols-2 px-8">
            {filteredArticles.map(article => (
              <ArticleCard article={article} key={article.id} />
            ))}
          </div>
        </div>
        {
          <Pagination
            currentPage={pageNumber}
            totalPages={Math.ceil(
              Number(process.env.NEXT_PUBLIC_TOTAL_PAGE_NUMBER) /
                Number(process.env.NEXT_PUBLIC_TOTAL_PAGE_SIZE)
            )} // Calculate total pages based on data and page size
            onPageChange={newPage => {
              console.log(newPage);
              fetchNextPage();
              handleLoadMore();
              setPageNumber(newPage);
            }}
          />
        }
      </Container>
    </Layout>
  );
}

const fetchPageBlocks = (pageId: string) => {
  return notion.blocks.children.list({ block_id: pageId }).then(res => res.results);
};

export async function getServerSideProps({ query }) {
  const pageCursor = query.cursor ? query.cursor.toString() : undefined;
  const data = await getAllArticles(pageCursor);
  const { response, hasMore, nextCursor } = data;
  console.log(response);
  const blocks = await fetchPageBlocks(response[0].id);

  const { articles, categories } = convertToArticleList(response);
  return {
    props: {
      data,
      blocks,
      articles,
      categories,
      hasMore,
      nextCursor
    }
  };
}
