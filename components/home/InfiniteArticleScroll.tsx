import ArticleCard from 'components/ArticleCard';
import InfiniteScroll from 'react-infinite-scroller';
import React from 'react';

const InfiniteArticleScroll = ({ hasMore, fetchNextPage, allArticle, selectedTag }) => {
  return (
    <InfiniteScroll
      pageStart={0}
      loadMore={fetchNextPage}
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
          {allArticle.map(article => (
            <ArticleCard article={article} key={article.id} />
          ))}
        </div>
      </div>
    </InfiniteScroll>
  );
};

export default InfiniteArticleScroll;
