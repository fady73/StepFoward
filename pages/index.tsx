import { useEffect, useRef, useState } from 'react';

import CategoryList from 'components/home/CategoryList';
import Container from 'components/Container';
import HeroHeader from 'components/HeroHeader';
import InfiniteArticleScroll from 'components/home/InfiniteArticleScroll';
import { Layout } from 'layouts/Layout';
import Link from 'next/link';
import NoData from 'components/home/NoData';
import SearchBar from 'components/home/SearchBar';
import { firebaseCloudMessaging } from '../utils/config';
import { sendEvent } from 'utils/analytic';
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

  const router = useRouter();
  const [fcmToken, setFcmToken] = useState<string | undefined>(undefined);
  const inputRef = useRef(null);

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
    if (selectedTag) {
      setHasmore(true);
      setNextCursor('');
      setAllArticle([]);
      setNoData(false);
    }
  }, [selectedTag]);

  const handleSearch = e => {
    setHasmore(true);
    setNextCursor('');
    setAllArticle([]);
    setNoData(false);
    sendEvent('search', searchQuery);
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
      <SearchBar
        searchQuery={searchQuery}
        handleOnChangeSearch={handleOnChangeSearch}
        handleClearSearch={handleClearSearch}
        handleSearch={handleSearch}
        inputRef={inputRef}
      />
      <CategoryList
        allCategories={allCategories}
        selectedTag={selectedTag}
        setSelectedTag={setSelectedTag}
      />
      <div className="flex flex-wrap justify-center gap-4 mt-4">
        <Link passHref key={'test'} href={'/book'}>
          <div
            className={
              'text-gray-900 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium'
            }
          >
            كتاب 500 لعبه
          </div>
        </Link>
      </div>
      <Container>
        {noData ? (
          <NoData />
        ) : (
          <InfiniteArticleScroll
            hasMore={hasMore}
            fetchNextPage={fetchNextPage}
            allArticle={allArticle}
            selectedTag={selectedTag}
          />
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
