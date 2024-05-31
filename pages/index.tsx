import { getMessaging, onMessage } from 'firebase/messaging';
import { useCallback, useEffect, useRef, useState } from 'react';

import ArticleCard from 'components/ArticleCard';
import Category from 'components/Category';
import Container from 'components/Container';
import HeroHeader from 'components/HeroHeader';
import InfiniteScroll from 'react-infinite-scroller';
import { Layout } from 'layouts/Layout';
import Link from 'next/link';
import debounce from 'lodash.debounce';
import { firebaseCloudMessaging } from '../utils/config';
import { useRouter } from 'next/router';

const Index = props => {
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
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [noData, setNoData] = useState<boolean>(false);
  const inputRef = useRef(null);

  const router = useRouter();
  const [fcmToken, setFcmToken] = useState<string | undefined>(undefined);

  const getToken = async () => {
    try {
      const token = await firebaseCloudMessaging.init();
      if (token) {
        await firebaseCloudMessaging.getMessage();
        setFcmToken(token);
        console.log(token);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.addEventListener('message', event =>
        console.log('event for the service worker', event)
      );
    }
    async function setToken() {
      await getToken();
    }
    setToken();
  }, []);

  const buildQueryString = params => {
    const query = new URLSearchParams();
    Object.keys(params).forEach(key => {
      if (params[key]) {
        query.append(key, params[key]);
      }
    });
    return query.toString();
  };

  const fetchNextPage = async () => {
    const queryParams = {
      nextCursor,
      selectedTag: selectedTag !== 'الكل' ? selectedTag : undefined,
      searchQuery
    };
    const queryString = buildQueryString(queryParams);
    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/post?${queryString}`;

    const data = await fetch(url, {
      method: 'GET'
    })
      .then(response => response.json())
      .then(data => {
        setHasmore(data.hasMore);
        setNextCursor(data.nextCursor);
        console.log(data);
        if (data.message && data.message.length != 0) {
          setNoData(true);
          setHasmore(false);
        } else {
          setNoData(false);
          const allArticleSet = new Set([...allArticle, ...data.articles]);
          setAllArticle(Array.from(allArticleSet));
        }
      });
  };

  useEffect(() => {
    if (selectedTag || searchQuery) {
      setHasmore(true);
      setNextCursor('');
      setAllArticle([]);
      setNoData(false);
    }
  }, [selectedTag]);

  const handleSearch = e => {
    console.log(e);
    setHasmore(true);
    setNextCursor('');
    setAllArticle([]);
    setNoData(false);
  };

  const handleOnChangeSearch = e => setSearchQuery(e.target.value);

  const handleClearSearch = () => {
    setSearchQuery('');
    setHasmore(true);
    setNextCursor('');
    setAllArticle([]);

    setNoData(false);
    inputRef.current.value = '';
  };

  return (
    <Layout>
      <HeroHeader />
      <div className="flex justify-center mt-4 mr-4 ml-4">
        <div className="relative w-full max-w-md">
          <input
            type="text"
            placeholder="ابحث باسم اللعبه..."
            ref={inputRef}
            onChange={handleOnChangeSearch}
            className="px-4 py-2 border rounded-md outline-none focus:border-blue-500 w-full"
          />

          {searchQuery && (
            <button
              className="absolute inset-y-0 left-0 px-3 text-gray-500 focus:outline-none"
              onClick={handleClearSearch}
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>
        <button
          onClick={() => handleSearch(searchQuery)}
          className="bg-blue-500 text-white py-1 mr-3 px-6 rounded-md"
        >
          ابحث
        </button>
      </div>

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
        {noData ? (
          <div className="flex items-center justify-center py-8">
            <p className="text-gray-600 font-bold text-2xl">لا توجد ألعاب بهذا الاسم</p>
            <svg
              className="h-8 w-8 mt-4 mr-2  text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 26 26"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="4"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
        ) : (
          <InfiniteScroll
            pageStart={0}
            loadMore={() => {
              fetchNextPage();
            }}
            hasMore={hasMore}
            loader={
              <div className="text-center">
                <span className="border-gray-300 h-20 w-20 animate-spin rounded-full inline-block border-8 border-t-blue-600"></span>
              </div>
            }
          >
            <div className="py-8">
              <div className="my-8 text-3xl font-bold text-gray-900 px-8">
                {!selectedTag || selectedTag === 'الكل' ? 'كل الالعاب' : `${selectedTag}`}
              </div>
              <div className="grid gap-10 lg:gap-12 md:grid-cols-3 sm:grid-cols-2 px-8">
                {allArticle?.map(article => (
                  <ArticleCard article={article} key={article.id} />
                ))}
              </div>
            </div>
          </InfiniteScroll>
        )}
      </Container>
    </Layout>
  );
};

export const getStaticProps = () => {
  return {
    props: {},
    revalidate: 10
  };
};

export default Index;
