import { Fragment, useEffect, useState } from 'react';
import { convertToArticleList, getAllArticles, notion } from 'utils/notion';
import { getMessaging, onMessage } from 'firebase/messaging';

import ArticleCard from 'components/ArticleCard';
import Category from 'components/Category';
import Container from 'components/Container';
import HeroHeader from 'components/HeroHeader';
import InfiniteScroll from 'react-infinite-scroller';
import { Layout } from 'layouts/Layout';
import Link from 'next/link';
import PDFViewer from 'components/PDFViewer';
import Pagination from '../components/Pagination';
import { filterArticles } from 'utils/filterArticles';
import {firebaseCloudMessaging} from "../utils/config";
import { useRouter } from 'next/router';

export default function Index(props) {

  const [pageNumber, setPageNumber] = useState(1);
  const [hasMore, setHasmore] = useState(true);
  const [allArticle, setAllArticle] = useState([]);
  const [selectedTag, setSelectedTag] = useState<string>(null);
  const [allCategories, setAllCategories] = useState<any>([
    'الكل',
    'اطفال',
    'اعدادى',
    'شباب'
  ]);

  const [nextCursor, setNextCursor] = useState<any>('');
  const router = useRouter();
  const [fcmToken, setFcmToken] = useState<string|undefined>(undefined);

  const getToken = async () => {
    try {
      const token = await firebaseCloudMessaging.init()
      if (token) {
        await firebaseCloudMessaging.getMessage()
        setFcmToken(token)
        console.log(token)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.addEventListener('message', (event) => console.log('event for the service worker', event))
    }
    async function setToken() {
      await getToken()
    }
    setToken()
  }, [])
  
  const fetchNextPage = async () => {
    const { query } = router;
    const selectedTag = query.selectedTag ? query.selectedTag.toString() : undefined;
    let url = '';
    console.log(selectedTag);
    if (selectedTag !== 'الكل' && selectedTag) {
      url = `${process.env.NEXT_PUBLIC_API_URL}/api/filter?nextCursor=${nextCursor}&selectedTag=${selectedTag}`;
    } else {
      url = `${process.env.NEXT_PUBLIC_API_URL}/api/post?nextCursor=${nextCursor}`;
    }
    const data = await fetch(url, {
      method: 'GET',

      headers: {
        'X-RapidAPI-Key': 'your-api-key',
        'X-RapidAPI-Host': 'jokes-by-api-ninjas.p.rapidapi.com'
      }
    })
      .then(response => response.json())
      .then(data => {
        setHasmore(data.hasMore);
        setNextCursor(data.nextCursor);
        const allArticleSet=new Set([...allArticle, ...data.articles])
        setAllArticle(Array.from(allArticleSet))
      });
  };

  useEffect(() => {
    if(selectedTag){
    setHasmore(true);
    setNextCursor('');
    setAllArticle([]);
    router.push({
      pathname: router.pathname,
      query: { selectedTag }
    });
  }
  }, [selectedTag]);

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

      <Container>
        {
          <InfiniteScroll
            pageStart={0}
            loadMore={() => {
              fetchNextPage();
            }}
            hasMore={hasMore}
            loader={
              <div className="text-center">
                <span className="border-gray-300 h-20 w-20 animate-spin rounded-full inline-block	 border-8 border-t-blue-600"></span>
              </div>
            }
          >
            <div className="py-8">
              <div className="my-8 text-3xl font-bold text-gray-900  px-8">
                {!selectedTag || selectedTag === 'الكل' ? 'كل الالعاب' : `${selectedTag}`}
              </div>
              <div className="grid gap-10 lg:gap-12  md:grid-cols-3  sm:grid-cols-2 px-8">
                {allArticle?.map(article => (
                  <ArticleCard article={article} key={article.id} />
                ))}
              </div>
            </div>
          </InfiniteScroll>
        }
      </Container>
    </Layout>
  );
}
export const getServerSideProps = async ({ params: { slug } }) => {
  return {
    revalidate:10 };

};