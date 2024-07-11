/* eslint-disable import/no-anonymous-default-export */

import { NextApiRequest, NextApiResponse } from 'next';
import { convertToArticleList, getAllFilterArticles, notion } from 'utils/notion';

import NextCors from 'nextjs-cors';

const fetchPageBlocks = (pageId: string) => {
  return notion.blocks.children.list({ block_id: pageId }).then(res => res.results);
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await NextCors(req, res, {
    // Options
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    origin: '*',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  });

  const data = await getAllFilterArticles(
    req.query.nextCursor ? req.query.nextCursor : undefined,
    req.query.selectedTag
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
