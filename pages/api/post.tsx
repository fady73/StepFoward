/* eslint-disable import/no-anonymous-default-export */

import { NextApiRequest, NextApiResponse } from 'next';
import { convertToArticleList, getAllArticles, notion } from 'utils/notion';

const fetchPageBlocks = (pageId: string) => {
  return notion.blocks.children.list({ block_id: pageId }).then(res => res.results);
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  console.log(req.query.selectedTag)
    const data = await getAllArticles(
      req.query.nextCursor?req.query.nextCursor: undefined,
      req.query.selectedTag?req.query.selectedTag:undefined
    );
    const { response, hasMore, nextCursor } = data;
    const blocks = await fetchPageBlocks(response[0].id);

    const { articles, categories } = convertToArticleList(response);
    res.send({
      data,
      blocks,
      articles,
      categories,
      hasMore,
      nextCursor
    });
  
};
