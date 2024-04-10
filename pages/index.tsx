import { Fragment, useState } from 'react';
import { convertToArticleList, getAllArticles, notion } from 'utils/notion';

import ArticleCard from 'components/ArticleCard';
import Category from 'components/Category';
import Container from 'components/Container';
import HeroHeader from 'components/HeroHeader';
import { Layout } from 'layouts/Layout';
import { filterArticles } from 'utils/filterArticles';

export default function Index(props) {
  const { articles, categories } = props;

  const [selectedTag, setSelectedTag] = useState<string>(null);
  const filteredArticles = filterArticles(articles, selectedTag);
  const [allCategories, setAllCategories] = useState<any>(['الكل',...categories,]);
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
      <Container>
        <div className="py-8">
          <div className="my-8 text-3xl font-bold text-gray-900  px-8">
            {!selectedTag||selectedTag==="الكل" ? 'كل الالعاب' : `${selectedTag}`}
          </div>
          <div className="grid gap-10 lg:gap-12  md:grid-cols-3  sm:grid-cols-2 px-8">
            {filteredArticles.map(article => (
              <ArticleCard article={article} key={article.id} />
            ))}
          </div>
        </div>
      </Container>
    </Layout>
  );
}

const fetchPageBlocks = (pageId: string) => {
  return notion.blocks.children.list({ block_id: pageId }).then(res => res.results);
};

export const getStaticProps = async () => {
  const data = await getAllArticles(process.env.BLOG_DATABASE_ID);

  const blocks = await fetchPageBlocks(data[0].id);

  const { articles, categories } = convertToArticleList(data);
  return {
    props: {
      data,
      blocks,
      articles,
      categories
    },
    revalidate: 1
  };
};
