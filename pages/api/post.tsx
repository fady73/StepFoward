/* eslint-disable import/no-anonymous-default-export */

import { NextApiRequest, NextApiResponse } from 'next';
import { convertToArticleList, getAllArticles, notion } from 'utils/notion';

const fetchPageBlocks = pageId => {
  return notion.blocks.children.list({ block_id: pageId }).then(res => res.results);
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  console.log(req.query.searchQuery);
  const data = await getAllArticles(
    req.query.nextCursor ? req.query.nextCursor : undefined,
    req.query.selectedTag ? req.query.selectedTag : undefined,
    req.query.searchQuery ? req.query.searchQuery : undefined
  );
  console.log('data', data);

  if (data.response.length !== 0) {
    const { response, hasMore, nextCursor } = data;
    const blocks = await fetchPageBlocks(response[0].id);

    const { articles, categories } = convertToArticleList(response);
    res.status(200).send({
      data,
      blocks,
      articles,
      categories,
      hasMore,
      nextCursor
    });
  } else {
    res.status(404).send({
      message: 'No articles found'
    });
  }
};
