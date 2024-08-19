/* eslint-disable import/no-anonymous-default-export */

import { NextApiRequest, NextApiResponse } from 'next';
import { convertToArticleList, getAllArticles, notion } from 'utils/notion';

import NextCors from 'nextjs-cors';

const fetchPageBlocks = pageId => {
  return notion.blocks.children.list({ block_id: pageId }).then(res => res.results);
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await NextCors(req, res, {
    // Options
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    origin: '*',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  });

  const data = await getAllArticles(
    req.query.nextCursor ? req.query.nextCursor : undefined,
    req.query.selectedTag ? req.query.selectedTag : undefined,
    req.query.searchQuery ? req.query.searchQuery : undefined
  );

  if (data && data.response.length !== 0) {
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
